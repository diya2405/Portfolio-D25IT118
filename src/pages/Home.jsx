import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';

function Home() {
  const skills = ["Java", "Flutter", "Dart", "Python", "Firebase", "React", "Node.js", "SQL", "Machine Learning"];

  return (
    <>
      <Header name="Diya Shah" />

      <div className="split-section">
        <div className="split-col">
          <About />
        </div>
        <div className="split-col">
          <Education />
        </div>
      </div>

      <Skills skillsList={skills} />
    </>
  );
}

export default Home;