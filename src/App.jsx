import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, SideBar } from "./component";
// import { cn } from "./utils"; // utility for conditional classNames

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-dvw bg-neutral-800 dark:bg-neutral-900 transition-colors">
        <Header />

      <div className="flex flex-2 overflow-hidden w-screen">
        <SideBar open={open} setOpen={setOpen} />

        <main 
          className={`flex-1 max-w-310 overflow-y-auto transition-all duration-300`}
        >
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
