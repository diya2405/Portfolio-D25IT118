function Header({ name }) {
  return (
    <header className="hero">
      <span className="mono small">01 // profile</span>
      <h1>{name}</h1>
      <p className="tagline">IT Student · Flutter & Full-Stack Developer · Building with AI</p>
      <a className="btn" href="https://github.com/diya2405" target="_blank" rel="noreferrer">View GitHub →</a>
    </header>
  );
}
export default Header;