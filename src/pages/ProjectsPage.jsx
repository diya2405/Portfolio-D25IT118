import Projects from '../components/Projects';

function ProjectsPage() {
  const projects = [
    {
      title: "YoursOnly",
      description: "An AI emotional companion Flutter app with persona-isolated chat and long-term memory via a RAG pipeline (Gemini → Groq → Ollama fallback), backed by Firebase.",
      tech: ["Flutter", "Firebase", "RAG", "Gemini API"],
      link: "https://github.com/diya2405"
    },
    {
      title: "TransitOps",
      description: "A smart fleet management hackathon project. Built the Safety Officer Dashboard with a React frontend, Node.js/Express backend, and PostgreSQL database.",
      tech: ["React", "Node.js", "Express", "PostgreSQL"],
      link: "https://github.com/diya2405"
    },
    {
      title: "JobFlow",
      description: "An AI-powered recruitment platform with three user roles (candidate, recruiter, admin), built in Flutter with Firebase and a Python AI backend for resume matching.",
      tech: ["Flutter", "Firebase", "Python"],
      link: "https://github.com/diya2405"
    },
    {
      title: "EventHub",
      description: "An event registration system with JWT authentication and role-based access control, built during a Python/Flask internship.",
      tech: ["Flask", "MongoDB", "JWT"],
      link: "https://github.com/diya2405"
    }
  ];

  return <Projects projectlist={projects} />;
}

export default ProjectsPage;