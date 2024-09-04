import React, { useState } from "react";
import generatePassword from "../../Utils/generatePassword";
import { useDarkMode } from "../../Context/darkmodeContext";
import { FaClipboard, FaRedo } from "react-icons/fa";
import axios from "axios";
import { SERVER_URL } from "../../constants/index"; // Adjust the path as necessary
import { useAppSelector } from "../../Redux/store";
import showToast from "../../Utils/showToast";

const PasswordGenerator: React.FC = () => {
  const { isDarkMode } = useDarkMode(); // Get the context with type safety
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(0);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

  // Modal states
  const [showModal, setShowModal] = useState<boolean>(false);
  const [passwordName, setPasswordName] = useState<string>("");

  const id = useAppSelector((state) => state.user.id);

  const handleGeneratePassword = () => {
    const options = {
      upperCaseLetter: includeUppercase,
      lowerCaseLetter: includeLowercase,
      numbers: includeNumbers,
      symbols: includeSymbols,
      length: length,
    };
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleSavePassword = async () => {
    if (!passwordName) {
      showToast("Please enter a name for the password", "error");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/save-password`, {
        id,
        passwordName,
        password,
      });
      if (response.status === 200) {
        showToast("Password saved successfully!", "success");
        setPassword("");
        setPasswordName("");
        setShowModal(false); // Close the modal after successful save
      }
    } catch (error) {
      console.error("Failed to save the password", error);
      showToast("You are not authenticated", "error");
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-red-300 text-white" : "bg-white text-gray-900"
        }`}
      >
        
        <div
          className={`max-w-md w-full mb-40 p-8 rounded-xl shadow-lg mt-10 ${
            isDarkMode ? "bg-gray-500" : "bg-gray-100"
          }`}
        >
          <div className="flex justify-between items-center border-shadow mb-6">
            <h2 className="text-2xl font-bold">Generate a Secure Password</h2>
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              value={password}
              readOnly
              className={`w-full p-4 pl-12 pr-16 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-200 text-gray-900 border-gray-300"
              } shadow-md`}
            />
            <button
              onClick={handleCopyPassword}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-2xl text-white hover:bg-yellow-400 transition duration-300 focus:outline-none"
              aria-label="Copy Password"
            >
              <FaClipboard className="w-5 h-5" />
            </button>
            <button
              onClick={handleGeneratePassword}
              className="mr-1 absolute top-1/2 right-12 transform -translate-y-1/2 p-2 bg-gray-600 rounded-2xl text-white hover:bg-gray-700 transition duration-300 focus:outline-none"
              aria-label="Generate Password"
            >
              <FaRedo className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">
              Customize Your Password
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className={`w-5 h-5 rounded-md border-2 ${
                    isDarkMode ? "dark:bg-gray-600 dark:border-gray-500" : ""
                  } focus:outline-none focus:ring-2`}
                />
                <label htmlFor="uppercase" className="ml-3 text-lg">
                  Uppercase
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className={`w-5 h-5 rounded-md border-2 ${
                    isDarkMode ? "dark:bg-gray-600 dark:border-gray-500" : ""
                  } focus:outline-none focus:ring-2`}
                />
                <label htmlFor="lowercase" className="ml-3 text-lg">
                  Lowercase
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="numeric"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className={`w-5 h-5 rounded-md border-2 ${
                    isDarkMode ? "dark:bg-gray-600 dark:border-gray-500" : ""
                  } focus:outline-none focus:ring-2`}
                />
                <label htmlFor="numeric" className="ml-3 text-lg">
                  Numeric
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className={`w-5 h-5 rounded-md border-2 ${
                    isDarkMode ? "dark:bg-gray-600 dark:border-gray-500" : ""
                  } focus:outline-none focus:ring-2`}
                />
                <label htmlFor="symbols" className="ml-3 text-lg">
                  Symbols
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-lg font-semibold">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className={`w-full h-2 rounded-lg cursor-pointer ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                } accent-blue-600`}
                style={{
                  background: `linear-gradient(to right, ${
                    isDarkMode ? "#4CAF50" : "#4CAF50"
                  } ${((length - 1) / 49) * 100}%, ${
                    isDarkMode ? "#555" : "#ccc"
                  } ${((length - 1) / 49) * 100}%)`,
                }}
              />
              <div className="flex items-center justify-between mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <span>1</span>
                <span>50</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleGeneratePassword}
            className="w-full p-3 bg-gray-700 rounded-lg text-white text-lg font-semibold hover:bg-gray-700 transition duration-300"
          >
            Generate New Password
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-full p-3 mt-4 bg-gray-700 rounded-lg text-white text-lg font-semibold hover:bg-gray-700 transition duration-300"
          >
            Save Password
          </button>
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Save Password</h3>
            <div className="mb-4">
              <label htmlFor="passwordName" className="block text-lg mb-1">
                Password Name
              </label>
              <input
                type="text"
                id="passwordName"
                value={passwordName}
                onChange={(e) => setPasswordName(e.target.value)}
                className={`w-full p-2 rounded-md border ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } shadow-md`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg mb-1">
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                readOnly
                className={`w-full p-2 rounded-md border ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } shadow-md`}
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
                onClick={handleSavePassword}
                className="p-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordGenerator;
