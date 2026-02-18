import { useDispatch, useSelector } from "react-redux";
import { addVideoToPlaylist, getUserPlaylists } from "../../store/slices/playlistSlice";

const PlaylistSelecter = ({ video, onClose }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { playlists } = useSelector((state) => state.playlist);

    const handleAddVideo = async(playlistId) => {
      console.log(
        "PlaylistId: ", playlistId,
        " VideoId: ", video
      );

      await dispatch(getUserPlaylists(user._id));

      await dispatch(addVideoToPlaylist({
        playlistId, 
        videoId: video._id
      }));

      onClose();
    }
    
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-neutral-800 p-4 rounded">
        <h2>Select Playlist</h2>
        {console.log("Playlist: ",playlists)
        }
        {playlists.map(playlist => (
          <button key={playlist._id} 
            onClick={() => handleAddVideo(playlist._id)} 
            className="block w-full hover:bg-gray-700 p-2"
          >
            {playlist.name}
          </button>
        ))}

        <button 
          onClick={onClose} 
          className="block w-full hover:bg-gray-700 p-2"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default PlaylistSelecter;
