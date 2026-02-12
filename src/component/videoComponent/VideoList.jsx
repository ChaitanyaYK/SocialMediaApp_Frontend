import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../store/slices/videoSlice";
import CommentList from "../commentComponent/CommentList";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {LikedButton} from "../index.js";
import {toggleVideoLiked} from "../../store/slices/likeSlice.js"
import timeAgo from "../../utils/timeAgo.js";


const VideoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {videos, loading, error, pagination} = useSelector((state) => state.video);
  const {likeByVideoId} = useSelector((state) => state.likes);
  const [currVideoId, setCurrVideoId] = useState(null);
  const {open, setOpen} = useOutletContext();

  // const poster = videos.videoFile.replace('/upload/', '/upload/so_1/').replace('.mp4', '.jpg');

  useEffect(() => {
    dispatch(fetchVideos({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000)

    return clearInterval(interval);
  }, [])

  const handleVideoLike = (e) => {
    e.stopPropagation();
    dispatch(toggleVideoLiked(currVideoId));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`w-full grid grid-cols-3 auto-cols-max align-middle justify-items-center m-2`}>
      
        {videos.map((video) => (
          <div key={video._id} onClick={() => setCurrVideoId((prev) => prev === video._id ? null : video._id )} className="">
          <div className="border-2 border-neutral-600 p-2 gap-2 mb-5 shadow-2xl hover:border-1 hover:bg-neutral-800 rounded-2xl">
          <div className="text-white rounded-2xl">
           
            <img onClick={() => navigate(`/watch/${video._id}`)} className="rounded-2xl h-45 rounded-2xl" width="340" height="180" src={`${video.thumbnail.url}`} >
              
            </img>
            <div className="flex gap-1 p-1">
              <div>
              <img onClick={() => navigate(`/channel/${video.ownerDetails.username}`)} src={video.ownerDetails.avatar} className="h-10 w-10 rounded-full cursor-pointer border-2"/>
              </div>
              <div className="">
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p>{`@${video.ownerDetails.username}`}</p>
              </div>
              <LikedButton isLiked={likeByVideoId[video._id]} onClick={handleVideoLike} />
            </div>
              <p className="text-sm mt-1"><strong>{timeAgo(video.createdAt)}</strong></p>
              <p className="text-md text-gray-400">{video.description}</p>
          </div>
          </div>
          </ div>

        ))}

    </div>
  );
};

export default VideoList;
