import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button.jsx";
import { getWatchHistory, getCurrentUser } from "../../store/slices/authSlice.js";

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
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 rounded-lg object-cover hover:opacity-80 transition"
              />
            </Link>

            {/* Video details */}
            <div className="flex flex-col flex-1">
              <Link to={`/watch/${video._id}`}>
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-500 transition">
                  {video.title}
                </h3>
              </Link>
              <Link
                to={`/channel/${video.channelId}`}
                className="text-sm text-gray-400 hover:text-white"
              >
                {video.channelName}
              </Link>
              <span className="text-xs text-gray-500 mt-1">
                Watched on {new Date(video.watchedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default WatchHistory;


