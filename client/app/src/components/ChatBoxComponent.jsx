import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/cv/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const payload = await res.json();
      const aiText = payload.answer || 'No response';
      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      console.error('Fetch error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'ai' ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="input-group">
        <input
          type="text"
          placeholder="Type your message..."
          name="query"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;