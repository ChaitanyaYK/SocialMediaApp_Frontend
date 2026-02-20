import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const healthcheck = createAsyncThunk(
    "healthcheck/check",
    async(_, {rejectWithValue}) => {
        try {
            const response = await api.get("/health/check");
            return response.data.data;
        } catch (error) {
            rejectWithValue(error.response.data.message);
        }
    }
)

const healthcheckSlice = createSlice({
    name: "health",
    initialState: {
        data: null
    },
    reducers: {
        healthResponse: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { healthResponse } = healthcheckSlice.actions;
export default healthcheckSlice.reducer;