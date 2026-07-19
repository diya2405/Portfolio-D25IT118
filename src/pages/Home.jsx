import Header from '../components/Header';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';

function Home() {
  const skills = ["Java", "Flutter", "Dart", "Python", "Firebase", "React", "Node.js", "SQL", "Machine Learning"];
  return (
    <>
      <Header name="Diya Shah" />
      <div className="split">
        <About />
        <Education />
      </div>
      <Skills skillsList={skills} />
    </>
  );
}
export default Home;