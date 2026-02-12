import React from 'react';
import {HeartIcon} from "lucide-react";
import { useEffect } from 'react';
import Button from '../Button';

const LikeIcon = ({isLiked, onClick, likeCount}) => {
  return (
    <Button onClick={onClick} className={`flex text-md mr-1 items-center gap-1 bg-neutral-500 w-10${isLiked ? "text-blue-400" : "hover:text-blue-400"}`}>
      <HeartIcon fill={isLiked ? "red" : "none"} stroke='gray'/> 
      <p className='pl-1 font-stretch-50%'>{likeCount || 0}</p>
    </Button>
  )
}

export default LikeIcon;
