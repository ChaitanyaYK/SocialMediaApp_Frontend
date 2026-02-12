import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api';

// --- Thunks (async actions) ---
export const toggleVideoLiked = (videoId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`/likes/toggle/v/${videoId}`);
    dispatch(isVideoLike({videoId, liked: res.data.data.liked})); // call reducer with data from API
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const toggleCommentLiked = (commentId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`/likes/toggle/c/${commentId}`);
    dispatch(isCommentLike({commentId, liked: res.data.data.liked, likeCount: res.data.data.likeCount}));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const toggleTweetLiked = (tweetId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`/likes/toggle/t/${tweetId}`);
    dispatch(isTweetLike(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const getLikedVideo = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/likes/videos");
    dispatch(getLikedVideos(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const getLikedComment = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/likes/comments");
    dispatch(getLikedComments(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const getLikedTweet = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/likes/tweets");
    dispatch(getLikedTweets(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

// --- Initial State ---
const initialState = {
  likeByVideoId: {}, // {[videoId]: {liked}}
  likeByCommentId: {}, // {[commentId]: {liked, likeCount}}
  likedVideos: [],  
  likedTweets: [],
  loading: false,
  error: null,
  isError: false,
};

// --- Slice ---
const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
      state.isError = true;
      state.loading = false;
    },

    setLoading: (state) => {
      state.error = null;
      state.loading = true;
      state.isError = false;
    },

    isVideoLike: (state, action) => {
      state.loading = false;
      const {liked, videoId} = action.payload;
      state.likeByVideoId[videoId] = liked;
    },

    isCommentLike: (state, action) => {
      state.loading = false;
      const {liked, commentId, likeCount} = action.payload;
      state.likeByCommentId[commentId] = {liked, likeCount};
    },

    isTweetLike: (state, action) => {
      state.loading = false;
      // Update local likedTweets if needed
      const {liked, likeCount, tweet} = action.payload;
      if(!tweet) return;

      if (liked) {
        state.likedTweets.push({...tweet, likeCount});
      } else {
        state.likedTweets = state.likedTweets.filter((t) => t._id !== tweet._id);
      }
    },

    getLikedVideos: (state, action) => {
      state.loading = false;
      state.likedVideos = action.payload.videos || [];
    },

    getLikedComments: (state, action) => {
      state.loading = false;
      state.likedComments = action.payload.likedComments || [];
    },

    getLikedTweets: (state, action) => {
      state.loading = false;
      state.likedTweets = action.payload.likedTweets || [];
    },
  },
});

export const {
  setError,
  setLoading,
  isVideoLike,
  isCommentLike,
  isTweetLike,
  getLikedVideos,
  getLikedComments,
  getLikedTweets,
} = likeSlice.actions;

export default likeSlice.reducer;





