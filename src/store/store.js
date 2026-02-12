import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice.js';
import videoSlice from './slices/videoSlice.js';
import commentSlice from './slices/commentSlice.js';
import subscriptionSlice from './slices/subscriptionSlice.js';
import likeSlice from './slices/likeSlice.js';
import playlistSlice from './slices/playlistSlice.js'

const store = configureStore({
    reducer: {
        // Slice
        auth: authSlice,
        video: videoSlice,
        comment: commentSlice,
        subscription: subscriptionSlice,
        likes: likeSlice,
        playlist: playlistSlice,
        devTools: true

    },
})

export default store;