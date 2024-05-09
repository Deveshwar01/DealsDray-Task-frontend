import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Store/loginAuth'; // Import logoutUser action creator
import { selectMessage } from '../Store/loginAuth'; // Import selectMessage selector
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Logo component
function Logo() {
  return (
    <Link to={'/'}>
      <span className="text-white ml-2 text-2xl font-medium">Logo</span>
    </Link>
  );
}

// LogoutButton component
function LogoutButton({ onClick }) {
  return (
    <button onClick={onClick} className="text-white text-2xl font-medium">
      Logout
    </button>
  );
}

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.userLogin.data !== null); // Check if user data exist
  const message = useSelector(selectMessage); // Retrieve message from Redux state

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logoutUser action
    navigate('/'); // Redirect to the home page after logout
    toast.success('Admin Logged out  successfully!');
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Render logout button if logged in */}
      {isLoggedIn && (
        <>
          {message && (
            <div className="text-white text-2xl font-medium">{message}</div>
          )}
          <LogoutButton onClick={handleLogout} />
          {/* Display the message */}
        </>
      )}
    </nav>
  );
}

export default Header;
