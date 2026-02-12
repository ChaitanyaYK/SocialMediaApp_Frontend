import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const updateRecursive = (comments, updatedComment) => {
  for (const comment of comments) {
    if (comment._id === updatedComment._id) {
      Object.assign(comment, updatedComment); // Here we copy properties from source object to targeted object. here (targetObj, SourceObj)
      return true;
    }
    if (comment.replies && updateRecursive(comment.replies, updatedComment)) {
      return true;
    }
  }
  return false;
}

const insertReply = (comments, reply) => {
  for(const comment of comments) {
    if (comment._id === reply.parentComment) {
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.unshift(reply);
      return true;
    }

    if (comment.replies && insertReply(comment.replies, reply)) {
      return true;
    }
  }
  return false;
}

const deletedRecursive = (comments, commentId) => {
  return comments.filter((comment) => {
    if (comment._id === commentId) {
      return false;
    }

    if (comment.replies) {
      comment.replies = deletedRecursive(comment.replies, commentId)
    }

    return true;
  })
}


export const fetchVideoComments = createAsyncThunk(
  "comments/fetchVideoComments",
  async ({ videoId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/comments/${videoId}`);
      return {
        videoId,
        comments: response.data.data.comments,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

export const insertComment = createAsyncThunk(
  "comments/insertComment",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/comments/${videoId}`, { content });
      return {
        videoId,
        comment: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

export const addReply = createAsyncThunk(
  "comments/addCommentReply",
  async ({ commentId, content }, {rejectWithValue}) => {
    try {
      const response = await axios.post(`/comments/reply/${commentId}`, {content});
      return {
        commentId,
        reply: response.data.data
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add Reply Comment"
      )
    }
  }
)

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/comments/c/${commentId}`, { content });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to edit comment"
      );
    }
  }
);

export const deletedComment = createAsyncThunk(
  "comments/deletedComment",
  async ({ videoId, commentId }, { rejectWithValue }) => {
    try { 
      await axios.delete(`/comments/c/${commentId}`);
      return { videoId, commentId };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);



const commentSlice = createSlice({
  name: "comment",
  initialState: {
    video_comments: {}, // { [videoId]: Comment[] }
    video_loading: {},  // { [videoId]: boolean }
    video_error: {},    // { [videoId]: string | null }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoComments.pending, (state, action) => {
        const { videoId } = action.meta.arg;
        state.video_loading[videoId] = true;
      })
      .addCase(fetchVideoComments.fulfilled, (state, action) => {
        const { videoId, comments } = action.payload;
        state.video_loading[videoId] = false;
        state.video_comments[videoId] = comments;
      })
      .addCase(fetchVideoComments.rejected, (state, action) => {
        const { videoId } = action.meta.arg;
        state.video_loading[videoId] = false;
        state.video_error[videoId] = action.payload;
      })


      .addCase(insertComment.pending, (state, action) => {
        const { videoId } = action.meta.arg;
        state.video_loading[videoId] = true;
      })
      .addCase(insertComment.fulfilled, (state, action) => {
        const { videoId, comment } = action.payload;
        state.video_loading[videoId] = false;
        state.video_comments[videoId]?.unshift(comment);
      })
      .addCase(insertComment.rejected, (state, action) => {
        const { videoId } = action.meta.arg;
        state.video_loading[videoId] = false;
        state.video_error[videoId] = action.payload;
      })


      .addCase(addReply.fulfilled, (state, action) => {
        const { reply } = action.payload;
        const videoId = reply.video;

        const comments = state.video_comments[videoId];

        insertReply(comments, reply);

      })


      .addCase(editComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const videoId = updatedComment.video;

        const comments = state.video_comments[videoId];
        if(!comments) return;

        updateRecursive(comments, updatedComment);
      })


      .addCase(deletedComment.fulfilled, (state, action) => {
        const { videoId, commentId } = action.payload;
        const comments = state.video_comments[videoId];
        if(!comments || !commentId) return;
        state.video_comments[videoId] = deletedRecursive(comments, commentId);
      });
  },
});

export default commentSlice.reducer;
