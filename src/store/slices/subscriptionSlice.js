import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../utils/axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api';


export const getSubscribedChannels = createAsyncThunk(
    "subcription/getSubscribers",
    async (userId, {rejectWithValue, getState}) => {
        try {
            // const token = getState().user?.accessToken
            const response = await axios(`/subscriptions/u/${userId}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message)
        }
    }
)

export const getUserChannelSubscriber = createAsyncThunk(
    "subcription/getUserSubscriptions",
    async (channelId, {rejectWithValue, getState}) => {
        try {
            // const token = getState().user?.accessToken
            const response = await axios(`/subscriptions/c/${channelId}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error?.message)
        }
    }
)


export const toggleSubscription = createAsyncThunk(
    "subcription/toggleSubscription",
    async (channelId, {rejectWithValue}) => {
        try {
            const responce = await axios.post(`/subscriptions/c/${channelId}`)
            return responce.data.data
        } catch (error) {
            return rejectWithValue(error.responce?.data?.message || error?.message)
        }
    }
)


const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState: {
        subscribers: [],
        totalSubscribers: 0,
        subscriptions: [],
        totalChannels: 0,
        isSubscribed: false,
        loading: false,
        error: null,
        isAuthenticated: false
    },
    reducers: {
        resetSubscriptionState: (state) => {
            state.totalSubscribers = 0;
            state.subscribers = [];
            state.totalChannels = 0;
            state.subscriptions = [];
            state.loading = false;
            state.isSubscribed = false;
            state.error = null;
        }

        // toggleSubscription: (state, action) => {
        //     state.isSubscribed = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscribedChannels.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscribedChannels.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers = action.payload.subscribers || [];
                state.totalSubscribers = action.payload.totalSubscribers || 0;
            })
            .addCase(getSubscribedChannels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getUserChannelSubscriber.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserChannelSubscriber.fulfilled, (state, action) => {
                const {subscribers, totalSubscribers} = action.payload;
                state.loading = false;
                state.subscribers = subscribers || [];
                state.totalSubscribers = totalSubscribers || 0;
            })
            .addCase(getUserChannelSubscriber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(toggleSubscription.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.isSubscribed = action.payload.subscribed;
            })
            .addCase(toggleSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export const { resetSubscriptionState } = subscriptionSlice.actions;


export default subscriptionSlice.reducer;
