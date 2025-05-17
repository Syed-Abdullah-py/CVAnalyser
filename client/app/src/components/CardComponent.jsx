import { useState } from 'react';
import '../css/CardComponent.css';

function Card({ cvData, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!cvData) return null;

  return (
    <div className="cv-card">
      <div className="cv-card-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3>Basic Info</h3>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '5px',
              marginLeft: '10px'
            }}
            title={showDetails ? 'Hide Details' : 'Show Details'}
          >
          {showDetails ? '▲' : '▼'}
          </button>
        </div>
        <hr id='hr1' />
        <div className="label">First Name</div><div className="value">{cvData.fName}</div>
        <div className="label">Last Name</div><div className="value">{cvData.lName}</div>

        {showDetails && (
          <>
            <div className="label">Email</div><div className="value">{cvData.email}</div>
            <div className="label">Phone</div><div className="value">{cvData.phone}</div>

            <div className="label">Address</div><div className="value">{cvData.addr}</div>
            
            <div className="label">Availability</div><div className="value">{cvData.availability}</div>
            <div className="label">Preferred Job</div><div className="value">{cvData.prefJob}</div>

            <h3>Qualification</h3>
            <hr />
            <div className="label">Matric</div><div className="value">{cvData.matric_obtained_marks}/{cvData.matric_total_marks}</div>
            <div className='label'>Grade</div><div className='value'>{cvData.matric_grade}</div>
            
            <div className="label">Inter</div><div className="value">{cvData.inter_obtained_marks}/{cvData.inter_total_marks}</div>
            <div className='label'>Grade</div><div className='value'>{cvData.inter_grade}</div>
            
            <div className="label">Bachelors</div><div className="value">{cvData.bachelors_obtained_marks}/{cvData.bachelors_total_marks}</div>
            <div className='label'>Grade</div><div className='value'>{cvData.bachelors_grade}</div>
            
            <div className="label">Masters</div><div className="value">{cvData.masters_obtained_marks}/{cvData.masters_total_marks}</div>
            <div className='label'>Grade</div><div className='value'>{cvData.masters_grade}</div>

            <h3>Experience</h3>
            <hr />

            <div className="label">Company Name</div><div className="value">{cvData.company_name}</div>
            <div className="label">Designation</div><div className="value">{cvData.designation}</div>
            <div className="label">Role</div><div className="value">{cvData.role}</div>

            <div className="label">Start Date</div><div className="value">{cvData.start_date}</div>
            <div className="label">End Date</div><div className="value">{cvData.end_date}</div>
            <div className="label">Skills</div><div className="value">{cvData.skills}</div>

            <div className="label">Total Experience</div><div className="value">{cvData.totalExperience} Years</div>
          </>
        )}
      </div>
      <hr />
      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(cvData.id)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(cvData.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
