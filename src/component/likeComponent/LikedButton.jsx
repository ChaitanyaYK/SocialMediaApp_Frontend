import {HeartIcon} from "lucide-react";
import React, {useState} from 'react'

const LikedButton = ({isLiked, onClick}) => {

  return (
    <div onClick={onClick} className={`flex gap-1 border-3 cursor-pointer border-neutral-600 p-1 h-9 w-19 rounded-3xl font-medium ${isLiked ? "bg-red-600" : "bg-blue-50 w-18 text-neutral-800"}`}>
      <HeartIcon size={18} fill={isLiked ? "red" : "none"} stroke="gray"/> 
      { isLiked ? "Liked" : "Like" }
    </div>
  )
}

export default LikedButton;

