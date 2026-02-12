import React, {useState, useEffect} from 'react';
import { fetchVideos } from "../../store/slices/videoSlice.js";
import { useDispatch, useSelector } from 'react-redux';

import timeAgo from '../../utils/timeAgo.js';
import { useNavigate } from 'react-router-dom';

const VideoFeed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {videos} = useSelector((state) => state.video);
    const [videoId, setVideoId] = useState(null);

  return (
    <div>
      <div className='' onClick={() => dispatch(fetchVideos())}>
      {videos.map((video) => (
        <div onClick={() => navigate(`/watch/${video._id}`)} key={video._id}>
          <div className='flex hover:bg-neutral-700 hover:backdrop-opacity-65 rounded-2xl p-2'>
            <div className='h-50 w-80 mt-4'>
              <video className="rounded-2xl" width="340" height="180" controls poster={`${video.thumbnail.url}`} >
                <track kind="subtitles" src="/english.vtt" srcLang="en" label="English" default/>
                <track kind="subtitles" src="/hindi.vtt" srcLang="hi" label="हिंदी" /> *
              </video>
            </div>
            <div className='mt-4 pl-3'>
              <div className='flex'>
                <img src={video.ownerDetails.avatar} className='h-10 w-10 rounded-full mr-2'/> <span>{video.ownerDetails.username}</span>
              </div>
              <div className='text-white font-bold'>{video.title}</div>
              <div className='flex'>
                <p className='mr-2'>{video.views} views</p> 
                <p>{timeAgo(video.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default VideoFeed
