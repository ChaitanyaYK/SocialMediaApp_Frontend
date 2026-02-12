import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/axios";

export const insertTweet = () => async (dispatch) => {
    try {
        dispatch(setLoading());
        const res = await axios.post('/api/tweets');
        dispatch(createTweet());
    } catch (error) {
        dispatch(setError(error.responce.data.message))
    }
}
export const getTweets = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const res = await axios.post(`/api/tweets/user/${userId}`);
        dispatch(getUserTweets(res.data));
    } catch (error) {
        dispatch(setError(error.responce.data.message))
    }
}
export const editTweet = (tweetId) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const res = await axios.post(`/api/tweets/${tweetId}`);
        dispatch(updateTweet(res.data));
    } catch (error) {
        dispatch(setError(error.responce.data.message))
    }
}
export const removeTweet = (tweetId) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const res = await axios.post(`/api/tweets/${tweetId}`);
        dispatch(deleteTweet(res.data));
    } catch (error) {
        dispatch(setError(error.responce.data.message))
    }
}

const initialState = {
    content: null,
    replies: [],
    isAuthenticated: false,
    loading: false,
    isError: false,
    error: null
}

const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload.error
            state.isError = true
            state.loading = false
        },

        createTweet: (state, action) => {
            state.content = action.payload.content
            state.replies.push(action.payload)
            state.loading = false
            state.error = null
            state.isAuthenticated = true
        },

        getUserTweets: (state, action) => {
            state.replies = action.payload
            state.error = null
            state.loading = false
            state.isAuthenticated = true
        },

        updateTweet: (state, action) => {
            const index = state.replies.findIndex((tweet) => tweet._id === action.payload._id)
            if(index !== -1) state.replies[index] = action.payload
            state.loading = false
            state.error = null
            state.isAuthenticated = true
        },

        deleteTweet: (state, action) => {
            state.replies = state.replies.filter((tweet) => tweet._id !== action.payload._id)
            state.loading = false
            state.error = null
            state.isAuthenticated = true
        },

        setLoading: (state, action) => {
            state.loading = true
            state.error = null
            state.isError = false
            state.isAuthenticated = true
        } 
    }
})

export const {createTweet, updateTweet, getUserTweets, deleteTweet, setError, setLoading} = tweetSlice.actions;

export default tweetSlice.reducer;