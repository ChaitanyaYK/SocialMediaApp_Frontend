// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Axios default config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api/v1';


// --- Async Thunks ---

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue}) => {
    try {
      await axios.post("/user/login", credentials);
      const userRes = await dispatch(getCurrentUser()).unwrap();
      // return response.data.data.user || response.data.data;
      return userRes;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/user/logout");
      return true;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue}) => {
    try {
      const response = await axios.get("/user/current-user");
      return response.data.data;
    } catch (err) {

      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, {rejectWithValue}) => {
    try {      
      const response = await axios.post("/user/change-password", data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async ({data, userId}, {rejectWithValue}) => {
    try {
      const response = await axios.patch("/user/update-account", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (data, {rejectWithValue, getState}) => {
    try {
      const response = await axios.patch("/user/update-avatar", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  "auth/updateCoverImage",
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.patch("/user/update-coverImage", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const getChannelProfile = createAsyncThunk(
  "auth/getChannelProfile",
  async (username, {rejectWithValue}) => {
    try {
      const response = await axios.get(`/user/c/${username}`);
      
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const getWatchHistory = createAsyncThunk(
  "auth/getWatchHistory",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get("/user/history");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);



// --- Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    history: [],
    profile: null,
    isAuthenticated: false,
    loading: false,
    isError: false,
    error: null,
  },
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // update Account
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // update Avatar
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // update Cover Image
      .addCase(updateCoverImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoverImage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // get channel-profile
      .addCase(getChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isAuthenticated = true
      })

      // get WatchHistory
      .addCase(getWatchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthError } = authSlice.actions;

export default authSlice.reducer;