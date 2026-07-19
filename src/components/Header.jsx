function Header(props) {
  return (
    <header className="hero">
      <p className="prompt">root@portfolio:~$ whoami</p>
      <h1 className="glitch">{props.name}</h1>
      <p className="tagline">&gt; IT Student :: Flutter & Full-Stack Dev :: Building with AI_</p>
      <div className="header-links">
        <a href="https://github.com/diya2405" target="_blank" rel="noreferrer">[ GitHub ]</a>
      </div>
    </header>
  );
}

export default Header;