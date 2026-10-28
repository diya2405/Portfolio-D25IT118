function Education() {
  const timeline = [
    {
      year: "2024 – Present",
      title: "B.Tech, Information Technology",
      place: "CSPIT · CHARUSAT University",
      badge: "Student ID: D25IT118",
      desc: "Focusing on Advanced Web Development, Distributed Systems, Database Architectures & Cloud."
    },
    {
      year: "2021 – 2024",
      title: "Diploma in Information Technology",
      place: "Government Polytechnic",
      badge: "CGPA: 9.47 · DDCET Rank 58",
      desc: "Awarded top academic ranking with distinction in core software engineering."
    },
  ];

  return (
    <div className="modern-card education-card">
      <div className="card-top-badge">
        <span className="card-icon">🎓</span>
        <span className="card-label">education.json</span>
      </div>
      <h3 className="card-title">Academic Background</h3>
      <div className="modern-timeline">
        {timeline.map((item, i) => (
          <div className="modern-timeline-item" key={i}>
            <div className="timeline-marker">
              <span className="marker-dot"></span>
              {i < timeline.length - 1 && <span className="marker-line"></span>}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-badge">{item.badge}</span>
              </div>
              <h4 className="timeline-title">{item.title}</h4>
              <p className="timeline-place">{item.place}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
