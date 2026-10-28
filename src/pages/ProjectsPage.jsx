import { useState, useEffect } from 'react';
import Projects from '../components/Projects';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import RepoList from '../components/RepoList';

const GITHUB_USERNAME = "diya2405";

function ProjectsPage() {
  const featuredProjects = [
    {
      title: "JobFlow",
      description: "AI-powered job management and recruitment application built using Flutter and Firebase.",
      tech: ["Flutter", "Firebase", "AI Integration"],
      link: "https://github.com/diya2405/JobFlow"
    },
    {
      title: "Ai_Assistant",
      description: "Multi-functional AI mobile app featuring real-time chatbot, AI image generation, and language translation.",
      tech: ["Flutter", "Dart", "Firebase", "OpenAI APIs"],
      link: "https://github.com/diya2405/Ai_Assistant"
    },
    {
      title: "Sentiment Analysis",
      description: "Machine learning model and data pipeline for detecting sentiment from unstructured textual data.",
      tech: ["Python", "NLP", "Scikit-Learn"],
      link: "https://github.com/diya2405?tab=repositories&q=Sentiment"
    },
    {
      title: "CodeQuest",
      description: "An interactive, gamified web coding platform for programming practice and skill development.",
      tech: ["React", "JavaScript", "CSS3"],
      link: "https://github.com/diya2405?tab=repositories&q=CodeQuest"
    },
    {
      title: "Task Management API",
      description: "Production Node.js/Express REST API with JWT authentication, Redis caching, and EventEmitter background processing.",
      tech: ["Node.js", "Express", "MongoDB", "Redis", "EventEmitter"],
      link: "https://github.com/diya2405/task-manager-api-D25IT118"
    },
    {
      title: "Event Desk (P10)",
      description: "Asynchronous background event pipeline using native Node.js EventEmitter without blocking client response.",
      tech: ["Node.js", "EventEmitter", "React", "Live Polling"],
      link: "https://github.com/diya2405/Portfolio-D25IT118"
    }
  ];

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retryCount]);

  const handleRetry = () => setRetryCount((c) => c + 1);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="projects-page-wrapper">
      {/* Featured Projects Grid */}
      <Projects projectlist={featuredProjects} />

      {/* Live GitHub Repositories Section */}
      <section className="live-repos-section">
        <div className="section-header">
          <span className="section-pill">Real-Time Sync</span>
          <h2 className="section-heading">All GitHub Repositories ({repos.length})</h2>
          <p className="section-subtext">
            Directly connected to GitHub REST API (<span className="mono">github.com/diya2405</span>).
          </p>
        </div>

        <div className="repo-search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="repo-search-input"
            placeholder="Search Diya's repositories by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading || error}
          />
        </div>

        {loading && <Spinner />}
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        {!loading && !error && <RepoList repos={filteredRepos} />}
      </section>
    </div>
  );
}

export default ProjectsPage;
