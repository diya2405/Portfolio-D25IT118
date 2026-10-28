function Projects({ projectlist }) {
  return (
    <section className="projects-grid-section">
      <div className="section-header">
        <span className="section-pill">Featured Work</span>
        <h2 className="section-heading">Engineered Projects & Solutions</h2>
        <p className="section-subtext">
          Production-grade applications built across mobile, cloud, machine learning, and full-stack web architectures.
        </p>
      </div>

      <div className="project-grid-boxes">
        {projectlist.map((p, i) => (
          <div className="project-box-card" key={i}>
            <div className="project-box-top">
              <span className="project-box-icon">
                {p.tech.some(t => t.toLowerCase().includes('flutter')) ? '📱' :
                 p.tech.some(t => t.toLowerCase().includes('learning') || t.toLowerCase().includes('nlp') || t.toLowerCase().includes('ai')) ? '🧠' :
                 p.tech.some(t => t.toLowerCase().includes('react')) ? '⚛️' : '💻'}
              </span>
              <span className="project-badge">Verified Repo</span>
            </div>

            <h3 className="project-box-title">{p.title}</h3>
            <p className="project-box-desc">{p.description}</p>

            <div className="project-box-tags">
              {p.tech.map((t, j) => (
                <span className="project-tag" key={j}>{t}</span>
              ))}
            </div>

            <div className="project-box-footer">
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="project-link-btn"
              >
                <span>View on GitHub</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
