import { useState } from 'react';

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showTip, setShowTip] = useState(true);

  return (
    <section className="contact-section">
      <span className="panel-tab">contact.js</span>
      <h2>Send me a message</h2>
      {showTip && (
        <p className="contact-tip">
          💡 <strong>Tip:</strong> Mention your project details for a faster reply.
          <button className="tip-toggle-btn" onClick={() => setShowTip(false)}>dismiss</button>
        </p>
      )}

      <div className="contact-field">
        <label>Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Diya Shah"
        />
      </div>

      <div className="contact-field">
        <label>Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="diya@example.com"
        />
      </div>

      <div className="contact-field">
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <div className="char-count">Characters: <strong>{message.length}</strong></div>
      </div>

      <button
        className="btn"
        onClick={() => {
          if (!name.trim()) {
            alert('Please enter your name.');
            return;
          }
          alert(`Thank you, ${name}! Your message has been sent.`);
          setName("");
          setEmail("");
          setMessage("");
        }}
      >
        Send Message
      </button>

      <div className="contact-footer-note">
        Or connect with me through <a href="https://github.com/diya2405" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </section>
  );
}

export default Contact;
