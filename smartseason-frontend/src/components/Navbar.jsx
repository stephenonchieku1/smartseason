import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-200 mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-sm border border-gray-200">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="w-px h-5 bg-gray-200"></div>
        <button 
          onClick={handleLogout}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
