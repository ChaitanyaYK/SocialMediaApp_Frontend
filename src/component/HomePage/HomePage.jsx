import React from 'react';

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
        <div className="flex flex-row overflow-x-auto flex-nowrap space-x-3 scrollbar-hide scrollbar">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-1 bg-gray-700 whitespace-nowrap text-white rounded-full text-sm flex-shrink-0 cursor-pointer hover:bg-gray-600 transition"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;


