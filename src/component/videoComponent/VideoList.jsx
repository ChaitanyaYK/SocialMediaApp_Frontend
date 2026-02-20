import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../store/slices/videoSlice";
import CommentList from "../commentComponent/CommentList";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {ContextMenu, LikedButton} from "../index.js";
import {toggleVideoLiked} from "../../store/slices/likeSlice.js"
import timeAgo from "../../utils/timeAgo.js";
import { EllipsisVertical } from "lucide-react";
import { useContextMenu } from "../../context/ContextMenuContext.jsx";


const VideoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {videos, loading, error, pagination} = useSelector((state) => state.video);
  const {likeByVideoId} = useSelector((state) => state.likes);

  const [currVideoId, setCurrVideoId] = useState(null);
  const {open, setOpen} = useOutletContext();
  const { openMenu } = useContextMenu();

  // const poster = videos.videoFile.replace('/upload/', '/upload/so_1/').replace('.mp4', '.jpg');

  useEffect(() => {
    dispatch(fetchVideos({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000)

    return () => clearInterval(interval);
  }, [])

  const handleVideoLike = (e) => {
    e.stopPropagation();
    dispatch(toggleVideoLiked(currVideoId));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`w-full grid grid-4 px-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center`}>

        {videos.map((video) => (
          <div key={video._id} onClick={() => setCurrVideoId((prev) => prev === video._id ? null : video._id )} className="">
            <div className="border-2 border-neutral-600 p-2 gap-2 mb-5 shadow-2xl hover:border-1 hover:bg-neutral-800 rounded-2xl transition">
              {/* <div className="text-white rounded-2xl"> */}
              <div className="w-full max-w-[360px] min-w-[250px] border-neutral-600 p-2 mb-4 shadow-xl hover:bg-neutral-800 rounded-2xl transition">
                <img onClick={() => navigate(`/watch/${video._id}`)} className="rounded-2xl aspect-video h-45 rounded-2xl cursor-pointer" width="340" height="180" src={`${video.thumbnail.url}`} >
                  
                </img>
                <div className="flex justify-between mt-1 overflow-hidden">
                  <div className="flex">
                    <span className="mr-2">
                      <img onClick={() => navigate(`/channel/${video.ownerDetails.username}`)} src={video.ownerDetails.avatar} className="h-10 w-10 rounded-full cursor-pointer border-2"/>
                    </span>
                    <div className="mr-2">
                        <h2 className="text-lg font-semibold">{video.title}</h2>
                        <p>{`@${video.ownerDetails.username}`}</p>
                    </div>
                  </div>
                  <span className="">
                    <EllipsisVertical onClick={(e) => {
                        e.stopPropagation();

                        openMenu({
                          type: "video",
                          data: video,
                          position: {
                            x: e.clientX,
                            y: e.clientY,
                          }
                        })
                      }} className="rounded-lg w-7 h-7 hover:rounded-3xl hover:bg-neutral-600"
                    />
                  </span>
                </div>
                <span className="flex text-sm mt-1">
                  <p className="mr-2">{timeAgo(video.createdAt)}</p>
                  <p className="">{video.views} views</p>
                </span>
                  <p className="text-md text-gray-400">{video.description}</p>
              </div>
            </div>
          </ div>

        ))}

    </div>
  );
};

export default VideoList;
