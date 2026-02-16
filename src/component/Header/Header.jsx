import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Logo, Input } from "../index.js";
// import { BsSearch } from "react-icons/bs";
// import { TbSearch } from "react-icons/tb";
// import { FaPlus } from "react-icons/fa6";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { PiMicrophoneBold } from "react-icons/pi";
import {Upload, SearchIcon} from "lucide-react"
import {UpdateAccount, UploadVideo, VideoDashboard, VideoList, CommentList, CommentForm} from "../index.js"
import LogoutBtn from "./LogoutBtn.jsx"
import axios from "axios";
import { fetchVideos } from "../../store/slices/videoSlice.js";


const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {videos} = useSelector((state) => state.video);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const controllerRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState([]);

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
    ]

    useEffect(() => {
      if (!search.trim()) {
        setSearchItem([]);
        return;
      }

      const delay = setTimeout(async() => {
        // Abort previous request
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        // Create new controller
        const controller = new AbortController();
        controllerRef.current = controller; // here we pass current value to controllerRef

        try {
          const result = await dispatch(fetchVideos({query: search, signal: controller.signal})).unwrap();

          setSearchItem(videos);
          setSuggestions(result.videos);
          
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("request is cancel: ", error);
            return;
          }
        }
      }, 400)

      return () => clearTimeout(delay);
    }, [search, dispatch])

    useEffect(() => {
      return () => controllerRef.current?.abort();
    }, [])

    const handleSearchClick = () => {
      if(!search.trim()) return;
      
      navigate(`/search?q=${encodeURIComponent(search)}`)
      setSearch("");
      setSuggestions([]);
    }

    return (
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      {console.log(videos)
      }
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="hidden md:flex items-center space-x-4 flex justify-between items-center">
            <Link to="/">
              <Logo width="60px" />
            </Link>
            <div className="flex">
              <span className="mr-3 flex">
                <Input 
                  type="search" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  onKeyDown={(e) => {
                    if(e.key === "Enter" && searchItem[0]) {
                     handleSearchClick();
                    }
                  }} 
                  placeholder={"Search..."} className="rounded-l-full"
                />
                <div className="rounded-l-full">
                  <button 
                    onClick={handleSearchClick} 
                    className="bg-gray-600 rounded-r-2xl justify-center px-1.5 w-10 h-10"
                  >
                    <SearchIcon size={29} className=""/>
                  </button>
                </div>
              </span>

              {/* <PiMicrophoneBold className="p-1.5 w-14 h-10 rounded-4xl bg-neutral-800 hover:bg-neutral-700" color="white" />
                      </div>

            <div className="flex">
              <Button onClick={() => {
                setClick(!click);
              }} className="" bgColor="bg-neutral-800 hover:bg-neutral-700 h-10"><FaPlus className="mr-1.5 size-7"/>Create</Button>
              
              <Button bgColor="bg-gray-900"><IoNotificationsOutline className="rounded-l-4xl h-10 w-10 hover:bg-gray-800 p-2"  color="white"/></Button> */}
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
                      <li >
                          <LogoutBtn className={`w-full`} />
                      </li>
                  )}
                  </ul>
              </div>
            </div>
          </nav>
        </div>
          {suggestions.length > 0 && (
            <div className="absolute bg-gray-800 w-full rounded shadow-lg">
              {suggestions.map((video) => (
                <div key={video._id} 
                  onClick={() => {
                    navigate(`/watch/${video._id}`);
                    setSearch("");
                    setSearchItem([]);
                    setSuggestions([]);
                  }} 
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                >
                  {video.title}
                </div>
              ))}
            </div>
          )}
      </header>
    );
};

export default Header;