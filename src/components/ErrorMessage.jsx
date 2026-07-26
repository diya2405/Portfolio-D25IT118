function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <p>⚠️ Failed to load repositories.</p>
      <p className="error-detail">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;