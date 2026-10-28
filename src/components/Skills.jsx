function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Java", "Dart", "JavaScript (ES6+)", "Python", "SQL"]
    },
    {
      category: "Frontend & Mobile",
      skills: ["Flutter", "React.js", "HTML5/CSS3", "Responsive UI", "Vite"]
    },
    {
      category: "Backend & Systems",
      skills: ["Node.js", "Express.js", "EventEmitter", "REST APIs", "JWT Auth"]
    },
    {
      category: "Databases & Cloud",
      skills: ["MongoDB & Mongoose", "Redis Caching", "Firebase", "Git & GitHub"]
    }
  ];

  return (
    <section className="modern-skills-section">
      <div className="section-header">
        <span className="section-pill">Technical Arsenal</span>
        <h2 className="section-heading">Skills & Core Competencies</h2>
        <p className="section-subtext">
          Modern languages, frameworks, and system design tools utilized across academic and live engineering projects.
        </p>
      </div>

      <div className="skills-grid-boxes">
        {skillCategories.map((cat, i) => (
          <div className="skill-box-card" key={i}>
            <div className="skill-box-header">
              <span className="skill-box-bullet"></span>
              <h4>{cat.category}</h4>
            </div>
            <div className="skill-pill-list">
              {cat.skills.map((skill, j) => (
                <span className="skill-pill" key={j}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
