import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/user",
        credentials: "include",  // important for sending cookies
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth?.user?.token;
            if (token) {
                headers.set('Autherization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        // Register
        registerUser: builder.mutation({
            query: (formData) => ({
                url: "/register",
                method: "POST",
                body: formData,
            }),
        }),

        // Login
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User"],
        }),

        // Logout
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),

        // Refresh Token
        refreshToken: builder.mutation({
            query: () => ({
                url: "/refresh-token",
                method: "POST",
            }),
        }),

        // Get current user
        getCurrentUser: builder.query({
            query: () => "/current-user",
            providesTags: ["User"],
        }),

        // Change password
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/change-password",
                method: "POST",
                body: data,
            }),
        }),

        // Update account details
        updateAccountDetails: builder.mutation({
            query: (data) => ({
                url: "/update-account",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"]
        }),

        // Update avatar
        updateAvatar: builder.mutation({
            query: (formData) => ({
                url: "/update-avatar",
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["User"],
        }),

        // Update coverImage
        updateCoverImage: builder.mutation({
            query: (formData) => ({
                url: "/update-coverImage",
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["User"]
        }),

        // Get user channel profile
        getUserChannelProfile: builder.query({
            query: (username) => `/c/${username}`,
        }),

        // Get watch history
        getWatchHistory: builder.query({
            query: () => "/history",
        }),
    }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useChangePasswordMutation,
  useUpdateAccountDetailsMutation,
  useUpdateAvatarMutation,
  useUpdateCoverImageMutation,
  useGetUserChannelProfileQuery,
  useGetWatchHistoryQuery,
} = userApi;
