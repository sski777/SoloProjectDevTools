import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  if (isLoading) return null;

  return (
    <nav className="bg-gray-300 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        DevTools App
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-gray-800 hover:underline font-medium">
          About Us
        </Link>

        {isAuthenticated && (
          <Link to="/activity" className="text-gray-800 hover:underline font-medium">
            Activity
          </Link>
        )}

        {!isAuthenticated ? (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Log In
          </button>
        ) : (
          <>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-800 hover:underline"
            >
              <img
                src={user.picture}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </Link>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
