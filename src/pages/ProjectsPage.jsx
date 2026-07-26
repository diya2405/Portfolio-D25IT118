import { useState, useEffect } from 'react';
import Projects from '../components/Projects';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import RepoList from '../components/RepoList';

const GITHUB_USERNAME = "diya2405"; // your confirmed real GitHub username

function ProjectsPage() {
  // Static featured projects — now using your REAL, verified repos
  const projects = [
    {
      title: "JobFlow",
      description: "AI-powered job management and recruitment application built using Flutter and Firebase.",
      tech: ["Flutter", "Firebase", "AI Integration"],
      link: "https://github.com/diya2405/JobFlow"
    },
    {
      title: "Ai_Assistant",
      description: "Multi-functional AI mobile app — chatbot, AI image generation, and language translation.",
      tech: ["Flutter", "Dart", "Firebase", "AI APIs"],
      link: "https://github.com/diya2405/Ai_Assistant"
    },
    {
      title: "Sentiment Analysis",
      description: "Machine learning project for detecting sentiment from text data.",
      tech: ["Python", "NLP", "Machine Learning"],
      link: "https://github.com/diya2405?tab=repositories&q=Sentiment"
    },
    {
      title: "CodeQuest",
      description: "A React-based coding platform for interactive, gamified programming practice.",
      tech: ["React", "JavaScript"],
      link: "https://github.com/diya2405?tab=repositories&q=CodeQuest"
    },
  ];

  // Live GitHub API state (this pulls ALL your real repos automatically)
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
    <>

      <section className="live-repos">
        <h2 className="section-title">projects.live // GitHub Repos ({repos.length})</h2>

        <input
          type="text"
          className="repo-search"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading || error}
        />

        {loading && <Spinner />}
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        {!loading && !error && <RepoList repos={filteredRepos} />}
      </section>
    </>
  );
}

export default ProjectsPage;