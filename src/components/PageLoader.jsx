function PageLoader({ routeName = "route.chunk", message = "Loading lazy component chunk..." }) {
  return (
    <section className="page-loader-section">
      <div className="page-loader-card">
        <span className="page-loader-badge mono">{routeName}</span>
        <div className="page-loader-spinner"></div>
        <p className="page-loader-text mono">{message}</p>
        <span className="page-loader-subtext">Practical 8 • Code Splitting & Lazy Loading</span>
      </div>
    </section>
  );
}

export default PageLoader;
