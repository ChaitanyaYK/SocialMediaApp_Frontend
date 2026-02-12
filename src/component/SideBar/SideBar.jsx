import React, {useState, useEffect} from "react";
import {Home, LogOut, Menu, Settings, User, LogIn, TvMinimalPlayIcon, CreativeCommons, LucideArrowUpLeftFromSquare, ListCheck} from "lucide-react";
import Button from "../Button";
import { Link } from "react-router-dom";
import {VideoList, WatchHistory} from "../index.js";
import LikedVideos from "../../pages/LikedVideos.jsx";

const SideBar = ({open, setOpen}) => {

    // // Collapse sidebar when it is small screens
    useEffect(() => {
        const handleOnClick = () => {
          if (window.innerWidth < 768) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }

        handleOnClick();
        window.addEventListener("resize", handleOnClick);
        return (() => {
          window.removeEventListener("resize", handleOnClick);
        })
    }, [])

   const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Profile", icon: User, path: "/userProfile" },
    { name: "WatchHistory", icon: TvMinimalPlayIcon, path: "/watchHistory"},
    { name: "LikedVideos", icon: CreativeCommons, path: "/likevideos"},
    { name: "UploadVideo", icon: LucideArrowUpLeftFromSquare, path: "/publishVideo"},
    { name: "Channel", icon: LucideArrowUpLeftFromSquare, path: "/channel"},
    { name: "PlaylistGrid", icon: ListCheck, path: "/playlist"}
  ];

  return (
    // <aside className={``}>
      
    <div className={`grid grid-rows-2  ${open ? "w-66": "w-19"} transition-transform ease-in-out to-0% to-50% 1s relative bg-gray-200 absolute`}>
        {/* <div className={`bg-black shadow-md transition-all duration-300 flex flex-col`}> */}
        <div>
          <div onClick={() => setOpen(!open)} className="bg-black rounded-xl h-10 w-10 m-2 p-2.5 justify-center align-middle">
           < Menu className="w-5 h-5"/>
          </ div>
          
          <nav className="flex flex-col mt-6 space-y-2 px-2">
        {navItems.map(({ name, icon: Icon, path }) => (
          <Link
            to={path}
            key={name}
            className={`flex items-center gap-3 px-4 py-2 rounded-sm text-gray-700 hover:bg-gray-800 border-4 border-b-gray-600 border-l-gray-800 hover:text-white transition ${({isActive}) => { isActive ? "bg-sky-600" : ""}}`}
          >
            <Icon className="w-5 h-5" />
            {open && <span>{name}</span>}
          </Link>
        ))}
      </nav>
      </div>
          <div className="mt-auto mb-4">
            <button className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-100 transition rounded-md">
              
              <LogOut className="w-5 h-5" />
              {open && <span>LogOut</span>}
            </button>
          </div>
        {/* </div> */}
    </div>
    // </aside>
  )
}

export default SideBar;
