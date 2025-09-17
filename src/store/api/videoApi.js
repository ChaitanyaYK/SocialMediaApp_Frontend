import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Query } from 'mongoose';

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        perpareHeaders: (headers, {getState}) => {
            const token = getState().auth?.user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Videos', 'Video'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: (params) => ({url: '/videos', params}),
            providesTags: ['Videos'],
        }),

        getVideoById: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: (result, err, id) => [{ type: 'Video', id }],
        }),

        publishVideo: builder.mutation({
            query: (formData) => ({
                url: '/videos/publish',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Videos'],
        }),

        updateVideo: builder.mutation({
            query: ({id, formData}) =>({
                url: `/videos/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: (result, err, {id}) => [{type: 'Video', id}, 'Videos'],
        }),

        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Videos'],
        }),

        togglePublishStatus: builder.mutation({
            query: (id) => ({
                url: `/videos/toggle-publish/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Videos'],
        }),
    }),
});


export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  usePublishVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useTogglePublishStatusMutation,
} = videoApi;