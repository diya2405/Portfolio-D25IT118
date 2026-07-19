import { useState } from 'react';
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <section>
      <h2>Send me a message</h2>
      <p>Tip: Mention your project details for a faster reply.</p>
      <br /><br />

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />
      <br /><br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
      />
      <br /><br />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <p>Characters: {message.length}</p>
        <br /><br />
        <button class="btn" onClick={() => {
            alert(`Thank you, ${name}! Your message has been sent.`);
            setName("");
            setEmail("");
            setMessage("");
        }}>Send Message</button>
        <br /><br />
      <p>Or connect with me through <a href="https://github.com/diya2405">Github</a></p>
    </section>
  );
}
export default Contact;