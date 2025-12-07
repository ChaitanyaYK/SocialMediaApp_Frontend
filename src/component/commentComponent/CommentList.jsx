import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchVideoComments } from "../../store/slices/commentSlice.js";
import {Button, Input} from "../index.js";
import CommentForm from "./CommentForm.jsx";

const CommentList = (videoId) => {
    const dispatch = useDispatch();
    const {comments, pagination, loading, error} = useSelector((state) => state.comment);
    
    const [page, setPage] = useState(1);
    const [editingId, setEditingId] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (videoId) {
            dispatch(fetchVideoComments(videoId, page, 5));
        }
    }, [dispatch, videoId, page])
    
    if(loading) {
        return (
            <div className="flex justify-center items-center py-6 text-gray-400">
                Loading comments...
            </div>
        )
    }

    if (!error) {
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
            // disabled={loading || !content.trim()}
            className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Send
          </Button>
        </div>
      </div>

      {/* --- Comment List --- */}
      <div className="space-y-4">
        {comments.map((comment) => (
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
              <p className="text-gray-300 mt-1 whitespace-pre-wrap">
                {comment.content}
              </p>

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
                <button className="hover:text-gray-200">Reply</button>
                <button className="hover:text-gray-200">Edit</button>
                <button className="hover:text-red-400">Delete</button>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-10 space-y-3">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="flex gap-3 bg-neutral-700 p-3 rounded-2xl"
                    >
                      <img
                        src={reply.owner?.avatar || "/avatar.png"}
                        alt={reply.owner?.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          {reply.owner?.username}
                        </div>
                        <p className="text-gray-300 text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        // <div className="space-y-6 px-6">
        // <div className="text-white w-full h-34 bg-neutral-800 border-1 border-none rounded-2xl">
        //     <div className="font-bold py-2.5 px-6">
        //     Comments
        //     </div>
        //     <div className="w-full border-1 border-neutral-400"></div>
        //     <div className="my-6 mx-3 max-w-5/6">
        //         <Input type="text" placeholder="Add a comment" />
        //         <div className="rounded-full ">
        //         <Button type="submit" disabled={loading || !content} >
        //             <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path></svg>
        //         </Button>
        //         </div>
        //     </div>
        // </div>
        // </div>


    //   <div className="space-y-6">
    //     <CommentForm videoId={videoId} operation="add" />

    //     {comments.map((comment) => (
    //         <div key={comment._id} className="flex gap-3 border-b border-grey-800 pb-4">
    //           <div className="flex gap-3">

    //             <img 
    //                 src={comment.owner?.avatar || "/avatar.png"}
    //                 alt={comment.owner?.username}
    //                 className="w-10 h-10 rounded-full"
    //             />
    //             <div className="flex flex-col flex-1">
    //                 <span className="font-medium text-sm">{comment.owner?.username}</span>

    //                 {editingId === comment._id ? (
    //                     <CommentForm 
    //                         videoId={videoId}
    //                         commentId={comment._id}
    //                         initialContent={comment.content}
    //                         operation="edit"
    //                         onFinish={() => setEditingId(null)}
    //                     />
    //                 ) : (
    //                     <p className="text-gray-300">{comment.content}</p>
    //                 )}

    //                 <div className="flex gap-4 items-center text-xs text-gray-400 mt-2">
    //                     {/* Like  */}
    //                     <Button
    //                         onClick={() => handleLike(comment._id)}
    //                         className={`flex items-center gap-1 hover: text-blue-400 ${
    //                             comment.isLiked ? "text-blue-500" : ""
    //                         }`}
    //                     >
    //                         <ThumbsUp size={14} />
    //                         {comment.likeCount}
    //                     </Button>

    //                     <button onClick={() => setReplyingId(comment._id)}>Reply</button>
    //                     <button onClick={() => setEditingId(comment._id)}>Edit</button>
    //                     <button onClick={() => handleDelete(comment._id)}>Delete</button>
    //                 </div>

    //                 {comment.replies && (
    //                     <div className="ml-12 mt-2 space-y-4">
    //                         {comment.replies.map((reply) => (
    //                             <div key={reply._id} className="flex gap-3">
    //                                 <img src={reply.owner?.avatar || "/avatar.png"} alt={reply.owner?.username} className="w-8 h-8 rounded-full"/>
    //                                 <div className="flex flex-col">
    //                                     <span className="font-medium text-xs">{reply.owner?.username}</span>
    //                                     <p className="text-gray-300 text-sm">{reply.content}</p>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 )}
    //             </div>
    //           </div>
    //         </div>
    //     ))}
    //   </div>
    // );
  
}

export default CommentList;


  //   return (
  //   <div className="space-y-6">
  //     {/* New top-level comment */}
  //     <CommentForm videoId={videoId} mode="add" />

  //     {comments.map((comment) => (
  //       <div key={comment._id} className="border-b border-gray-800 pb-4">
  //         <div className="flex gap-3">
  //           <img src={comment.owner?.avatar || "/default-avatar.png"} alt={comment.owner?.username} className="w-10 h-10 rounded-full" />
  //           <div className="flex flex-col flex-1">
  //             <span className="font-medium text-sm">{comment.owner?.username}</span>

  //             {editingId === comment._id ? (
  //               <CommentForm
  //                 videoId={videoId}
  //                 commentId={comment._id}
  //                 initialContent={comment.content}
  //                 mode="edit"
  //                 onFinish={() => setEditingId(null)}
  //               />
  //             ) : (
  //               <p className="text-gray-300">{comment.content}</p>
  //             )}

  //             <div className="flex gap-3 text-xs text-gray-400 mt-1">
  //               <button onClick={() => setReplyingId(comment._id)} className="hover:text-blue-400">Reply</button>
  //               <button onClick={() => setEditingId(comment._id)} className="hover:text-green-400">Edit</button>
  //               <button onClick={() => handleDelete(comment._id)} className="hover:text-red-400">Delete</button>
  //             </div>

  //             {/* Reply form */}
  //             {replyingId === comment._id && (
  //               <div className="ml-12">
  //                 <CommentForm
  //                   videoId={videoId}
  //                   parentComment={comment._id}
  //                   mode="add"
  //                   onFinish={() => setReplyingId(null)}
  //                 />
  //               </div>
  //             )}

  //             {/* Replies */}
  //             {comment.replies && (
  //               <div className="ml-12 mt-2 space-y-4">
  //                 {comment.replies.map((reply) => (
  //                   <div key={reply._id} className="flex gap-3">
  //                     <img src={reply.owner?.avatar || "/default-avatar.png"} alt={reply.owner?.username} className="w-8 h-8 rounded-full" />
  //                     <div className="flex flex-col">
  //                       <span className="font-medium text-xs">{reply.owner?.username}</span>
  //                       <p className="text-gray-300 text-sm">{reply.content}</p>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
