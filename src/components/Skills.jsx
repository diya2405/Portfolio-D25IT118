function Skills(props) {
  return (
    <section>
      <h1>My Skills</h1>

      <ul>
        {props.skillsList.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;