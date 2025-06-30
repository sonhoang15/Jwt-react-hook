import './App.scss';
import NavHeader from './components/Navigation/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, } from "react-router-dom";
import Approutes from './Routes/AppRoutes';
import { ClimbingBoxLoader } from "react-spinners";
import { UserContext } from "./context/UserContext"


function App() {

  const { user } = useContext(UserContext);
  console.log("user:", user);

  return (
    <>

      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <ClimbingBoxLoader
              color="green"
              loading
              size={20}
              speedMultiplier={1}
            />
            <div className='loading'>loading ...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <Approutes />
            </div>
          </>
        }

      </Router>
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

    </>
  );
}

export default App;
