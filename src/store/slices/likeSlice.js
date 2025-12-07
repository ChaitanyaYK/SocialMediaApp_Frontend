import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// --- Thunks (async actions) ---
export const toggleVideoLiked = (videoId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`/api/like/toggle/v/${videoId}`);
    dispatch(toggleVideoLike(res.data.data)); // call reducer with data from API
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const toggleCommentLiked = (commentId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`/api/like/toggle/c/${commentId}`);
    dispatch(toggleCommentLike(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const toggleTweetLiked = (tweetId) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`/api/like/toggle/t/${tweetId}`);
    dispatch(toggleTweetLike(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const getLikedVideo = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/like/videos");
    dispatch(getLikedVideos(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const getLikedComment = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/like/comments");
    dispatch(getLikedComments(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

export const getLikedTweet = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/like/tweets");
    dispatch(getLikedTweets(res.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data || error.message));
  }
};

// --- Initial State ---
const initialState = {
  likedVideos: [],
  likedComments: [],
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

    toggleVideoLike: (state, action) => {
      state.loading = false;
      // Update local likedVideos if needed
      const {liked, likeCount, video} = action.payload;
      if (!video) return;

      if (liked) {
        state.likedVideos.push({ ...video, likeCount });
      } else {
        state.likedVideos = state.likedVideos.filter((v) => v._id !== video._id);
      }
    },

    toggleCommentLike: (state, action) => {
      state.loading = false;
      // Update local likedComments if needed
      const {liked, likeCount, comment} = action.payload;
      if (!comment) return;

      if (liked) {
        state.likedComments.push(...comment, likeCount)
      } else {
        state.likedComments = state.likedComments.filter((c) => c._id !== comment._id);
      }
    },

    toggleTweetLike: (state, action) => {
      state.loading = false;
      // Update local likedTweets if needed
      const {liked, likeCount, tweet} = action.payload;
      if(!tweet) return;

      if (liked) {
        state.likedTweets.push(...tweet, likeCount);
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
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
  getLikedComments,
  getLikedTweets,
} = likeSlice.actions;

export default likeSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Base API URL (adjust if needed, e.g., http://localhost:5000/api/like)
// const API_URL = "/api/like";

// // --- Async Thunks ---
// export const toggleVideoLike = createAsyncThunk(
//   "like/toggleVideoLike",
//   async (videoId, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/toggle/v/${videoId}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const toggleCommentLike = createAsyncThunk(
//   "like/toggleCommentLike",
//   async (commentId, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/toggle/c/${commentId}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const toggleTweetLike = createAsyncThunk(
//   "like/toggleTweetLike",
//   async (tweetId, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/toggle/t/${tweetId}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const getLikedVideos = createAsyncThunk(
//   "like/getLikedVideos",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/videos`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const getLikedComments = createAsyncThunk(
//   "like/getLikedComments",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/comment`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const getLikedTweets = createAsyncThunk(
//   "like/getLikedTweets",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/tweet`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // --- Slice ---
// const likeSlice = createSlice({
//   name: "like",
//   initialState: {
//     likedVideos: [],
//     likedComments: [],
//     likedTweets: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // --- Toggle Likes ---
//       .addCase(toggleVideoLike.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(toggleVideoLike.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(toggleVideoLike.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(toggleCommentLike.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(toggleCommentLike.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(toggleCommentLike.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(toggleTweetLike.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(toggleTweetLike.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(toggleTweetLike.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // --- Get Liked Content ---
//       .addCase(getLikedVideos.fulfilled, (state, action) => {
//         state.likedVideos = action.payload;
//       })
//       .addCase(getLikedComments.fulfilled, (state, action) => {
//         state.likedComments = action.payload;
//       })
//       .addCase(getLikedTweets.fulfilled, (state, action) => {
//         state.likedTweets = action.payload;
//       });
//   },
// });

// export default likeSlice.reducer;
