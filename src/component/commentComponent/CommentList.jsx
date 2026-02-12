import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVideoComments, insertComment } from "../../store/slices/commentSlice.js";
import CommentForm from "./CommentForm.jsx";
import {AddComment} from "../index.js"

const CommentList = ({ videoId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(
      (state) => state.comment.video_comments[videoId] || []
    );
    const error = useSelector(
      (state) => state.comment.video_error[videoId] 
    );
    const loading = useSelector(
      (state) => state.comment.video_loading[videoId] 
    );
    
    const [content, setContent] = useState("");

    useEffect(() => {
        if (videoId && comments.length === 0) {
            dispatch(fetchVideoComments({videoId}));
        }

    }, [dispatch, videoId, comments.length])

    const handleAddComment = () => {
      if(!content.trim()) return;
      dispatch(insertComment({videoId, content}));
      setContent("");
    }

    const handleContent = (e) => {
      setContent(e.target.value);
    }
    
    if(loading) {
        return (
            <div className="flex justify-center items-center py-6 text-gray-400">
                Loading comments...
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-400 text-center py-6">
                Failed to load comments: {error}
            </div>
        )
    }

    return (

      <div className="space-y-6 px-6">
      {/* --- Add Comment Box --- */}
      <AddComment content={content} handleComment={handleAddComment} handleContent={handleContent}/>

      {/* --- Comment List --- */}
      <div className="space-y-4 overflow-clip">
        {comments?.length > 0 && comments.map((comment) => {
          if (!comment || !comment.owner) return null;
          return (
            <div>
              <CommentForm key={comment._id} comment={comment} videoId={videoId} />
            </div>
          )
        })}
      </div>
    </div>
  );
  
}

export default CommentList;

