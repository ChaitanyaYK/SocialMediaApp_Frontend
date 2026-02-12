import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "/api"

export const createPlaylist = createAsyncThunk(
    "playlist/createPlaylist",
    async(playlistData, {rejectWithValue}) => {
        try {
            const response = await api.post('/playlist', playlistData);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const updatePlaylist = createAsyncThunk(
    "playlist/updatePlaylist",
    async({playlistData, playlistId}, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/playlist/${playlistId}`, playlistData);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getUserPlaylists = createAsyncThunk(
    "playlist/getUserPlaylist",
    async(userId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/playlist/user/${userId}`);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const getPlaylistById = createAsyncThunk(
    "playlist/getPlaylistById",
    async({playlistId}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/playlist/${playlistId}`);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data.message || error?.message);
        }
    }
)

export const deletePlaylist = createAsyncThunk(
    "playlist/deletePlaylist",
    async({ playlistId}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/playlist/${playlistId}`);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const addVideoToPlaylist = createAsyncThunk(
    "playlist/addVideoToPlaylist",
    async({ playlistId, videoId }, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/playlist/${playlistId}/video/${videoId}`);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const deleteVideoFromPlaylist = createAsyncThunk(
    "playlist/deleteVideoFromPlaylist",
    async({ playlistId, videoId }, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/playlist/${playlistId}/remove/${videoId}`);
            return response.data.data;
        } catch (error) {
            throw rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


const findIndexOfPlaylist = (state, action) => {
    state.findIndex((playlist) => playlist.id === action.payload._id )
}

const initialState = {
    playlists: [],
    playlist: null,
    loading: false,
    error: null,
}
const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createPlaylist.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPlaylist.fulfilled ,(state, action) => {
                state.loading = false;
                state.playlists.push(action.payload);   
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updatePlaylist.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePlaylist.fulfilled, (state, action) => {
                state.loading = false;
                const playlistIndex = state.playlists.findIndex((playlist) => playlist._id === action.payload._id);
                if(playlistIndex !== -1) state.playlists[playlistIndex] = action.payload;
            })
            .addCase(updatePlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(deletePlaylist.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.loading = false;
                const { playlistId } = action.payload;
                state.playlists = state.playlists.filter(
                    (playlist) => playlist._id !== playlistId
                )
            })
            .addCase(deletePlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getUserPlaylists.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserPlaylists.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload.playlists;
            })
            .addCase(getUserPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getPlaylistById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPlaylistById.fulfilled, (state, action) => {
                state.loading = false;
                state.playlist = action.payload;
            })
            .addCase(getPlaylistById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    

            .addCase(addVideoToPlaylist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPlaylist = action.payload;

                const index = state.playlists.findIndex(p => p._id === updatedPlaylist._id);
                if (index !== -1) {
                    state.playlists[index] = updatedPlaylist;
                }

                if (state.playlist?._id === updatedPlaylist._id) {
                    state.playlist = updatedPlaylist;
                }
            })
            .addCase(addVideoToPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(deleteVideoFromPlaylist.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVideoFromPlaylist.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPlaylist = action.payload;
                const  index = state.playlists.findIndex(p => p._id === updatedPlaylist._id);
                if (index !== -1) {
                    state.playlists[index] = updatedPlaylist;
                }

                if (state.playlist._id === updatedPlaylist._id) {
                    state.playlist = updatedPlaylist;
                }
            })
            .addCase(deleteVideoFromPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
    
})

// export const { } = playlistSlice.actions;

export default playlistSlice.reducer;
