import { Link } from 'react-router-dom';
import Header from '../components/Header';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';

function Home() {
  const quickProjects = [
    {
      title: "JobFlow",
      category: "Mobile Application",
      description: "AI-powered job management and recruitment system built using Flutter and Firebase.",
      tech: ["Flutter", "Firebase", "AI Integration"],
      link: "https://github.com/diya2405/JobFlow",
      icon: "📱"
    },
    {
      title: "Ai_Assistant",
      category: "AI & Mobile",
      description: "Smart chatbot, image generator, and language translator powered by AI APIs.",
      tech: ["Flutter", "Dart", "Firebase", "AI APIs"],
      link: "https://github.com/diya2405/Ai_Assistant",
      icon: "🧠"
    },
    {
      title: "Event Desk",
      category: "Event-Driven System",
      description: "Non-blocking event pipeline with Node.js EventEmitter and real-time confirmation.",
      tech: ["Node.js", "EventEmitter", "React", "Live Polling"],
      link: "/events",
      isInternal: true,
      icon: "⚡"
    }
  ];

  return (
    <div className="home-page-container">
      {/* Hero Section matching the minimalist reference */}
      <Header name="Diya Shah" />

      {/* Metrics / Stats Strip */}
      <section className="stats-strip">
        <div className="stat-item">
          <span className="stat-number">20+</span>
          <span className="stat-label">GitHub Repositories</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">9.47</span>
          <span className="stat-label">Diploma CGPA (Rank 58)</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">10+</span>
          <span className="stat-label">Engineered Modules</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">D25IT118</span>
          <span className="stat-label">Student ID · CSPIT</span>
        </div>
      </section>

      {/* About & Education Dual Cards */}
      <section className="split-cards-section">
        <About />
        <Education />
      </section>

      {/* Skills Showcase */}
      <Skills />

      {/* Highlighted Projects Showcase Grid Box */}
      <section className="home-projects-section">
        <div className="section-header">
          <span className="section-pill">Portfolio Highlights</span>
          <h2 className="section-heading">Featured Projects in Grid</h2>
          <p className="section-subtext">
            Handpicked applications showcasing full-stack engineering, asynchronous queues, and mobile design.
          </p>
        </div>

        <div className="project-grid-boxes">
          {quickProjects.map((p, i) => (
            <div className="project-box-card" key={i}>
              <div className="project-box-top">
                <span className="project-box-icon">{p.icon}</span>
                <span className="project-badge">{p.category}</span>
              </div>

              <h3 className="project-box-title">{p.title}</h3>
              <p className="project-box-desc">{p.description}</p>

              <div className="project-box-tags">
                {p.tech.map((t, j) => (
                  <span className="project-tag" key={j}>{t}</span>
                ))}
              </div>

              <div className="project-box-footer">
                {p.isInternal ? (
                  <Link to={p.link} className="project-link-btn highlight-link">
                    <span>Open Live Demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ) : (
                  <a href={p.link} target="_blank" rel="noreferrer" className="project-link-btn">
                    <span>View on GitHub</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="view-more-container">
          <Link to="/projects" className="btn-modern btn-primary">
            Explore All Projects & Repositories →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
