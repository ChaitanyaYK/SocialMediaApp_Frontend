import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import videoSlice from './videoSlice.js';

// Query
// import { videoApi } from './api/videoApi.js';
// import { userApi } from "./api/userApi.js";


const store = configureStore({
    reducer: {
        // Slice
        auth: authSlice,
        video: videoSlice,

        // RTK Query
        // [userApi.reducerPath]: userApi.reducer,
        // [videoApi.reducerPath]: videoApi.reducer,

    },
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat(videoApi.middleware),
})

export default store;