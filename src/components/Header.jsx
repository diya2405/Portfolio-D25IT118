import { Link } from 'react-router-dom';
import profilePhoto from '../assets/diya-profile.png';

function Header({ name = "Diya Shah" }) {
  return (
    <header className="hero-section">
      <div className="hero-container">
        {/* Left Column: Text & Actions */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>CHARUSAT CSPIT · Student ID: D25IT118</span>
          </div>

          <h1 className="hero-greeting">
            Hi,<br />
            I'm <span className="hero-highlight">{name}</span><br />
            <span className="hero-title">Web & Mobile Developer</span>
          </h1>

          <p className="hero-description">
            Passionate 3rd-year B.Tech IT engineer crafting modern full-stack web applications,
            asynchronous event-driven architectures, and high-performance Flutter mobile apps.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-modern btn-primary">
              Contact Me
            </Link>
            <Link to="/projects" className="btn-modern btn-secondary">
              View Projects →
            </Link>
            <Link to="/events" className="btn-modern btn-highlight">
              ⚡ Event Desk (P10)
            </Link>
          </div>

          <div className="hero-socials">
            <a
              href="https://github.com/diya2405"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              title="GitHub Profile"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>diya2405</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              title="LinkedIn Profile"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:diya@example.com"
              className="social-pill"
              title="Email Contact"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
              <span>diya@example.com</span>
            </a>
          </div>
        </div>

        {/* Right Column: Organic Blob with Diya's Photo */}
        <div className="hero-visual">
          <div className="blob-container">
            <div className="blob-shape">
              <img
                src={profilePhoto}
                alt="Diya Shah - Full Stack Developer"
                className="blob-photo"
                loading="eager"
              />
            </div>

            {/* Floating Mini Status Card */}
            <div className="floating-card floating-card-top">
              <span className="floating-dot"></span>
              <div>
                <strong>B.Tech IT</strong>
                <span>D25IT118 · CSPIT</span>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">🚀</span>
              <div>
                <strong>Event-Driven</strong>
                <span>Node.js & React</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
