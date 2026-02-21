import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, SideBar, ContextMenu } from "./component";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/slices/authSlice";
import { healthResponse } from "./store/slices/healthcheckSlice";
import api from "./utils/axios";

function App() {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const {data} = useSelector((state) => state.health)
      useEffect(() => {
        dispatch(getCurrentUser());
      }, [dispatch])

      useEffect(() => {
        api.get("/healthcheck");
      }, [])

  return (
    <div className="flex flex-col bg-neutral-800 dark:bg-neutral-900 transition-colors">
      <Header />
      <div className="flex flex-2 w-screen">
        <SideBar open={open} setOpen={setOpen} className="z-40"/>
        {console.log(data)
        }
        <div 
          className={`flex-1 max-w-310 overflow-y-auto transition-all duration-300`}
        >
          <Outlet context={{open, setOpen}} />
          <ContextMenu />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
