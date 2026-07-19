import Projects from '../components/Projects';

function ProjectsPage() {
  const projects = ["AI Assistant App", "JobFlow App"];
  return <Projects projectlist={projects} />;
}

export default ProjectsPage;