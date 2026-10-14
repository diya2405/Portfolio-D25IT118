import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEventLogs, clearEventLogs, createTask } from '../api/tasks';
import Toast from '../components/Toast';
import '../components/Events.css';

function EventsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [lastDemo, setLastDemo] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2500);
  }

  const loadLogs = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getEventLogs(token);
      const list = Array.isArray(data) ? data : (data?.logs || []);
      setLogs(list);
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
      const taskData = {
        title: `Async Event Demo #${Math.floor(100 + Math.random() * 900)}`,
        description: 'Demonstrating Node.js EventEmitter non-blocking dispatch',
      };
      await createTask(token, taskData);
      const apiDuration = Math.round(performance.now() - start);

      setLastDemo({
        apiResponseMs: apiDuration,
        workerDelayMs: 2000,
        taskTitle: taskData.title,
        triggeredAt: new Date().toLocaleTimeString(),
      });

      showToast(`API responded in ${apiDuration}ms (Worker running in background...)`, 'info');

      // Refresh immediately to show initial state
      await loadLogs();

      // Poll after background notification finishes (2000ms delay)
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
      showToast('Event audit logs cleared', 'success');
      setLastDemo(null);
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
        <span className="events-label">PRACTICAL 10 // EVENT-DRIVEN ARCHITECTURE</span>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>
          Async Event Inspector
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: '0 0 1.5rem 0' }}>
          Real-time verification of non-blocking background workers powered by Node.js native <code>EventEmitter</code>.
        </p>

        {/* Stats Bar */}
        <div className="events-stats-bar">
          <div className="events-stat-item">
            <span>Total Logged:</span>
            <strong>{logs.length}</strong>
          </div>
          <div className="events-stat-item">
            <span>task-created:</span>
            <strong>{createdCount}</strong>
          </div>
          <div className="events-stat-item">
            <span>task-deleted:</span>
            <strong>{deletedCount}</strong>
          </div>
          <div className="events-stat-item">
            <span>Engine:</span>
            <strong>Node.js EventEmitter</strong>
          </div>
        </div>

        {/* Non-Blocking Proof Demo Box */}
        {lastDemo && (
          <div className="events-demo-box">
            <div>
              <div className="demo-metric-title">HTTP Response Latency</div>
              <div className="demo-metric-val fast">{lastDemo.apiResponseMs} ms</div>
              <div className="demo-metric-desc">
                Immediate 201 Created sent to client before background work
              </div>
            </div>
            <div>
              <div className="demo-metric-title">Background Notification Worker</div>
              <div className="demo-metric-val">~{lastDemo.workerDelayMs} ms</div>
              <div className="demo-metric-desc">
                Async listener processed via event loop without delaying client
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="events-toolbar">
          <button
            className="events-action-btn primary"
            onClick={handleTriggerEvent}
            disabled={actionLoading}
          >
            {actionLoading ? 'Triggering...' : '+ Trigger Test Event'}
          </button>
          <button
            className="events-action-btn"
            onClick={loadLogs}
            disabled={actionLoading}
          >
            ↻ Refresh Logs
          </button>
          <button
            className="events-action-btn danger"
            onClick={handleClear}
            disabled={actionLoading || logs.length === 0}
          >
            ✕ Clear Logs
          </button>
        </div>

        {/* Audit Log Table */}
        <div className="events-table-wrapper">
          {logs.length === 0 ? (
            <div className="events-empty">
              No events in audit buffer. Click "+ Trigger Test Event" or create/delete tasks to see live background events.
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
                  const duration = item.durationMs || item.delayMs || 0;
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
                      <td>{duration} ms</td>
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
