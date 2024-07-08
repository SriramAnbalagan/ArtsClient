import React from 'react';
import AppRoutes from './utils/routes';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import './styles/global.scss'

const App: React.FC = () => {
  return (
      <>
        <AppRoutes />
        <ToastContainer
          position={'top-center'}
          theme="colored"
          autoClose={1000}
        />
      </>
  );
};

export default App;
