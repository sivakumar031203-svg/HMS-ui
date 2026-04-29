import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorListPage from './pages/DoctorListPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/doctors" element={<DoctorListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;