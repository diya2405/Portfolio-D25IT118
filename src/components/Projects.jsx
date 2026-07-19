function Projects({ projectlist }) {
  return (
    <section className="panel">
      <div className="panel-tab">projects.md</div>
      <div className="grid">
        {projectlist.map((p, i) => (
          <div className="card" key={i}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="tag-list inline">
              {p.tech.map((t, j) => <span key={j}>{t}</span>)}
            </div>
            <a href={p.link} target="_blank" rel="noreferrer">GitHub →</a>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Projects;