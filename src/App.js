import './App.scss';

import Nav from './components/Navigation/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import _ from 'lodash';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import { useEffect } from 'react';
import Approutes from './Routes/AppRoutes';

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>
        <div className=' app-container'>
          <Approutes />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  );
}

export default App;
