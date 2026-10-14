import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEventLogs, clearEventLogs, createTask } from '../api/tasks';
import Toast from '../components/Toast';
import '../components/Events.css';

function EventsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2500);
  }

  const loadLogs = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getEventLogs(token);
      setLogs(Array.isArray(data) ? data : (data?.logs || []));
    } catch {
      // fallback
    }
  }, [token]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  async function handleTriggerEvent() {
    if (!token) return;
    setActionLoading(true);
    const start = performance.now();
    try {
      const randomNum = Math.floor(100 + Math.random() * 900);
      const taskData = {
        title: `Async Task #${randomNum}`,
        description: 'Demonstrating Node.js EventEmitter non-blocking dispatch',
      };
      await createTask(token, taskData);
      const apiDuration = Math.round(performance.now() - start);

      setLastTrigger({
        apiResponseMs: apiDuration,
        workerDelayMs: 2000,
        taskTitle: taskData.title,
      });

      showToast(`API responded in ${apiDuration}ms (Worker running in background...)`, 'info');

      // Refresh immediately
      await loadLogs();

      // Poll after background notification worker finishes (2000ms delay)
      setTimeout(async () => {
        await loadLogs();
        showToast('Background notification worker completed (+2000ms)', 'success');
      }, 2200);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleClear() {
    if (!token) return;
    setActionLoading(true);
    try {
      await clearEventLogs(token);
      showToast('Event logs cleared', 'success');
      setLastTrigger(null);
      await loadLogs();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  }

  const createdCount = logs.filter((l) => (l.event || l.type) === 'task-created').length;
  const deletedCount = logs.filter((l) => (l.event || l.type) === 'task-deleted').length;

  return (
    <div className="container">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <section className="events-section">
        <div className="events-header">
          <span className="events-label">events.live</span>
        </div>

        {/* Minimalist Stats Bar */}
        <div className="events-stats-bar">
          <div className="events-stat-item">Total: <strong>{logs.length}</strong></div>
          <div className="events-stat-item">task-created: <strong>{createdCount}</strong></div>
          <div className="events-stat-item">task-deleted: <strong>{deletedCount}</strong></div>
          <div className="events-stat-item">Engine: <strong>Node.js EventEmitter</strong></div>
        </div>

        {/* Action Toolbar */}
        <div className="events-toolbar">
          <button
            className="events-action-btn primary"
            onClick={handleTriggerEvent}
            disabled={actionLoading}
          >
            {actionLoading ? 'Triggering…' : '+ Trigger Task Event'}
          </button>
          <button
            className="events-action-btn"
            onClick={loadLogs}
            disabled={actionLoading}
          >
            ↻ Refresh
          </button>
          <button
            className="events-action-btn danger"
            onClick={handleClear}
            disabled={actionLoading || logs.length === 0}
          >
            ✕ Clear Logs
          </button>
        </div>

        {/* Non-Blocking Proof Result Box */}
        {lastTrigger && (
          <div className="events-result-box">
            <div>
              <span>API Response: </span>
              <strong style={{ color: '#16a34a' }}>{lastTrigger.apiResponseMs} ms</strong>
              <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}> (201 Created sent instantly)</span>
            </div>
            <div>
              <span>Worker Delay: </span>
              <strong>~{lastTrigger.workerDelayMs} ms</strong>
              <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}> (Async background)</span>
            </div>
          </div>
        )}

        {/* Audit Log Table */}
        <div className="events-table-wrapper">
          {logs.length === 0 ? (
            <div className="events-empty">
              No events recorded yet. Click "+ Trigger Task Event" or create a task to test.
            </div>
          ) : (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Event</th>
                  <th>Worker Delay</th>
                  <th>Task Title / ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((item, idx) => {
                  const eventName = item.event || item.type || 'event';
                  const title = item.taskTitle || item.data?.title || item.taskId || item.data?.taskId || '—';
                  const delay = item.delayMs || item.durationMs || 0;
                  return (
                    <tr key={idx}>
                      <td>{new Date(item.timestamp || item.receivedAt).toLocaleTimeString()}</td>
                      <td>
                        <span
                          className={`event-tag ${
                            eventName === 'task-created'
                              ? 'created'
                              : eventName === 'task-deleted'
                              ? 'deleted'
                              : 'other'
                          }`}
                        >
                          {eventName}
                        </span>
                      </td>
                      <td>{delay} ms</td>
                      <td>{title}</td>
                      <td>
                        <span style={{ color: item.status === 'FAILED' ? '#ef4444' : '#16a34a', fontWeight: 600 }}>
                          {item.status === 'FAILED' ? '✕ FAILED' : '✓ COMPLETED'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default EventsPage;
