import React, {useState, useEffect} from 'react';
import {Button, Input} from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, addReply, deletedComment } from '../../store/slices/commentSlice';


const CommentForm = ({comment, videoId}) => {

  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleCommentReply = () => {
    dispatch(addReply({
      commentId: comment._id, 
      content: replyContent 
    }));
    setReplyContent("");
    setReplyMode(false);
  }

  const handleCommentEdit = async() => {
    dispatch(
      editComment({
        commentId: comment._id, 
        content: editContent,
      })
    )
    console.log(comment.content);

    setExpand(false);
  }

  const handleDeleteComment = () => {
    dispatch(deletedComment({videoId, commentId: comment._id}))
  }

  const handleChange = (e) => {
    if (expand) {
      setEditContent(e.target.value)
    } else {
      setReplyContent(e.target.value)
    }
  }

  const toggleExpand = () => {
    setExpand(!expand);
  }

  const toggleReply = () => {
    setReplyMode(!replyMode);
  }

  useEffect(() => {
    setEditContent(comment.content);
  }, [comment.content]);
  
  return (
    <div className=''>
      <div
        key={comment._id}
        className="bg-neutral-800 rounded-2xl p-4 flex gap-3 text-white"
      >
        {/* Avatar */}
        <img
          src={comment.owner?.avatar || "/avatar.png"}
          alt={comment.owner?.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Comment Content */}
        <div className="flex-1">
          <div className="font-semibold">{comment.owner?.username}</div>
          
          

          {!expand ? <div>
            <p className="text-gray-300 mt-1 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div> : (
            <div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  value={editContent}
                  onChange={handleChange}
                  className="flex-1 bg-neutral-800 border-none text-white rounded-full px-4 py-2"
                />
                <Button
                  type="submit"
                  onClick={handleCommentEdit}
                  // disabled={loading || !content.trim()}
                  className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                >
                  Send
                </Button>
              </div>
            </div>
          ) }
          {/* Actions */}
          <div className="flex gap-4 items-center text-xs text-gray-400 mt-2">
            <Button
              size="sm"
              variant="ghost"
              className={`flex items-center gap-1 ${
                comment.isLiked ? "text-blue-400" : "hover:text-blue-400"
              }`}
            >
          👍 {comment.likeCount}
            </Button>
            <button className="hover:text-gray-200" onClick={toggleReply}>Reply</button>
            <button className="hover:text-gray-200" onClick={toggleExpand}>Edit</button>
            <button className="hover:text-red-400" onClick={() =>
              dispatch(
                deletedComment({
                  videoId,
                  commentId: comment._id,
                })
              )
            }>Delete</button>
          </div>
          { replyMode && (
            <div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  value={replyContent}
                  onChange={handleChange}
                  className="flex-1 bg-neutral-800 border-none text-white rounded-full px-4 py-2"
                />
                <Button
                  type="submit"
                  onClick={handleCommentReply}
                  // disabled={loading || !content.trim()}
                  className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                >
                  Send
                </Button>
              </div>
            </div>
          )}
          {comment.replies &&
            comment.replies?.map((reply) => (
              <CommentForm key={reply._id} comment={reply} videoId={videoId} />
            ))
          }
        </div>
      </div>  
    </div>
  )
}

export default CommentForm;