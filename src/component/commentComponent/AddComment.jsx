import React from 'react';
import {Input, Button} from '../index.js';


const AddComment = ({content, handleContent, handleComment}) => {

  return (
    <div className="bg-neutral-900 rounded-2xl p-4 shadow-md">
        <div className="font-bold text-white mb-2">Comments</div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={content}
            onChange={handleContent}
            className="flex-1 bg-neutral-800 border-none text-white rounded-full px-4 py-2"
          />
          <Button
            type="submit"
            onClick={handleComment}
            // disabled={loading || !content.trim()}
            className="rounded-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Send
          </Button>
        </div>
      </div>
  )
}

export default AddComment;
