import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../store/slices/videoSlice";
import CommentList from "../commentComponent/CommentList";
import { Link } from "react-router-dom";


const VideoList = () => {
  const dispatch = useDispatch();
  const { videos, loading, error, pagination} = useSelector((state) => state.video);

  const [currVideoId, setCurrVideoId] = useState(null);

  // const poster = videos.videoFile.replace('/upload/', '/upload/so_1/').replace('.mp4', '.jpg');

  useEffect(() => {
    dispatch(fetchVideos({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-3 grid-rows-3 align-middle justify-items-center m-2">
      
      {/* <div className="text-white flex flex-row flex-wrap align-top justify-self-stretch justify-items-start items-start basis-1/3"> */}
        {videos.map((video) => (
          <Link to={`/watch`} key={video._id}>
          <div className="border-amber-50 gap-2 mb-5 hover:border-1 hover:bg-neutral-800 rounded-2xl">
          <div className="m-3 text-white rounded-2xl ">
             
            <video onClick={() => setCurrVideoId((prev) => prev === video._id ? null : video._id )} className="rounded-2xl" width="340" height="180" controls src={`${video.videoFile}`} poster={`${video.videoFile.replace('/upload/', '/upload/so_2/').replace('.mp4', '.jpg')}`}>
              <track kind="subtitles" src="/english.vtt" srcLang="en" label="English" default/>
              <track kind="subtitles" src="/hindi.vtt" srcLang="hi" label="हिंदी" /> *
            </video>
            <div className="flex gap-2">
              <img src={video.ownerDetails.avatar} className="h-10 w-10 rounded-full cursor-pointer border-2"/>
              <h2 className="text-lg font-semibold">{video.title}</h2>
            </div>
              <p className="text-sm text-gray-500">{video.description}</p>
              <p className="text-sm mt-1">Duration: <strong>{video.duration}</strong></p>
              { console.log(video)}
          </div>
            {currVideoId === video._id && (
              <CommentList key={video.comment?._id} videoId={currVideoId} />
            ) }
          </div>
          </ Link>

        ))}
      {/* </div> */}
    </div>
  );
};

export default VideoList;
