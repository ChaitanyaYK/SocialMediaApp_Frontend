import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import "videojs-http-source-selector";
import "videojs-contrib-quality-levels";
import {Rewind, FastForward, Repeat} from "lucide-react";

const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const {options, onReady} = props;
  
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered', "video-js");

      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');

        onReady && onReady(player)
      })

      // console.log(player);
      
      // Adaptive Bit-Streaming
      player.ready(() => {
        if (typeof player.httpSourceSelector === 'function') {
          player.httpSourceSelector({
            default: 'auto'
          })
        }

        const levels = player.qualityLevels();
        levels.on("addqaulitylevel", (e) => {
          videojs.log("Quality:", e.qualityLevel.height + "p")
        })
      })

      // You could update an existing player in the `else` block here
    // on prop change as given in else block
    } else {
      // Update source when videoUrl changes
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options])

   // Update source when videoUrl changes
  useEffect(() => {
    const player = playerRef.current;

    if (player && options?.sources?.length) {
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options?.sources]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef])

  const rewind = () => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(Math.max(0, player.currentTime() - 10));
    }
  }

  const forward = () => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(player.currentTime() + 10);
    }
  }

  const replay = () => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(0);
      player.play();
    }
  }

  return (
    <div data-vjs-player>
      <div ref={videoRef}/>
        <div className='flex gap-3 mt-2'>
          <button onClick={rewind}><Rewind /> 10s</button>
          <button onClick={replay}> <Repeat /> Replay</button>
          <button onClick={forward}><FastForward /> 10s</button>
        </div>
    </div>
  )
}

export default VideoJS;
