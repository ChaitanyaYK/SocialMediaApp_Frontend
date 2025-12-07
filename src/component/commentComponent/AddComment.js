import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, insertComment } from "../../store/slices/commentSlice.js";
import { Input, Select, Button } from "../index.js";

const AddComment = ({videoId, commentId = null, initialContent="", parentCommentId = null, operation="add" }) => {
  const dispatch = useDispatch();
  const { comments, loading, error, pagination, isError } = useSelector((state) => state.comment);
  
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  handleSubmit = async (e) => {
    e.preventDefault();

    if(!content.trim()) return;

    if (opration === "add") {
      await dispatch(insertComment(videoId, content, parentCommentId));
    } else if(operation === "edit" && commentId) {
      await dispatch(editComment(commentId, content));
    }

    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2 mb-2 mx-3">
      <Input 
        type="text"
        value={content}
        placeholder="Comment here..."
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg outline-none focus:ring focus:ring-blue-500"
      />
      <Button type="submit" disabled={loading || !content.trim() }>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path></svg>
      </Button>
    </form>
  )
}

export default AddComment;

// import AddComment from "./AddComment";

// const CommentList = ({ videoId }) => {
//   // ...same code

//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-semibold">
//         Comments ({pagination.totalComments})
//       </h3>

//       {/* Add Comment Box */}
//       <AddComment videoId={videoId} />

//       {/* Comments */}
//       {comments.length === 0 ? (
//         <p className="text-gray-400">No comments yet. Be the first!</p>
//       ) : (
//         comments.map((comment) => (
//           <div key={comment._id} className="flex gap-3 border-b border-gray-800 pb-4">
//             <img
//               src={comment.owner?.avatar || "/default-avatar.png"}
//               alt={comment.owner?.username}
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="flex flex-col">
//               <span className="font-medium text-sm">
//                 {comment.owner?.username}
//               </span>
//               <p className="text-gray-300">{comment.content}</p>
//               <span className="text-xs text-gray-500 mt-1">
//                 {new Date(comment.createdAt).toLocaleString()}
//               </span>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-between items-center pt-4">
//           <Button
//             disabled={page <= 1}
//             onClick={() => setPage((prev) => prev - 1)}
//           >
//             Previous
//           </Button>
//           <span className="text-gray-400">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <Button
//             disabled={page >= pagination.totalPages}
//             onClick={() => setPage((prev) => prev + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };
