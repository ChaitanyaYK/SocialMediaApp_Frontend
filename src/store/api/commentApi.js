import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const commentApi = createApi({
    reducerPath: 'comment',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/comments',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth?.user?.token;
            if (token) {
                headers.set('Autherization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        getVideoComments: builder.query({
            query: (videoId) => ({ url: `/${videoId}`}) 
        }),

        addComment: builder.mutation({
            query: ({videoId, data}) =({
                url: `/${videoId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comments'],
        }),

        updateComment: builder.mutation({
            query: ({id, data}) => ({
                url: `/c/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Comments']
        }),

        deleteComment: builder.mutation({
            query: () => ({
                url: `/c/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments']
        })
    })
});

const commentApi = {
    useGetVideoCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = commentApi;