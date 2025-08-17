import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Header() {
  const { adminToken, userToken, logoutAdmin, logoutUser } = useAuthStore();

  return (
    <header className="bg-indigo-600 text-white p-4 shadow">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">News Portal</Link>
        <div className="space-x-4">
          <Link to="/blogs">Blogs</Link>
          {adminToken && (
            <>
              <Link to="/admin/dashboard">Admin</Link>
              <button onClick={logoutAdmin} className="bg-red-500 px-2 py-1 rounded">Logout</button>
            </>
          )}
          {userToken && (
            <>
              <Link to="/users/dashboard">Profile</Link>
              <button onClick={logoutUser} className="bg-red-500 px-2 py-1 rounded">Logout</button>
            </>
          )}
          {!adminToken && !userToken && (
            <>
              <Link to="/users/register">Register</Link>
              <Link to="/users/login">Login</Link>
              <Link to="/admin/login">Admin</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}