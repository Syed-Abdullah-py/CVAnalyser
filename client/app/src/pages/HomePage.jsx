import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBoxComponent.jsx';
import '../css/HomePage.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to CV-AI</h1>
        <p className="app-description">CV-AI helps you create, manage, and analyze CV records efficiently. Use AI-powered chat to get quick assistance anytime.</p>
        <div className="button-groups">
          <button onClick={() => navigate('/add-cv')}>Add CV</button>
          <button onClick={() => navigate('/view-records')}>View Records</button>
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
