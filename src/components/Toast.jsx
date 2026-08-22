import './Tasks.css';

function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-dot"></span>
      {message}
    </div>
  );
}

export default Toast;
