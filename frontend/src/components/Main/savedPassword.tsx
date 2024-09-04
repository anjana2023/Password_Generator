import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constants/index'; // Adjust the path as necessary
import { useDarkMode } from '../../Context/darkmodeContext';
import { FaClipboard, FaEdit, FaTrash } from 'react-icons/fa';
import showToast from '../../Utils/showToast';
import { useAppSelector } from '../../Redux/store'; // Ensure you import the selector

// Define a TypeScript interface for the saved passwords
interface Password {
  _id: string;
  id: string;
  name: string;
  password: string;
}

const SavedPasswords: React.FC = () => {
  const { isDarkMode } = useDarkMode();  // Get the context with type safety
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [selectedPassword, setSelectedPassword] = useState<Password | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [passwordName, setPasswordName] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  // Get the user ID from the Redux store
  const userId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    // Fetch saved passwords from the backend
    const fetchPasswords = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/get-passwords`, {
          params: { userId }  // Pass the user ID as a query parameter
        }); 
        setPasswords(response.data.passwords);
      } catch (error) {
        console.error('Failed to fetch passwords', error);
        showToast('Failed to fetch passwords', 'error');
      }
    };

    fetchPasswords();
  }, [userId]);

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    showToast('Password copied to clipboard!', 'success');
  };

  const handleDeletePassword = async (id: string) => {
    try {
      await axios.delete(`${SERVER_URL}/delete-password/${id}`, {
        data: { userId }  
      });
      setPasswords(passwords.filter((pwd) => pwd._id !== id));
      showToast('Password deleted successfully!', 'success');
    } catch (error) {
      console.error('Failed to delete the password', error);
      showToast('Failed to delete the password', 'error');
    }
  };

  const handleEditPassword = async () => {
    if (!passwordName || !newPassword) {
      showToast('Please enter both a name and a password', 'error');
      return;
    }

    try {
      await axios.put(`${SERVER_URL}/edit-password`, {
        id: selectedPassword?.id,
        name: passwordName,
        password: newPassword,
        userId  
      });

      // Fetch updated passwords after successful edit
    const response = await axios.get(`${SERVER_URL}/get-passwords`, {
      params: { userId }
    });
    setPasswords(response.data.passwords);

      // setPasswords(
      //   passwords.map((pwd) =>
      //     pwd.id === selectedPassword?.id ? { ...pwd, name: passwordName, password: newPassword } : pwd
      //   )
      // );
      setShowModal(false);
      setPasswordName('');
      setNewPassword('');
      showToast('Password updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update the password', error);
      showToast('Failed to update the password', 'error');
    }
  };

  return (
    <>
      <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-2xl font-bold mb-6">Saved Passwords</h2>
          <table className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-300 rounded-lg shadow-lg`}>
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-4 text-left text-lg font-semibold">Name</th>
                <th className="p-4 text-left text-lg font-semibold">Password</th>
                <th className="p-4 text-left text-lg font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((pwd) => (
                <tr key={pwd.id} className="border-b border-gray-300 hover:bg-gray-500">
                  <td className="p-4">{pwd.name}</td>
                  <td className="p-4">{pwd.password}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleCopyPassword(pwd.password)}
                      className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition duration-300"
                      aria-label="Copy Password"
                    >
                      <FaClipboard />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPassword(pwd);
                        setPasswordName(pwd.name);
                        setNewPassword(pwd.password);
                        setShowModal(true);
                      }}
                      className="p-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-500 transition duration-300"
                      aria-label="Edit Password"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeletePassword(pwd._id)}
                      className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-500 transition duration-300"
                      aria-label="Delete Password"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Password Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className={`bg-grey-700 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
            <h3 className="text-xl font-semibold mb-4">Edit Password</h3>
            <div className="mb-4">
              <label htmlFor="passwordName" className="block text-lg mb-1">Password Name</label>
              <input
                type="text"
                id="passwordName"
                value={passwordName}
                onChange={(e) => setPasswordName(e.target.value)}
                className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} shadow-md`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-lg mb-1">Password</label>
              <input
                type="text"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} shadow-md`}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-500 rounded-md text-white hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditPassword}
                className="p-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition duration-300"
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedPasswords;
