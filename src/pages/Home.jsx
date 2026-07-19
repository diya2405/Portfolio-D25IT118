import { useState } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const [showSkills, setShowSkills] = useState(true); // toggles UI visibility

  const skills = ["Java", "Flutter", "Database", "Python", "Machine Learning"];

  return (
    <>
      <Header name="Diya Shah" />
      <About />
      <button onClick={() => setShowSkills(!showSkills)}>
        {showSkills ? "Hide Skills" : "Show Skills"}
      </button>
      {showSkills && <Skills skillsList={skills} />}
    </>
  );
}

export default Home;