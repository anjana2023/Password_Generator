import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useDarkMode } from '../../Context/darkmodeContext';
import Navbar from './navbar';
import { validationSchema } from '../../Utils/validation'; // Adjust the path as necessary
import showToast from '../../Utils/showToast';
import axios from 'axios';
import { SERVER_URL } from '../../constants/index';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const response = await axios.post(`${SERVER_URL}/register`, values);
      if(response.status === 200){
          resetForm();
          showToast('Register Successfully Login Now', 'success');
          navigate('/login'); 
      }
    } catch (error:any) {
      showToast(error, 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className={`w-[500px] p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Tabs defaultValue="register">
            <TabsList className="flex justify-around mb-6">
              <TabsTrigger value="login" className="w-full py-2 text-center rounded-lg focus:outline-none">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="w-full py-2 text-center rounded-lg focus:outline-none">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="py-4">
              <h3 className="text-xl font-semibold mb-4">Login to Your Account</h3>
              <form>
                <div className="mb-1">
                  <label htmlFor="login-email" className="block text-lg mb-1">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="login-password" className="block text-lg mb-1">Password</label>
                  <input
                    type="password"
                    id="login-password"
                    className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 mt-5 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 transition duration-300 focus:outline-none"
                >
                  Login
                </button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="py-4">
              <h3 className="text-xl font-semibold mb-4">Register Your Account</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid }) => (
                  <Form>
                    <div className="mb-1">
                      <label htmlFor="username" className="block text-lg mb-1">Username</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="email" className="block text-lg mb-1">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="password" className="block text-lg mb-1">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="confirm-password" className="block text-lg mb-2">Confirm Password</label>
                      <Field
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 transition duration-300 focus:outline-none ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!isValid}
                    >
                      Register
                    </button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Register;
