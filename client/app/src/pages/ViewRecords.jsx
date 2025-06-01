import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/CardComponent';  
import '../css/viewRecords.css';

function ViewRecords() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCv = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://syedabdullah.pythonanywhere.com/api/cv/");
      setCvs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllCv();
  }, []);

  const handleDelete = async (cvId) => {
    if (window.confirm('Are you sure you want to delete this CV?')) {
      try {
        setLoading(true)
        await axios.delete(`https://syedabdullah.pythonanywhere.com/api/cv/${cvId}/`);
        alert('CV deleted successfully');
        setCvs(cvs.filter(cv => cv.id !== cvId));
      } catch (error) {
        console.error('Delete error:', error.response || error.message);
        alert('Failed to delete CV. Please try again.');
      } finally {
        setLoading(false)
      }
    }
  };

  const handleEdit = (cvId) => {
    navigate(`/cv/${cvId}`);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <span>
          <p>View Records Page</p>
          <button onClick={() => navigate('/')}>Back</button>
        </span>

        {cvs.length > 0 ? (
          cvs.map((cv) => (
            <Card 
              key={cv.id} 
              cvData={cv} 
              onDelete={handleDelete} 
              onEdit={() => handleEdit(cv.id)} 
            />
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewRecords;
