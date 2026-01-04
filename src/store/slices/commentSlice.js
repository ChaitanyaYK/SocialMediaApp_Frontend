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

/* ======================= THUNKS ======================= */

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
      // console.log("_id:",_id, " video:",video, " content:",content);
      
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
      console.log("videoId", videoId, "commentId", commentId);
      
      await axios.delete(`/comments/c/${commentId}`);
      return { videoId, commentId };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

/* ======================= SLICE ======================= */

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






// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.withCredentials = true;

// // export const fetchVideoComments = (videoId, page = 1, limit = 10, query= "", sortBy ="newest" ) => async (dispatch) => {
// //     try {
// //         dispatch(setLoading());
// //         const { data } = await axios.get(`/api/comments/${videoId}`, {
// //             params: { page, limit, query, sortBy },
// //         });
// //         console.log(data);       
// //         dispatch(getVideoComments({comments: data.data.comments, pagination: data.data.pagination}))
// //     } catch (error) {
// //         dispatch(setError(error?.response?.data?.message || "Error in fetching comment"));
// //     }
// // }

// export const fetchVideoComments = createAsyncThunk('comments/fetchVideoComments', async({videoId}, {rejectWithValue}) => {
//     try {
//         const response = await axios.get(`/comments/${videoId}`);
//         console.log("slice response: ", response.data);
//         return response.data.data.comments;
//     } catch (error) {
//         return rejectWithValue(error.response.data.message || "Error occured while fetching Data");
//     }
// })

// export const insertComment = createAsyncThunk('comments/insertComment', async({videoId, content}, {rejectWithValue}) => {
//     try {
//         const response = await axios.post(`/comments/${videoId}`,  {content});
//         return response.data.data;
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.message || "Error in creating comment");
//     }
// })

// export const editComment = createAsyncThunk('comments/editComment', async({commentId, content}, {rejectWithValue})=> {
//     try {
//         const response = await axios.patch(`/comments/c/${commentId}`, {content});
//         return response.data.data.comments;
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.message || "Error in updating comment");
//     }
// })

// export const deletedComment = createAsyncThunk('comments/deletedComment', async(commentId, {rejectWithValue})=> {
//     try {
//         const response = await axios.delete(`/comment/c/${commentId}`);
//         return response.data.data.comments;
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.message || "Error in deleting comment");
//     }
// })

// const commentSlice = createSlice({
//     name: 'comment',
//     initialState: {
//         comments: [],
//         // pagination: {
//         //     totalComments: 0,
//         //     page: 1,
//         //     limit: 10,
//         //     totalPages: 0,
//         // },
//         error: null,
//         isError: false,
//         // isAuthenticated: false,
//         loading: false
//     },
//     reducers: {
//         setLoading: (state) => {
//             state.loading = true;
//             state.error = null;
//             state.isError = false;
//         },

//         // addComment: (state, action) => {
//         //     state.comments = [action.payload, ...state.comments];  // prepend new comment
//         //     state.error = null;
//         //     state.loading = false;
//         //     state.isAuthenticated = true;
//         // },

//         // getVideoComments: (state, action) => {
//         //     state.comments = action.payload;
//         //     state.error = null;
//         //     state.loading = false;
//         //     state.isAuthenticated = true;
//         // },

//         // updateComment: (state, action) => {
//         //     const {id, updatedComment} = action.payload;
//         //     state.comments = state.comments.map((comment) => 
//         //         comment.id === id ? {  ...comment, ...updateComment } : comment
//         //     );
//         //     state.error = null;
//         //     state.loading = false;
//         //     state.isAuthenticated = true;
//         // },

//         // deleteComment: (state, action) => {
//         //     state.comments = state.comments.filter((comment) => comment.id !== action.payload);
//         //     state.error = null;
//         //     state.loading = false;
//         //     state.isAuthenticated = true;
//         // },

//         setError: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             state.isError = true;
//         },
//     },
//     extraReducers: (builder) => {
//     builder
//         .addCase(fetchVideoComments.pending, (state) => {
//             state.loading = true;
//         })
//         .addCase(fetchVideoComments.fulfilled, (state, action) => {
//             state.loading = false;
//             state.comments = action.payload;
//         })
//         .addCase(fetchVideoComments.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         })

//         .addCase(insertComment.pending, (state) => {
//             state.loading = true;
//         })
//         .addCase(insertComment.fulfilled, (state, action) => {
//             state.loading = false;
//             state.comments.unshift(action.payload);
//         })
//         .addCase(insertComment.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         })

//         .addCase(editComment.pending, (state, action) => {
//             state.loading = true;
//         })
//         .addCase(editComment.fulfilled, (state, action) => {
//             state.loading = false;
//             const { _id, content } = action.payload;
//             const comment = state.comments.find(comment => comment._id === _id);
//             if (comment) comment.content = content;
//         })
//         .addCase(editComment.rejected, (state, action) => {
//             state.error = action.payload;
//         })

//          .addCase(deletedComment.pending, (state, action) => {
//             state.loading = true;
//         })
//         .addCase(deletedComment.fulfilled, (state, action) => {
//             state.loading = false;
//             state.comments = state.comments.filter(
//                 (comment) => comment._id !== action.payload._id
//             );
//         })
//         .addCase(deletedComment.rejected, (state, action) => {
//             state.error = action.payload;
//         })
//     }
// });

// export const {setError, setLoading} = commentSlice.actions;

// export default commentSlice.reducer;