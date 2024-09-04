import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../components/Main/register';
import Login from '../Pages/login';
import PasswordList from "../Pages/passwordList";
import Home from '../Pages/Home';
import { ProtectedRoute, PublicRoute } from './privateRoute';
import PageNotFound from '../Pages/pageNotFound';

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/passwords" element={<PasswordList />} />
        </Route>
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </Router>
  );
};

export default MainRouter;
