import Projects from '../components/Projects';

function ProjectsPage() {
  const projects = [
    {
      title: "YoursOnly",
      description: "AI emotional companion app with persona-isolated chat and RAG-based memory.",
      tech: ["Flutter", "Firebase", "RAG"], link: "https://github.com/diya2405"
    },
    {
      title: "TransitOps",
      description: "Fleet management dashboard — built the Safety Officer module.",
      tech: ["React", "Node.js", "PostgreSQL"], link: "https://github.com/diya2405"
    },
    {
      title: "JobFlow",
      description: "AI recruitment platform with 3 user roles and resume matching.",
      tech: ["Flutter", "Firebase", "Python"], link: "https://github.com/diya2405"
    },
    {
      title: "EventHub",
      description: "Event registration system with JWT auth and role-based access.",
      tech: ["Flask", "MongoDB", "JWT"], link: "https://github.com/diya2405"
    },
  ];
  return <Projects projectlist={projects} />;
}
export default ProjectsPage;