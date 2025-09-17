import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Helper to handle FormData for file uploads
export const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((file) => formData.append(key, file));
        } else {
            formData.append(key, value);
        }
    });
    return formData;
};

    // Async thunks
export const fetchVideos = createAsyncThunk(
    'videos/fetchVideos',
    async (params, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/videos', { params });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)


export const fetchVideoById = createAsyncThunk(
    'videos/fetchVideoById',
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/videos/${videoId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)


export const publishVideo = createAsyncThunk(
    'videos/publishVideo',
    async (videoData, {rejectWithValue}) => {
        try {
            const formData = createFormData(videoData);
            const response = await axios.post('/api/videos', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)


export const updateVideo = createAsyncThunk(
    'videos/updateVideo',
    async ({videoId, videoData}, {rejectWithValue}) => {
        try {
            const formData = createFormData(videoData);
            const response = await axios.patch(`/api/videos/${videoId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            });
            return response.data.data.video;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteVideo = createAsyncThunk(
    'videos/deleteVideo',
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/videos/${videoId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)
    
export const toggleVideoPublishStatus = createAsyncThunk(
    'videos/toggleVideoPublishStatus',
    async (videoId, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`/api/videos/${videoId}/toggle-publish`)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

const initialState = {
    videos: [],
    currentVideo: null,
    loading: false,
    error: null,
    pagination: {}
}

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        clearVideoState: (state) => {
            state.currentVideo = null;
            state.error = null;
        }
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
            state.currentVideo = action.payload;
            state.loading = false;
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
        .addCase(deleteVideo.fulfilled, (state, action) => {
            state.videos = state.videos.filter((video) => video._id !== action.payload._id);
            state.loading = false;
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
        });
    }
})

export const { clearVideoState } = videoSlice.actions;

export default videoSlice.reducer;