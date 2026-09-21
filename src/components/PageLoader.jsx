function PageLoader({ message = "Loading component..." }) {
  return (
    <div className="page-loader-container">
      <div className="page-loader-spinner"></div>
      <p className="page-loader-text mono">{message}</p>
    </div>
  );
}

export default PageLoader;
