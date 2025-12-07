import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
// import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { AuthLayout, UploadVideo, ChangePassword, UserProfile, WatchHistory, HomePage, VideoList } from './component/index.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import UpdateAccount from './component/index.js';

// import { ApiProvider } from '@reduxjs/toolkit/query/react'; // optional for redux store provide it give api={} like provider give store={}

const initialState = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path: '/changePassword',
        element: (
          <AuthLayout authentication={false}>
            <ChangePassword />
          </AuthLayout>
        )
      },
      {
        path: '/publishVideo',
        element: (
          <AuthLayout authentication={true}>
            <UploadVideo/>
          </AuthLayout>
        )
      },
      // {
      //   path: '/updateAccount',
      //   element: (
      //     <AuthLayout authentication={true}>
      //       <UpdateAccount />
      //     </AuthLayout> 
      //   )
      // },
      {
        path: '/userProfile',
        element: (
          // <AuthLayout authentication={true}>
            <UserProfile />
          // </AuthLayout>
        )
      },
      {
        path: '/watchHistory',
        element: (
          <WatchHistory />
        )
      },
      {
        path: '/fetchVideos',
        element: (
          <VideoList />
        )
      }
    //   {
    //     path: '/channelDetail',
    //     element: (
    //       <AuthLayout authentication={false}>
    //         <Signup/>
    //       </AuthLayout>
    //     )
    //   },
    //   {
    //     path: '/signup',
    //     element: (
    //       <AuthLayout authentication={false}>
    //         <Signup/>
    //       </AuthLayout>
    //     )
    //   }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" theme="colored" />
      <RouterProvider router={initialState} />
    </Provider>
  </React.StrictMode>,
)