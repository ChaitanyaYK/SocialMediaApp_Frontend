import React from 'react';
import {VideoList} from "../index.js"
import { Link } from 'react-router-dom';

const HomePage = () => {
  const options = [
    "All", "Twenty20", "Music", "Live", "Mixes", "Gaming",
    "Debates", "Coke Studio", "Democracy", "Drama",
    "Standup Comedy", "CID", "History", "Web Development",
    "Movie", "Gadgets", "Data Structures"
  ];

  return (
    <div>
      <div className="max-w-310 bg-neutral-900 p-2">
        <Link  className="flex flex-row flex-nowrap overflow-x-auto space-x-3 ">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-1 bg-gray-700 whitespace-nowrap text-white rounded-full text-sm flex-shrink-0 cursor-pointer hover:bg-gray-600 transition"
            >
              {option}
            </div>
          ))}
        </Link>
        <div className='mt-4'>
          <VideoList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;


