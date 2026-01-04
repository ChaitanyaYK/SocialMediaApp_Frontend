import React from 'react';
import { useSearchParams } from 'react-router-dom';


const Watch = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');

  return (
    <div>Watch
      <row>
        <col>

        </col>
        <col>
        
        </col>
      </row>
      {/* <div className="border-amber-50 gap-2 mb-5 hover:border-1 hover:bg-neutral-800 rounded-2xl">
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
          </div>
        </div> */}
    </div>
  )
}

export default Watch;
