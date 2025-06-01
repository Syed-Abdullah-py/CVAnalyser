import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function ChatBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null); 

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);

    try {
      setMessage('');
      const res = await fetch('https://syedabdullah.pythonanywhere.com/api/cv/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const payload = await res.json();
      const aiText = payload.answer || 'No response';
      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      console.error('Fetch error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, something went wrong.' },
      ]);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-history" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'ai' ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {messages.length > 0 && <div ref={chatEndRef} />} 
      </div>

      <form onSubmit={handleSend} className="input-group">
        <input
          type="text"
          placeholder="Type your message..."
          name="query"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete='off'
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
