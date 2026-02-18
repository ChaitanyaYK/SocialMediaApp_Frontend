import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
// import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { AuthLayout, UploadVideo, ChangePassword, UserProfile, UserChannel, WatchHistory, HomePage, VideoList, CommentForm, CommentList, Watch, SideBar, PlaylistGrid, UpdatePlaylist, VideoDashboard, ContextMenu } from './component/index.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LikedVideos from './pages/LikedVideos.jsx';
import PlaylistPage from './component/PlayList/PlaylistPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import { ContextMenuProvider } from './context/ContextMenuContext.jsx';

// import { ApiProvider } from '@reduxjs/toolkit/query/react'; // optional for redux store provide it give api={} like provider give store={}

const initialState = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path: "/changePassword",
        element: (
          <AuthLayout authentication={false}>
            <ChangePassword />
          </AuthLayout>
        )
      },
      {
        path: "/publishVideo",
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
        path: "/userProfile",
        element: (
          // <AuthLayout authentication={true}>
            <UserProfile />
          // </AuthLayout>
        )
      },
      {
        path: "/watchHistory",
        element: (
          <WatchHistory />
        )
      },
      {
        path: "/fetchVideos",
        element: (
          <VideoList />
        )
      },
      {
        path: "/comment",
        element: (
            <CommentForm/>
        )
      },
      {
        path: "/commentList",
        element: (
            <CommentList/>
        )
      },
      {
        path: "/watch/:videoId",
        element: (
          <Watch />
        )
      },
      {
        path: "/likevideos",
        element: (
          <LikedVideos />
        )
      },
      {
        path: "/channel",
        element: (
          <UserChannel />
        )
      },
      {
        path: "/channel/:username",
        element: (
          <UserChannel />
        )
      },
      {
        path: "/playlist",
        element: (
          <PlaylistGrid />
        )
      },
      {
        path: "/playlist/:playlistId",
        element: (
          <PlaylistPage />
        )
      },
      {
        path: "/playlist/:playlistId/edit",
        element: (
            <UpdatePlaylist />
        )
      },
      {
        path: "/dashboard",
        element: (
          <VideoDashboard />
        )
      },
      {
        path: "/search",
        element: (
          <SearchPage />
        )
      },
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
      <ContextMenuProvider>
        <RouterProvider router={initialState} />
      </ContextMenuProvider>
    </Provider>
  </React.StrictMode>,
)