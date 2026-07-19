function Education() {
  const timeline = [
    { year: "2024 - Present", title: "B.Tech, Information Technology", place: "CHARUSAT University, Anand", detail: "2nd Year · CSPIT" },
    { year: "2023", title: "Diploma Engineering", place: "CGPA: 9.47", detail: "Cleared DDCET — Rank 58" },
  ];

  return (
    <div className="terminal-block">
      <p className="terminal-label">$ cat education.log</p>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h4>{item.title}</h4>
              <p>{item.place}</p>
              <p className="detail">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;