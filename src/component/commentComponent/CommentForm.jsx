import React, {useState, useEffect} from 'react';
import {Button, Input, AddComment} from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, addReply, deletedComment } from '../../store/slices/commentSlice';
import {toggleCommentLiked} from '../../store/slices/likeSlice.js'
import {LikeIcon} from "../index.js";


const CommentForm = ({comment, videoId}) => {

  const dispatch = useDispatch();
  const {likeByCommentId} = useSelector((state) => state.likes);
  const [expand, setExpand] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  let liked;
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

  const handleCommentLike = (e) => {
    e.stopPropagation();
    dispatch(toggleCommentLiked(comment._id))
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
    <div className='min-w-fit'>
      <div
        key={comment._id}
        className="bg-neutral-800 rounded-2xl p-2 flex  gap-1 text-white mt-1 border-2 hover:border-gray-400 overflow-x-clip"
      >
        {/* Avatar */}
        <img
          src={comment.owner?.avatar || "/avatar.png"}
          alt={comment.owner?.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Comment Content */}
        <div className="flex-1 ">
          <div className="font-semibold">{comment.owner?.username}</div>
          
          

          {!expand ? <div>
            <p className="text-gray-300 mt-1 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div> : (
            <div >
              <AddComment content={editContent} handleContent={handleChange} handleComment={handleCommentEdit}/>
            </div>
          ) }
          {/* Actions */}
          <div className="flex items-center text-xs text-gray-400 mt-2">
            <div className='flex flex-1/4 align-middle justify-evenly'>
              <div>
                <LikeIcon isLiked={likeByCommentId[comment._id]?.liked} onClick={handleCommentLike} likeCount={likeByCommentId[comment._id]?.likeCount}/>
              </div>
              <button className="hover:text-gray-200" onClick={toggleReply}>Reply</button>
              <button className="hover:text-gray-200" onClick={toggleExpand}>Edit</button>
              <button className="hover:text-red-400" onClick={() =>
                dispatch(
                  deletedComment({
                    videoId,
                    commentId: comment._id,
                  })
                )
              }>
                Delete
              </button>
            </div>
          </div>
          { replyMode && (
            <div>
              <AddComment content={replyContent} handleContent={handleChange} handleComment={handleCommentReply} />
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