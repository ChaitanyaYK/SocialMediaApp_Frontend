import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getLikedVideo} from "../store/slices/likeSlice";
import timeAgo from "../utils/timeAgo.js"

const LikedVideos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {likedVideos} = useSelector((state) => state.likes);
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
      dispatch(getLikedVideo());
    }, [dispatch])

  return (
    <div> 
  
      <div> <p className='font-bold text-2xl m-2 ml-1'>liked Videos</p>
      {likedVideos.map((video) => (
        <div onClick={() => navigate(`/watch/${video._id}`)} key={video._id}>
          <div className='flex hover:bg-neutral-700 hover:backdrop-opacity-65 rounded-2xl p-2'>
            <div className='h-50 w-80 mt-4 flex-wrap'>
              <video className="rounded-2xl" width="340" height="180" controls poster={`${video.thumbnail}`} >
                <track kind="subtitles" src="/english.vtt" srcLang="en" label="English" default/>
                <track kind="subtitles" src="/hindi.vtt" srcLang="hi" label="हिंदी" /> *
              </video>
            </div>
            <div className='mt-4 pl-3 flex-nowrap'>
              <div className='flex'>
                <img src={video.channel.avatar} className='h-10 w-10 rounded-full mr-2'/> <span>{video.channel.username}</span>
              </div>
              <div className='text-white font-bold'>{video.title}</div>
              <div className='flex'>
                <p className='mr-2'>{video.views} views</p> 
                <p>{timeAgo(video.likedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )

}

export default LikedVideos;
