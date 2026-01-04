import React from 'react'
import Input from '../index'
const AddComment = () => {

  return (
    <div className='space-y-6 px-6'>
      <div className='bg-neutral-900 rounded-2xl p-4 shadow-md'>
        <div className='flex items-center gap-2'>
          <Input 
            type='text'
            // value={}
            className='flex-1 bg-neutral-800 border-none text-white rounded-full px-4 py-2' 
          />
        </div>
      </div>
    </div>
  )
}

export default AddComment
