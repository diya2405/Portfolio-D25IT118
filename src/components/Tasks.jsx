import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';
import './Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [creating, setCreating] = useState(false);
  const toastTimer = useRef(null);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Handle 401 — session expired
  function handleAuthError(err) {
    if (err.status === 401) {
      showToast('Session expired — please log in again', 'error');
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 1000);
      return true;
    }
    return false;
  }

  // Clear toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Fetch tasks on mount
  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        if (!handleAuthError(err)) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  function showToast(message, type = 'success') {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 2500);
  }

  // Create (optimistic)
  async function handleCreate(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const tempId = `temp-${crypto.randomUUID?.() ?? Date.now()}`;
    const tempTask = {
      _id: tempId,
      title: trimmedTitle,
      description: description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [tempTask, ...prev]);
    setTitle('');
    setDescription('');
    setCreating(true);

    try {
      const saved = await createTask(token, { title: trimmedTitle, description });
      setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
      showToast('Task created');
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      if (!handleAuthError(err)) {
        showToast(err.message, 'error');
      }
    } finally {
      setCreating(false);
    }
  }

  // Toggle complete (non-optimistic — waits for server)
  async function handleToggle(id, currentCompleted) {
    try {
      const updated = await updateTask(token, id, { completed: !currentCompleted });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      showToast(updated.completed ? 'Task completed' : 'Task reopened');
    } catch (err) {
      if (!handleAuthError(err)) {
        showToast(err.message, 'error');
      }
    }
  }

  // Delete (with confirmation)
  async function handleDelete(id) {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast('Task deleted');
    } catch (err) {
      if (!handleAuthError(err)) {
        showToast(err.message, 'error');
      }
    }
  }

  return (
    <section className="tasks-section">
      <div className="tasks-card">
        <span className="tasks-label">tasks.live</span>

        <form className="task-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" disabled={creating || !title.trim()}>
            {creating ? 'Adding…' : 'Add Task'}
          </button>
        </form>

        {loading && <p className="tasks-loading">Loading tasks…</p>}
        {error && <p className="tasks-error">{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <p className="tasks-empty">No tasks yet — add one above.</p>
        )}

        {!loading && !error && tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={
                  'task-item' +
                  (task.completed ? ' completed' : '') +
                  (String(task._id).startsWith('temp-') ? ' temp' : '')
                }
              >
                <div className="task-info">
                  <p className="task-title">{task.title}</p>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                </div>
                {!String(task._id).startsWith('temp-') && (
                  <div className="task-actions">
                    <button onClick={() => handleToggle(task._id, task.completed)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} />
    </section>
  );
}

export default Tasks;
