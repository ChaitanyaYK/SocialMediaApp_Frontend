import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchVideoComments = (videoId, page = 1, limit = 10, query= "", sortBy ="newest" ) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const { data } = await axios.get(`/api/comments/${videoId}`, {
            params: { page, limit, query, sortBy },
        });
        dispatch(getVideoComments({comments: data.data.comments, pagination: data.data.pagination}))

    } catch (error) {
        dispatch(setError(error?.response?.data?.message || "Error in fetching comment"));
    }
}

export const insertComment = (videoId, content, parentComment = null) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const {data} = await axios.post(`/api/comments/${videoId}`, { content, parentComment});
        dispatch(addComment(data.data));
    } catch (error) {
        dispatch(setError(error?.response?.data?.message || "Error in creating comment"));
    }
}

export const editComment = (commentId, content) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const {data} = await axios.put(`/api/comments/c/${commentId}`, {content});
        dispatch(updateComment({ id: commentId, updatedComment: data.data }));
    } catch (error) {
        dispatch(setError(error?.response?.data?.message || "Error in updating comment"));
    }
}

export const deletedComment = (commentId) => async (dispatch) => {
    try {
        dispatch(setLoading());
        await axios.delete(`/api/comment/c/${commentId}`);
        dispatch(deleteComment(commentId));
    } catch (error) {
        dispatch(setError(error?.response?.data?.message || "Error in deleting comment"));
    }
}

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        pagination: {
            totalComments: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
        },
        // commentData: null,
        error: null,
        isError: false,
        isAuthenticated: false,
        loading: false
    },
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.isError = false;
        },

        addComment: (state, action) => {
            state.comments = [action.payload, ...state.comments];  // prepend new comment
            state.error = null;
            state.loading = false;
            state.isAuthenticated = true;
        },

        getVideoComments: (state, action) => {
            state.comments = action.payload;
            state.error = null;
            state.loading = false;
            state.isAuthenticated = true;
        },

        updateComment: (state, action) => {
            const {id, updatedComment} = action.payload;
            state.comments = state.comments.map((comment) => 
                comment.id === id ? {  ...comment, ...updateComment } : comment
            );
            state.error = null;
            state.loading = false;
            state.isAuthenticated = true;
        },

        deleteComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            state.error = null;
            state.loading = false;
            state.isAuthenticated = true;
        },

        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isError = true;
        },
    },
});

export const {addComment, getVideoComments, updateComment, deleteComment, setError, setLoading} = commentSlice.actions;

export default commentSlice.reducer;