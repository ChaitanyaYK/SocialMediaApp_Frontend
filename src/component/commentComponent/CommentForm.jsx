import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertComment, editComment } from "../../store/slices/commentSlice.js";
import { Button, Input, Select } from "../index.js"

const CommentForm = ({videoId, commentId=null, parentComment=null, initialContent="", operation = "add", onFinish }) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.comment);
  const [content, setContent] = useState(initialContent);

  // When initialContent is change then render it using useEffect()
  useEffect(() => {
    setContent(initialContent)
  }, [initialContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (operation === "add") {
      await dispatch(insertComment(videoId, content, parentComment))
    } else if (operation === "edit" && commentId) {
      await dispatch(editComment(commentId, content))
    }

    setContent("")

    if (onFinish) onFinish();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2 mb-2 mx-3">
      < Input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add Comment"
        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg outline-none focus:ring focus:ring-blue-500"
      />
      <Button type="submit" disabled={loading || !content.trim()}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon"><path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path></svg>
      </Button>
      {onFinish && (
        <Button type="button" onClick={onFinish} className="ml-2 bg-red-600 hover:bg-red-700">
          Cancel
        </Button>
      )}
    </form>
  )
}

export default CommentForm;