import React from "react";
import { Play, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PlaylistCard = ({ playlist, onOpen, onDelete }) => {
  const navigate = useNavigate();

  
  
  return (
    <div className="group relative bg-neutral-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={playlist?.videos?.[0]?.thumbnail?.url}
          alt={playlist?.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-white font-semibold text-lg truncate">
          {playlist?.name}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {playlist?.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500">
            {playlist?.totalVideos || 0} videos
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-500 hover:text-red-400 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
