function Education() {
  const timeline = [
    { year: "2024–Present", title: "B.Tech, Information Technology", place: "CHARUSAT University · CSPIT" },
    { year: "2023", title: "Diploma Engineering", place: "CGPA 9.47 · DDCET Rank 58" },
  ];
  return (
    <div className="panel">
      <div className="panel-tab">education.json</div>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div className="timeline-item" key={i}>
            <span className="dot" />
            <span className="mono small">{item.year}</span>
            <h4>{item.title}</h4>
            <p>{item.place}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Education;