// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DoctorListPage from './pages/DoctorListPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/doctors" replace />} />
          <Route path="/doctors" element={<DoctorListPage />} />
          <Route path="/book" element={<BookAppointmentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;