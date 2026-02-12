import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button.jsx";
import { getWatchHistory, getCurrentUser } from "../../store/slices/authSlice.js";
import timeAgo from "../../utils/timeAgo.js"

// {history.map((entry) => (
//   <div key={entry.video._id}>
//     <h3>{entry.video.title}</h3>
//     <p>Watched on {new Date(entry.watchedAt).toLocaleDateString()}</p>
//   </div>
// ))}


const WatchHistory = () => {

  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getWatchHistory());
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-400">
        Loading your history...
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-400">
        <p className="text-xl font-semibold">No Watch History Found</p>
        <Link to="/">
          <Button className="mt-6">Go Watch Videos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <h2 className="text-2xl font-bold mb-6">Watch History</h2>
      <div className="space-y-6">
  
        {history.map((video) => (
          <div
            key={video._id}
            className="flex gap-4 items-start border-b border-gray-700 pb-4"
          >
            {/* Thumbnail */}
            <Link to={`/watch/${video._id}`}>
              {/* <img
                src={video.thumbnail}
                alt={video.title}
                className="w-0 h-24 rounded-lg object-cover hover:opacity-80 transition"
              /> */}
              <video onClick={() => navigate(`/watch/${video._id}`)} className="rounded-2xl" width="340" height="180" controls poster={`${video.thumbnail}`} >
                <track kind="subtitles" src="/english.vtt" srcLang="en" label="English" default/>
                <track kind="subtitles" src="/hindi.vtt" srcLang="hi" label="हिंदी" /> *
              </video>
            </Link>

            {/* Video details */}
            <div className="flex flex-col flex-1">
              
              <div>
              <Link to={`/watch/${video._id}`}>
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-500 transition">
                  {video.title}
                </h3>
              </Link>
              <Link to={`/channel/${video.channelName}`} className="flex">
              {console.dir(video)}
              
                <img src={video.channelAvatar} className="w-6 h-6 rounded-2xl mr-2"></img> {video.channelName}
              </Link>
              <Link
                to={`/channel/${video.channelName}`}
                className="text-sm text-gray-400 hover:text-white"
              >
                
              </Link>
              <span className="text-sm text-gray-300">{video.views} views</span>
              {/* <span className="text-xs text-gray-500 mt-1">
                Watched on {new Date(video.watchedAt).toLocaleDateString()}
              </span> */}
              <p className="text-sm text-gray-300">{timeAgo(video.watchedAt)}</p>
              <p className="text-justify">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default WatchHistory;


