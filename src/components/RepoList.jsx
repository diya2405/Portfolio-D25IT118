function RepoList({ repos }) {
  if (repos.length === 0) {
    return (
      <div className="no-repos-box">
        <span className="no-repos-icon">🔍</span>
        <p>No repositories match your search query.</p>
      </div>
    );
  }

  return (
    <div className="repo-grid-boxes">
      {repos.map((repo) => (
        <div className="repo-box-card" key={repo.id}>
          <div className="repo-box-header">
            <span className="repo-folder-icon">📁</span>
            <div className="repo-meta-right">
              {repo.language && (
                <span className="repo-lang-pill">{repo.language}</span>
              )}
              <span className="repo-stars-pill">
                ⭐ {repo.stargazers_count || 0}
              </span>
            </div>
          </div>

          <h3 className="repo-box-name">{repo.name}</h3>
          <p className="repo-box-desc">
            {repo.description || "Public repository developed and maintained by Diya Shah (D25IT118)."}
          </p>

          <div className="repo-box-bottom">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="repo-box-link"
            >
              <span>Explore Code</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
