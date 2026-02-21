import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/axios.js"


// If you use cookies for auth (res.cookie('token', ...) in backend), then make sure every Axios request has:
// Axios default config
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api';


// Helper to handle FormData for file uploads
export const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
        } else if(typeof value === "boolean") {
            formData.append(key, value ? "true" : "false");
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

    // Async thunks
export const fetchVideos = createAsyncThunk(
  'video/fetchVideos',
  async ({ page = 1, limit = 10, query = "", sortBy = "newest", signal }, { rejectWithValue }) => {
    try {
      const response = await api.get('/videos', { 
        params: { page, limit, query, sortBy },
        signal
      }, );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch videos");
    }
  }
);



export const fetchVideoById = createAsyncThunk(
    'video/fetchVideoById',
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/videos/${videoId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch video");
        }
    }
)

export const fetchUserVideos = createAsyncThunk(
    'video/fetchVideoUrl',
    async (userId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/videos/user/${userId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch user videos");
        }
    }
)

export const publishVideo = createAsyncThunk(
    'video/publishVideo',
    async (videoData, {rejectWithValue, getState}) => {
        try {
            const token = getState().auth?.user?.token;
            const response = await api.post(`/videos`, videoData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to publish video");
        }
    }
)


export const updateVideo = createAsyncThunk(
    'video/updateVideo',
    async ({videoId, videoData}, {rejectWithValue, getState}) => {
        try {
            const token = getState().auth?.user?.token;
            const response = await api.patch(`/videos/${videoId}`, videoData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to update video");
        }
    }
)

export const deleteVideo = createAsyncThunk(
    'video/deleteVideo',
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/videos/${videoId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to delete video");
        }
    }
)
    
export const toggleVideoPublishStatus = createAsyncThunk(
    'video/toggleVideoPublishStatus',
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/videos/toggle/publish/${videoId}`)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to toggle video publish status");
        }
    }
)



const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videos: [],
        currVideo: null,
        signedUrl: null,
        loading: false,
        error: null,
        pagination: {
            totalVideos: 0,
            page: 1,
            limit: 10,
            totalPage: 0,
        },
        filter: {
            query: "",
            sortBy: "newest"
        }
    },
    reducers: {
        clearVideoState: (state) => {
            state.error = null;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // Fetch videos
        .addCase(fetchVideos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload.videos;
            state.pagination = action.payload.pagination;
        })
        .addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // Fetch video by ID
        .addCase(fetchVideoById.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.currVideo = action.payload;
            state.signedUrl = state.currVideo.videoFile.hls_url;
        })
        .addCase(fetchVideoById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // Publish video
        .addCase(publishVideo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(publishVideo.fulfilled, (state, action) => {
            state.videos.unshift(action.payload);
            state.loading = false;
        })
        .addCase(publishVideo.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })


        // Update video
        .addCase(updateVideo.pending, (state) => {
            state.loading = true;
        } )
        .addCase(updateVideo.fulfilled, (state, action) => {
            const index = state.videos.findIndex((video) => video._id === action.payload._id);
            if (index !== -1) state.videos[index] = action.payload;
            state.loading = false;
        })
        .addCase(updateVideo.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })


        // Delete video
        .addCase(deleteVideo.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(deleteVideo.fulfilled, (state, action) => {
            state.videos = state.videos.filter((video) => video._id !== action.payload._id);
            state.loading = false;
        })
        .addCase(deleteVideo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Toggle publish
        .addCase(toggleVideoPublishStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(toggleVideoPublishStatus.fulfilled, (state, action) => {
            const index = state.videos.findIndex((video) => video._id === action.payload._id)
            if (index !== -1) state.videos[index] = action.payload;
            state.loading = false;
        })
        .addCase(toggleVideoPublishStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(fetchUserVideos.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchUserVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload;
        })
        .addCase(fetchUserVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { clearVideoState, setPage, setSearch, setSortBy } = videoSlice.actions;

export default videoSlice.reducer;

// axios.interceptors.request.use((config) => {
//   const token = store.getState().auth?.user?.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
