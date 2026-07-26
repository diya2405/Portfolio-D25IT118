function RepoList({ repos }) {
  if (repos.length === 0) {
    return <p className="no-repos">No repositories match your search.</p>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <h3>{repo.name}</h3>
          {repo.description && <p className="repo-desc">{repo.description}</p>}
          <p className="repo-stars">⭐ {repo.stargazers_count}</p>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </div>
      ))}
    </div>
  );
}

export default RepoList;