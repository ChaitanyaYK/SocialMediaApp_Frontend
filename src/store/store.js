import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice.js';
import videoSlice from './slices/videoSlice.js';
import commentSlice from './slices/commentSlice.js'
import subscriptionSlice from './slices/subscriptionSlice.js'


const store = configureStore({
    reducer: {
        // Slice
        auth: authSlice,
        video: videoSlice,
        comment: commentSlice,
        subscription: subscriptionSlice,
        devTools: true

    },
})

export default store;