import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../store/slices/videoSlice";
import {Link} from "react-router-dom"
import fs from "fs"

const VideoList = () => {
  const dispatch = useDispatch();
  const { videos, loading, error, pagination } = useSelector((state) => state.video);
  console.log(videos);

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
          <div className="border-amber-50 gap-2 mb-5 hover:border-1 hover:bg-neutral-800 rounded-2xl">
          <div key={video._id} className="m-3 text-white rounded-2xl ">
             
            {/* <Link to={video.videoFile} content={video.thumbnail} > */}
            {/* </Link> */}
            <video className="rounded-2xl" width="340" height="180" controls src={video.videoFile} poster={`${video.videoFile.replace('/upload/', '/upload/so_2/').replace('.mp4', '.jpg')}`}>
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
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default VideoList;





// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { fetchVideos, setSearch, setPage, setSortBy } from '../../store/slices/videoSlice.js';
// import { Input, Select, Button} from '../index.js';
// import image1 from '../../assets/image1.jpg'

// function VideoList() {
//     const dispatch = useDispatch();
//     const {videos, filters, loading, error} = useSelector((state) => state.video);
//     console.log(videos);
//     // useEffect(() => {
//     //     dispatch(fetchVideos({
//     //         page: pagination.page,
//     //         limit: pagination.limit,
//     //         search: filters.search,
//     //         sortBy: filters.sortBy
//     //     }));
//     // }, [dispatch, pagination.page, filters.search, filters.sortBy]);

//     // const fetchNewVideo = () => {
//     //   if (hasMore) {
//     //     dispatch(setPage(pagination.page + 1))
//     //   }
//     // }
    
//  return(
//  <div>
//       {/* <Input type="text" placeholder="Search..." value={filters} onChange={(e) => dispatch(setSearch(e.target.value))} />
//       <Select value={filters.sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
//         <Option value="newest">Newest</Option> 
//         <Option value="oldest">Oldest</Option> 
//         <Option value="popular">Most Popular</Option> 
//       </Select> 
//  </div>
// ) */}