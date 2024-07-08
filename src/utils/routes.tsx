import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import Arts from '../pages/arts';
import Employees from '../pages/Employees'
import Navbar from '../components/navBar';
import NotFound from '../pages/NotFound';
import Footer from '../components/footer';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/employees" element={<Employees />} />
        {["/", "/dashboard"].map((path, index) => {
          return (
            <Route
              path={path}
              element={
                <Dashboard />
              }
              key={index}
            />
          );
        })}
        <Route
          path="/arts"
          element={
            <Arts />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default AppRoutes