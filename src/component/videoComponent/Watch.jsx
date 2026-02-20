import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {CommentList, LikedButton, VideoFeed, Button} from "../index.js";
import { fetchVideoById } from '../../store/slices/videoSlice';
import {toggleVideoLiked} from "../../store/slices/likeSlice.js";
import {toggleSubscription} from "../../store/slices/subscriptionSlice.js"
import VideoJS from './VideoJS';
import 'video.js/dist/video-js.css';
import timeAgo from '../../utils/timeAgo.js';


const Watch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { videoId } = useParams();

    const {signedUrl, loading, error, currVideo } = useSelector((state) => state.video);
    const playerRef = useRef(null);

    const {likeByVideoId} = useSelector((state) => state.likes);
    const {isSubscribed} = useSelector((state) => state.subscription);

    useEffect(() => {
      if (videoId) {
        dispatch(fetchVideoById(videoId));
      }
    }, [dispatch, videoId])

    useEffect(() => {
      if (currVideo) {
        dispatch(toggleSubscription(currVideo.owner._id));
      }
    }, [currVideo])

    const handleVideoLike = (e) => {
        e.stopPropagation();
        dispatch(toggleVideoLiked(currVideo._id));
    }

    const handleSubscribed = (e) => {
      e.stopPropagation();
      dispatch(toggleSubscription(currVideo.owner._id));
    }

    const videoPlayerOptions = {
      controls: true,
      muted: true,
      responsive: true,
      fluid: true,
      autoplay: true,
      playbackRates: [0.5, 1, 1.5, 2],
      sources: [
        {
          src: signedUrl,
          type: "application/x-mpegURL",
        }
      ]
    }

    const handlePlayerReady = (player) => {
      playerRef.current = player;

      player.on("waiting", () => {
        console.log("player is waiting");
      })

      player.on("dispose", () => {
        console.log("player will dispose");
      })
    }

    if (loading) return <p>Loading video...</p>;
    if (error) return <p>{error}</p>;
    if (!signedUrl) return <p>Video unavailable</p>;

  return (
    <div className='grid grid-cols-2 h-dvw'>
      <div> 
         
        <div className="border-amber-50 gap-2 mb-5 hover:border-1 hover:bg-neutral-800 rounded-2xl p-6 ml-2">
        <div>
          <VideoJS options={videoPlayerOptions} onReady={handlePlayerReady} />
        </div>
        <div className="gap-2">
          <h2 className="text-xl font-semibold">{currVideo.title}</h2>
        </div>
        <div className='flex justify-between font-bold m-2 cursor-pointer'>
            <div className='flex flex-nowrap font-semibold'>
              <div onClick={() => navigate(`/channel/${currVideo.owner?.username}`)} className='flex'>
                <img src={currVideo.owner?.avatar} alt={currVideo.owner?.username} className="h-10 w-10 rounded-full border-2 mr-2  "/>
                <p className='hover:text-blue-500'>{`@${currVideo.owner?.username}`}</p>
              </div>
              <Button onClick={handleSubscribed} className={`h-11 ml-2 p-2.5 shadow-2xl bg-gray-700 hover:bg-gray-600`} bgColor='bg-red'>
              
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          
          <div className=''>
            <LikedButton isLiked={likeByVideoId[currVideo._id]} onClick={handleVideoLike} />
            <p>{currVideo.likesCount}</p>
          </div>
        </div>
        <div className='h-30 bg-neutral-700 hover:bg-gray-600 rounded-2xl p-4'>
          <span className='mr-2'>{currVideo.views} views</span><span className="text-sm mt-1 font-bold">{timeAgo(currVideo.createdAt)}</span>
          <p className="text-sm text-gray-500">{currVideo.description}</p>...more
        </div>
        </div>
        <div>
          <CommentList key={currVideo._id} videoId={currVideo._id} />
        </div>
      </div>
      <div>
        <VideoFeed />
      </div>
    </div>
  )
}

export default Watch;
