// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  // useLocation gives current URL path
  // Used to highlight active nav link

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    {/* sticky top-0 = stays at top when user scrolls
        z-50 = appears above other elements */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center
                      justify-between">

        {/* Logo */}
        <Link to="/doctors"
              className="text-xl font-bold text-primary-600">
          🏥 HMS
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/doctors"
            className={`text-sm font-medium transition-colors
              ${isActive('/doctors')
                ? 'text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
              }`}>
            Doctors
          </Link>

          {/* Phase 6: add Login/Profile here based on auth state */}
          <button className="px-4 py-2 bg-primary-600 text-white text-sm
                             font-medium rounded-xl hover:bg-primary-700
                             transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;