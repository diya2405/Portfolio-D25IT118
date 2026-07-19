import { useState } from 'react';
import Contact from '../components/Contact';

function ContactPage() {
  const [message, setMessage] = useState(""); // controlled form input

  return (
    <>
      <Contact />
      <section>
        <h2>Send me a message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <p>Characters: {message.length}</p>
      </section>
    </>
  );
}

export default ContactPage;