// import React, {useState,} from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser, logoutUser } from './store/authSlice.js';
// import Signup from './component/Signup.jsx';  
// import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import {Header, Footer} from "./component/index.js";
import { Outlet } from "react-router-dom";
import UploadVideo from "./component/videoComponent/UploadVideo.jsx";


function App() {

  return (
    <div className='flex flex-col align-middle content-center m-vw'>
      <div className="w-full block">
        <Header />
        <main>
          Todo: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
