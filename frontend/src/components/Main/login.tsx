import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useDarkMode } from '../../Context/darkmodeContext';
import { validationSchema, loginValidationSchema } from '../../Utils/validation';
import showToast from '../../Utils/showToast';
import axios from 'axios';
import { SERVER_URL } from '../../constants/index';
import { jwtDecode } from "jwt-decode";
import { setUser } from '../../Redux/userSlice';
import { useAppDispatch } from "../../Redux/store";
import { useNavigate } from 'react-router-dom';

type JwtUser = {
  name: string;
  id: string;
  email: string;
};

const Login: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialRegisterValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const initialLoginValues = {
    email: '',
    password: ''
  };

  const handleRegisterSubmit = async (values: typeof initialRegisterValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/register`, values);
      console.log("hii",response)
      if (response.status === 200) {
        showToast('Register Successfully. Login Now', 'success');
        resetForm();
        navigate('/login');
      }
    } catch (error) {
      showToast('Registration failed', 'error');
    }
  };

  const handleLoginSubmit = async (values: typeof initialLoginValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/login`, values);
      const { access_token } = data;
      const { id, name } = jwtDecode(access_token) as JwtUser;
      localStorage.setItem("access_token", access_token);
      dispatch(
        setUser({
          id,
          name,
          isAuthenticated: true,
        })
      );
      showToast(data.message);
      resetForm();
      navigate("/");
    } catch (error:any) {
      showToast(error.message, "error");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-red-200 text-white' : 'bg-white text-gray-900'}` }>
        <div className={`w-[500px] p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-500' : 'bg-gray-100'}`}>
          <Tabs defaultValue="login">
            <TabsList className="flex justify-around mb-6">
              <TabsTrigger value="login" className={`w-full py-2 text-center rounded-lg focus:outline-none ${isDarkMode ? 'bg-white text-gray-700 focus:outline-none' : 'bg-gray-100'}`}>
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className={`w-full py-2 text-center rounded-lg focus:outline-none ${isDarkMode ? 'bg-white text-gray-700 focus:outline-none' : 'bg-gray-100'}`}>
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="py-4">
              <h3 className="text-xl font-semibold mb-4">Login to Your Account</h3>
              <Formik
                initialValues={initialLoginValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleLoginSubmit}
              >
                {({ isValid }) => (
                  <Form>
                    <div className="mb-1">
                      <label htmlFor="login-email" className="block text-lg mb-1">Email</label>
                      <Field
                        type="email"
                        id="login-email"
                        name="email"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-red-200 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="login-password" className="block text-lg mb-1">Password</label>
                      <Field
                        type="password"
                        id="login-password"
                        name="password"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-red-200 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-3 mt-5 bg-gray-600 text-white rounded-md text-lg font-semibold hover:bg-gray-600 transition duration-300 focus:outline-none ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!isValid}
                    >
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
            <TabsContent value="register" className="py-4">
              <h3 className="text-xl font-semibold mb-4">Register Your Account</h3>
              <Formik
                initialValues={initialRegisterValues}
                validationSchema={validationSchema}
                onSubmit={handleRegisterSubmit}
              >
                {({ isValid }) => (
                  <Form>
                    <div className="mb-1">
                      <label htmlFor="username" className="block text-lg mb-1">Username</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-red-200 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="email" className="block text-lg mb-1">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-red-200 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="password" className="block text-lg mb-1">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-red-200 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="confirm-password" className="block text-lg mb-2">Confirm Password</label>
                      <Field
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        className={`w-full p-2 rounded-md border ${isDarkMode ? 'bg-red-200 text-white border-gray-600' : 'bg-gray-200 text-gray-900 border-gray-300'} focus:outline-none`}
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-3 bg-gray-600 text-white rounded-md text-lg font-semibold hover:bg-gray-600 transition duration-300 focus:outline-none ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default Login;
