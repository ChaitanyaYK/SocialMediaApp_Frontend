import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const healthcheck = createAsyncThunk(
    "healthcheck/check",
    async(_, {rejectWithValue}) => {
        try {
            const response = await api.get("/healthcheck");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Server not reachable");
        }
    }
)

const healthcheckSlice = createSlice({
    name: "health",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(healthcheck.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(healthcheck.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(healthcheck.pending, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default healthcheckSlice.reducer;