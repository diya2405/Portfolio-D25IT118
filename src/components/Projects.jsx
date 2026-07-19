function Projects(props) {
  return (
    <section>
      <h1>Projects</h1>
      <div className="project-grid">
        {props.projectlist.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.tech.map((t, i) => (
                <span className="tech-tag" key={i}>{t}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noreferrer">View on GitHub →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;