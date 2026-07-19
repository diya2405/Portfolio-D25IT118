function Skills({ skillsList }) {
  return (
    <section className="panel">
      <div className="panel-tab">skills.json</div>
      <ul className="tag-list">
        {skillsList.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </section>
  );
}
export default Skills;