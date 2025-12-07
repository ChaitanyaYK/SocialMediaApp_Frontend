import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;


export const getSubscribers = createAsyncThunk(
    "subcription/getSubscribers",
    async (channelId, {rejectWithValue, getState}) => {
        try {
            // const token = getState().user?.accessToken
            const response = await axios(`/api/subscriptions/c/${channelId}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error?.message)
        }
    }
)

export const getUserSubscriptions = createAsyncThunk(
    "subcription/getUserSubscriptions",
    async (userId, {rejectWithValue, getState}) => {
        try {
            // const token = getState().user?.accessToken
            const response = await axios(`/api/subscriptions/u/${userId}`)
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
            const responce = await axios(`/api/subsciptions/c/${channelId}`)
            return responce.data.data
        } catch (error) {
            return rejectWithValue(error.responce?.data?.message || error?.message)
        }
    }
)

const findIndexSubscription = (state, action) => {
    state.findIndex((subscriber) => subscriber._id === action.payload._id)
}

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
            .addCase(getSubscribers.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscribers.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers = action.payload.subscribers || [];
                state.totalSubscribers = action.payload.totalSubscribers || 0;
            })
            .addCase(getSubscribers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getUserSubscriptions.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers = action.payload.subscriber || [];
                state.totalChannels = action.payload.totalChannels || 0;
            })
            .addCase(getUserSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(toggleSubscription.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleSubscription.fulfilled, (state, action) => {
                state.isSubscribed = action.payload;
                if (action.payload === true) {
                    state.totalSubscribers += 1;
                } else {
                    state.totalSubscribers = Math.max(0, state.totalSubscribers - 1);
                }
            })
            .addCase(toggleSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export const {resetSubscriptionState} = subscriptionSlice.actions;

// const state = useSelector((state) => state.totalSubscribers)
// console.log(state);


export default subscriptionSlice.reducer;

//  reducers: {
//         toggleSubscribed: (state, action) => {
//             // // You can keep a local toggle for UI optimism (optional)
//             // const idx = state.subscriptions.findIndex((sub) => sub._id === action.payload._id);

//             // if (idx !== -1) {
//             //     state.isSubscribed = false
//             //     state.subscriptions.splice(idx, 1);
//             // } else {
//             //     state.isSubscribed = true
//             //     state.subscriptions.push({...action.payload})
//             // }
//         },
// }
// extraReducers: {
//     .addCase(toggleSubscribed.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.isSubscribed = action.payload?.isSubscribed ?? !state.isSubscribed;

//                 // Update subscription list based on backend response
//                 if (action.payload?.isSubscribed) {
//                     const idx = state.subscriptions.findIndex(
//                         (sub) => sub._id === action.payload.subscriber._id
//                     )
                    
//                     if (action.payload.isSubscribed) {
//                         if (idx === -1) {
//                             state.subscriptions = state.subscriptions.push(action.payload.subscriber)
//                         }
//                     } else {
//                         state.subscriptions = state.subscriptions.filter(
//                             (sub) = sub._id !== action.payload.subscriber._id
//                         )
//                     }
//                 }
//             })
// }