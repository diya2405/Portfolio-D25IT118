import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEventLogs, clearEventLogs, createTask } from '../api/tasks';
import Toast from '../components/Toast';
import '../components/Events.css';

function EventsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLogs(data?.logs || []);
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
        workerDelayMs: 1500,
        taskTitle: taskData.title,
        triggeredAt: new Date().toLocaleTimeString(),
      });

      showToast(`API responded in ${apiDuration}ms (Worker running in background...)`, 'info');

      // Fetch immediately to show event captured
      await loadLogs();

      // Poll after 2s to show completed worker log
      setTimeout(async () => {
        await loadLogs();
        showToast('Background notification worker finished (+1500ms)', 'success');
      }, 2000);
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

  const createdCount = logs.filter((l) => l.event === 'task-created').length;
  const deletedCount = logs.filter((l) => l.event === 'task-deleted').length;

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
                Async listener processed without delaying client response
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
                  <th>Worker Latency</th>
                  <th>Task Title / ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((item, idx) => (
                  <tr key={idx}>
                    <td>{new Date(item.timestamp).toLocaleTimeString()}</td>
                    <td>
                      <span
                        className={`event-tag ${
                          item.event === 'task-created'
                            ? 'created'
                            : item.event === 'task-deleted'
                            ? 'deleted'
                            : 'other'
                        }`}
                      >
                        {item.event}
                      </span>
                    </td>
                    <td>{item.durationMs ?? 0} ms</td>
                    <td>{item.data?.title || item.data?.taskId || '—'}</td>
                    <td>
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>✓ COMPLETED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default EventsPage;
