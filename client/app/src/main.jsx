import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import AddCV from './pages/AddCVPage'
import ViewRecords from './pages/ViewRecords'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-cv" element={<AddCV />} />
        <Route path="/view-records" element={<ViewRecords />} />
        <Route path="/cv-form/:id?" element={<AddCV />} />
        <Route path="/cv/:cvId" element={<AddCV />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
