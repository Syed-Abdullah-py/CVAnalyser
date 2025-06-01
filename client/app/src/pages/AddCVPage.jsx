import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/AddCVPage.css';

function AddCV() {
  const navigate = useNavigate();
  const { cvId } = useParams();

  const initialFormData = {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    addr: '',
    availability: 'Available',
    prefJob: '',
    matric_total_marks: '',
    matric_obtained_marks: '',
    matric_grade: '',
    inter_total_marks: '',
    inter_obtained_marks: '',
    inter_grade: '',
    bachelors_total_marks: '',
    bachelors_obtained_marks: '',
    bachelors_grade: '',
    masters_total_marks: '',
    masters_obtained_marks: '',
    masters_grade: '',
    totalExperience: '',
    role: '',
    company_name: '',
    designation: '',
    start_date: '',
    end_date: '',
    skills: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cvId && cvId !== '0') {
      setLoading(true);
      axios.get(`https://syedabdullah.pythonanywhere.com/api/cv/${cvId}/`)
        .then(response => {
          setFormData(prev => ({
            ...prev,
            ...response.data
          }));
        })
        .catch(error => console.error('Error loading CV:', error))
        .finally(() => setLoading(false));
    }
  }, [cvId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      matric_total_marks: Number(formData.matric_total_marks) || 0,
      matric_obtained_marks: Number(formData.matric_obtained_marks) || 0,
      inter_total_marks: Number(formData.inter_total_marks) || 0,
      inter_obtained_marks: Number(formData.inter_obtained_marks) || 0,
      bachelors_total_marks: Number(formData.bachelors_total_marks) || 0,
      bachelors_obtained_marks: Number(formData.bachelors_obtained_marks) || 0,
      masters_total_marks: Number(formData.masters_total_marks) || 0,
      masters_obtained_marks: Number(formData.masters_obtained_marks) || 0,
      totalExperience: Number(formData.totalExperience) || 0,
    };

    try {
      if (cvId) {
        await axios.put(`https://syedabdullah.pythonanywhere.com/api/cv/${cvId}/`, payload);
        alert('CV updated successfully!');
        navigate('/view-records');
      } else {
        await axios.post('https://syedabdullah.pythonanywhere.com/api/cv/', payload);
        alert('CV submitted successfully!');
        setFormData(initialFormData);
        navigate('/');
      }
    } catch (error) {
      console.error('Submit error:', error.response || error.message);
      alert('Failed to submit CV. Please try again.');
    } finally {
      setLoading(false);
    }
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
    <div className="add-cv-container">
      <div className="form-card">
        <h1>{cvId ? 'Edit CV' : 'Add CV'}</h1>
        <hr />
        <form className="cv-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="fName"
                placeholder="Enter first name"
                value={formData.fName||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lName"
                placeholder="Enter last name"
                value={formData.lName||''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email||''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                maxLength={11}
                value={formData.phone||''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address*/}
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <textarea
                rows={6}
                name="addr"
                placeholder="Enter your address"
                value={formData.addr||''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Availability and Preferred Job */}
          <div className="form-row">
            <div className="form-group">
              <label>Availability for Job</label>
              <select
                name="availability"
                value={formData.availability||''}
                onChange={handleChange}
              >
                <option value="Immediate">Immediate</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Job</label>
              <select
                name="prefJob"
                value={formData.prefJob||''}
                onChange={handleChange}
              >
                <option value="">Select preferred job</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Project Manager">Project Manager</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Qualification */}
          <div className="form-row">
            <div className="form-group full-width">
              <h3>Qualification</h3>
              <div className="qualification-table">
                <hr />
                <div className="qualification-header">
                  <div></div>
                  <div>Total Marks</div>
                  <div>Obtained Marks</div>
                  <div>Grade</div>
                </div>

                {/* Matric */}
                <div className="qualification-row">
                  <div>Matric</div>
                  <input
                    type="number"
                    name="matric_total_marks"
                    placeholder="Total"
                    value={formData.matric_total_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="matric_obtained_marks"
                    placeholder="Obtained"
                    value={formData.matric_obtained_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="matric_grade"
                    placeholder="Grade"
                    maxLength={1}
                    value={formData.matric_grade||''}
                    onChange={handleChange}
                  />
                </div>

                {/* FSc (Intermediate) */}
                <div className="qualification-row">
                  <div>FSc</div>
                  <input
                    type="number"
                    name="inter_total_marks"
                    placeholder="Total"
                    value={formData.inter_total_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="inter_obtained_marks"
                    placeholder="Obtained"
                    value={formData.inter_obtained_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="inter_grade"
                    placeholder="Grade"
                    maxLength={1}
                    value={formData.inter_grade||''}
                    onChange={handleChange}
                  />
                </div>

                {/* Bachelors */}
                <div className="qualification-row">
                  <div>Bachelors</div>
                  <input
                    type="number"
                    name="bachelors_total_marks"
                    placeholder="Total"
                    value={formData.bachelors_total_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="bachelors_obtained_marks"
                    placeholder="Obtained"
                    value={formData.bachelors_obtained_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="bachelors_grade"
                    placeholder="Grade"
                    maxLength={1}
                    value={formData.bachelors_grade||''}
                    onChange={handleChange}
                  />
                </div>



                {/* Masters */}
                <div className="qualification-row">
                  <div>Masters</div>
                  <input
                    type="number"
                    name="masters_total_marks"
                    placeholder="Total"
                    value={formData.masters_total_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="masters_obtained_marks"
                    placeholder="Obtained"
                    value={formData.masters_obtained_marks||''}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="masters_grade"
                    placeholder="Grade"
                    maxLength={1}
                    value={formData.masters_grade||''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        {/* Experience */}
          <div className="form-row">
            <div className="form-group full-width">
              <h3>Experience</h3>
              <hr className="section-divider" />
              <div className="experience-section">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Enter company name"
                  value={formData.company_name||''}
                  onChange={handleChange}
                />

                <label>Your Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
                  value={formData.designation||''}
                  onChange={handleChange}
                />

                <label>Role in Company</label>
                <textarea
                  name="role"
                  placeholder="Describe your role"
                  value={formData.role||''}
                  onChange={handleChange}
                />

                <label>Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date||''}
                  onChange={handleChange}
                />

                <label>End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date||''}
                  onChange={handleChange}
                />

                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="Enter your skills (comma separated)"
                  value={formData.skills||''}
                  onChange={handleChange}
                />

                <label>Total Experience (in years)</label>
                <input
                  type="number"
                  name="totalExperience"
                  min="0"
                  placeholder="Enter experience in years"
                  value={formData.totalExperience||''}
                  onChange={handleChange}
                />

              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit">{cvId ? 'Update CV' : 'Submit CV'}</button>
            <button type="button" onClick={() => navigate(cvId ? '/view-records':'/')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCV;
