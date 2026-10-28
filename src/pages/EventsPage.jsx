import { useState, useEffect, useCallback } from 'react';
import { registerEventEntry, getEventPipeline, resetEventPipeline } from '../api/tasks';
import Toast from '../components/Toast';
import '../components/Events.css';

function EventsPage() {
  const [formData, setFormData] = useState({
    name: 'Diya Shah',
    email: 'diya@example.com',
    event: 'Workshop',
    seats: 1,
    rollNo: 'D25IT118',
  });

  const [pipeline, setPipeline] = useState({
    waiting: [],
    processing: [],
    confirmed: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2500);
  }

  // Fetch current live pipeline state
  const fetchPipeline = useCallback(async () => {
    try {
      const data = await getEventPipeline();
      if (data) {
        setPipeline({
          waiting: data.waiting || [],
          processing: data.processing || [],
          confirmed: data.confirmed || [],
        });

        // Check if current tracked submission got confirmed
        if (currentSubmission && currentSubmission.status !== 'confirmed') {
          const match = (data.confirmed || []).find((c) => c.id === currentSubmission.id);
          if (match) {
            setCurrentSubmission(match);
            showToast(`Confirmed ticket generated: ${match.ticketCode}`, 'success');
          }
        }
      }
    } catch {
      // Offline fallback
    }
  }, [currentSubmission]);

  // Initial fetch and live poll every 1 second (Live updates on)
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Event Desk";
    fetchPipeline();
    const interval = setInterval(fetchPipeline, 1000);
    return () => {
      document.title = prevTitle;
      clearInterval(interval);
    };
  }, [fetchPipeline]);

  // Handle Submit entry
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Please provide your name and email', 'error');
      return;
    }

    setIsSubmitting(true);
    const start = performance.now();

    try {
      const res = await registerEventEntry(formData);
      const apiDuration = Math.round(performance.now() - start);

      if (res && res.entry) {
        setCurrentSubmission(res.entry);
        showToast(`Entry received in ${apiDuration}ms (Confirming in background...)`, 'info');
      }

      await fetchPipeline();
    } catch (err) {
      showToast(err.message || 'Failed to submit entry', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Reset pipeline
  async function handleReset() {
    try {
      await resetEventPipeline();
      setCurrentSubmission(null);
      await fetchPipeline();
      showToast('Live pipeline cleared', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  return (
    <div className="event-desk-container">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <header className="event-desk-header">
        <div>
          <h1>Event Desk</h1>
          <p>Register in seconds. Your entry is accepted right away and confirmed in the background.</p>
        </div>
        <div className="live-updates-pill">
          <span className="live-dot"></span>
          Live updates on
        </div>
      </header>

      {/* Main Grid: Form (Left) & Pipeline (Right) */}
      <div className="event-desk-grid">
        {/* Left Column: Enter an event */}
        <section className="event-form-card">
          <h2>Enter an event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                value={formData.name}
                placeholder="Diya Shah"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                placeholder="diya@example.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event</label>
                <select
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Conference">Conference</option>
                </select>
              </div>

              <div className="form-group">
                <label>Seats</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-entry-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit entry'}
            </button>
          </form>

          {/* Feedback Status Alert */}
          {currentSubmission && currentSubmission.status !== 'confirmed' && (
            <div className="entry-status-alert received">
              <div className="entry-status-alert-title">Entry received</div>
              <p className="entry-status-alert-desc">
                You can leave this page open. We will update it as soon as it is confirmed.
              </p>
            </div>
          )}

          {currentSubmission && currentSubmission.status === 'confirmed' && (
            <div className="entry-status-alert confirmed">
              <div className="entry-status-alert-title">
                Confirmed: {currentSubmission.ticketCode}
              </div>
              <p className="entry-status-alert-desc">
                Your ticket is ready. Keep this code.
              </p>
            </div>
          )}
        </section>

        {/* Right Column: Live pipeline */}
        <section className="pipeline-card">
          <div className="pipeline-card-header">
            <h2>Live pipeline</h2>
            <button className="pipeline-reset-link" onClick={handleReset} title="Clear all tickets">
              ↺ Reset pipeline
            </button>
          </div>

          <div className="pipeline-lanes">
            {/* Lane 1: Waiting in line */}
            <div className="pipeline-lane waiting">
              <div className="pipeline-lane-header">
                <span className="pipeline-lane-title">Waiting in line</span>
                <span className="pipeline-lane-count">{pipeline.waiting.length}</span>
              </div>
              {pipeline.waiting.length === 0 ? (
                <p className="pipeline-empty-text">Nothing here right now.</p>
              ) : (
                pipeline.waiting.map((item) => (
                  <div className="pipeline-item waiting" key={item.id}>
                    <div className="pipeline-item-name">{item.name}</div>
                    <div className="pipeline-item-sub">{item.rollNo || 'D25IT118'}</div>
                    <div className="pipeline-item-meta">
                      {item.event}, {item.seats} seat{item.seats > 1 ? 's' : ''}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Lane 2: Being processed */}
            <div className="pipeline-lane processing">
              <div className="pipeline-lane-header">
                <span className="pipeline-lane-title">Being processed</span>
                <span className="pipeline-lane-count">{pipeline.processing.length}</span>
              </div>
              {pipeline.processing.length === 0 ? (
                <p className="pipeline-empty-text">Nothing here right now.</p>
              ) : (
                pipeline.processing.map((item) => (
                  <div className="pipeline-item processing" key={item.id}>
                    <div className="pipeline-item-name">{item.name}</div>
                    <div className="pipeline-item-sub">{item.rollNo || 'D25IT118'}</div>
                    <div className="pipeline-item-meta">
                      {item.event}, {item.seats} seat{item.seats > 1 ? 's' : ''}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Lane 3: Confirmed */}
            <div className="pipeline-lane confirmed">
              <div className="pipeline-lane-header">
                <span className="pipeline-lane-title">Confirmed</span>
                <span className="pipeline-lane-count">{pipeline.confirmed.length}</span>
              </div>
              {pipeline.confirmed.length === 0 ? (
                <p className="pipeline-empty-text">Nothing here right now.</p>
              ) : (
                pipeline.confirmed.map((item) => (
                  <div className="pipeline-item confirmed" key={item.id}>
                    <div className="pipeline-item-name">{item.name}</div>
                    <div className="pipeline-item-sub">{item.rollNo || 'D25IT118'}</div>
                    <div className="pipeline-ticket-code">{item.ticketCode}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Telemetry Footer Info */}
      <footer className="pipeline-telemetry-box">
        <div>
          <span>Architecture: </span>
          <span className="telemetry-tag">Node.js EventEmitter</span>
          <span> • Immediate 201 Created Response • Non-blocking Background Queue</span>
        </div>
        <div>
          <span>Student ID: </span>
          <span className="telemetry-tag">D25IT118</span>
        </div>
      </footer>
    </div>
  );
}

export default EventsPage;
