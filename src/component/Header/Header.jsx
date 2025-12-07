import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Logo, Input } from "../index.js";
import { BsSearch } from "react-icons/bs";
// import { TbSearch } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiMicrophoneBold } from "react-icons/pi";
import {Upload} from "lucide-react"
import {UpdateAccount, UploadVideo, VideoDashboard, VideoList, CommentList, CommentForm} from "../index.js"
import LogoutBtn from "./LogoutBtn.jsx"


const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  const [click, setClick] = useState(false)

  const navItems = [
        // {
        //     name: 'Home',
        //     slug: '/',
        //     active: true
        // },
        {
            name: 'Signup',
            slug: '/signup',
            active: !isAuthenticated
        },
        {
            name: 'Login',
            slug: '/login',
            active: !isAuthenticated
        },
        // {
        //     name: 'ChangePassword',
        //     slug: '/changePassword',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'UserProfile',
        //     slug: '/userProfile',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'UpdateAccount',
        //     slug: '/updateAccount',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'UploadVideo',
        //     slug: '/uploadVideo',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'VideoDashboard',
        //     slug: '/videoDashboard',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'VideoList',
        //     slug: '/videoList',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'CommentForm',
        //     slug: '/commentForm',
        //     active: !isAuthenticated
        // },
        // {
        //     name: 'CommentList',
        //     slug: '/commentList',
        //     active: !isAuthenticated
        // },     
    ]

  // const Buttons = [ { name: "Home", slug: "/" },  { name: "Signup", slug: "/signup" },  { name: "Login", slug: "/login" },];

    return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="hidden md:flex items-center space-x-4 flex justify-between items-center">
          <Link to="/">
            <Logo width="60px" />
                        </Link>
          <div className="flex ">
            <Input type="search" placeholder={"Search..."} className="rounded-l-full"/>
            <Button className="rounded-l-full" rounded="rounded-r-full mr-3">
              <BsSearch className="text-white size-5" />
            </Button>

            <PiMicrophoneBold className="p-1.5 w-14 h-10 rounded-4xl bg-neutral-800 hover:bg-neutral-700" color="white" />
                    </div>

          <div className="flex">
            <Button onClick={() => {
              setClick(!click);
              
              console.log("button clicked", click);
            }} className="" bgColor="bg-neutral-800 hover:bg-neutral-700 h-10"><FaPlus className="mr-1.5 size-7"/>Create</Button>
            
            <Button bgColor="bg-gray-900"><IoNotificationsOutline className="rounded-l-4xl h-10 w-10 hover:bg-gray-800 p-2"  color="white"/></Button>
            <div>
              <ul className="flex ml-auto">
                {navItems.map((item) => 
                  item.active ? (
                    <li key={item.name} className="mx-3">
                        <Button
                            onClick={() => navigate(item.slug)}
                            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                        >
                            {item.name}
                        </Button>
                    </li>
                ) : null
                )}

                { isAuthenticated && (
                    <li>
                        <LogoutBtn/>
                    </li>
                )}
                </ul>
            </div>
          </div>
                </nav>
      </div>
        </header>
    );
};

export default Header;