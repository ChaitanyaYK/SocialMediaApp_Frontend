import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { fetchVideos } from '../store/slices/videoSlice';
import { VideoList } from '../component';

const SearchPage = () => {
    const dispatch = useDispatch();
    const {search} = useLocation();

    const query = new URLSearchParams(search).get("q");

    useEffect(() => {
        if (query) {
            dispatch(fetchVideos({query}));
        }
    }, [query, dispatch])
  return (
    <div>
      <VideoList />
    </div>
  )
}

export default SearchPage;
