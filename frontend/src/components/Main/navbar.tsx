import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useDarkMode } from '../../Context/darkmodeContext';
import { clearUser } from '../../Redux/userSlice';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state:any) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const handlePassword = () => {
    navigate('/passwords');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className={`bg-white dark:bg-gray-600  py-4 px-6 lg:px-8 pb-0 `}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center text-2xl font-bold text-red-300 dark:text-gray-100 mt-5 mb-4">
          Password Generator
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-900 dark:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleDarkMode}>
              {isDarkMode ? (
                <DropdownMenuItem className = {` ${isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-900'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 14v1m-7.9-5H5m14.9 0h1.1M4.1 7.5l.7.7m11.8-1.4l.7.7M4.1 16.5l.7-.7m11.8-1.4l.7-.7" />
                  </svg>
                  Light Mode
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className = {` ${isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-900'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 14v1m-7.9-5H5m14.9 0h1.1M4.1 7.5l.7.7m11.8-1.4l.7.7M4.1 16.5l.7-.7m11.8-1.4l.7-.7" />
                  </svg>
                  Dark Mode
                </DropdownMenuItem>
              )}
            </DropdownMenuItem>
            {isAuthenticated && (
              <DropdownMenuItem onClick={handlePassword } className = {` ${isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 7h1M17 7h1M14 11h1M17 11h1M14 15h1M17 15h1M14 19h1M17 19h1" />
                </svg>
                Saved Passwords
              </DropdownMenuItem>
            )}
            {isAuthenticated ? (
              <DropdownMenuItem onClick={handleLogout} className = {` ${isDarkMode ? 'bg-gray-300 text-white' : 'bg-white text-gray-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
                </svg>
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleLogin} className = {` ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
