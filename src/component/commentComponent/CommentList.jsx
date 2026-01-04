import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVideoComments, insertComment } from "../../store/slices/commentSlice.js";
import {Button, Input} from "../index.js";
import CommentForm from "./CommentForm.jsx";

const CommentList = ({ videoId }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment.video_comments[videoId] || []);
    const error = useSelector((state) => state.comment.video_error[videoId] );
    const loading = useSelector((state) => state.comment.video_loading[videoId] );
    
    const [editingId, setEditingId] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (videoId && comments.length === 0) {
            dispatch(fetchVideoComments({videoId}));
        }

        console.log('videoId: ', videoId);

    }, [dispatch, videoId])

    const handleAddComment = () => {
      if(!content.trim()) return;
      dispatch(insertComment({videoId, content}));
      setContent("");
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
      <div className="bg-neutral-900 rounded-2xl p-4 shadow-md">
        <div className="font-bold text-white mb-2">Comments</div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-neutral-800 border-none text-white rounded-full px-4 py-2"
          />
          <Button
            type="submit"
            onClick={handleAddComment}
            // disabled={loading || !content.trim()}
            className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Send
          </Button>
        </div>
      </div>

      {/* --- Comment List --- */}
      <div className="space-y-4">
        {comments?.length > 0 && comments.map((comment) => {
          if (!comment || !comment.owner) return null;
          return (
            <Comment
            Form key={comment._id} comment={comment} videoId={videoId} />
          )
        })}
      </div>
    </div>
  );
  
}

export default CommentList;

