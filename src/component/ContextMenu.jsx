import { useContextMenu } from "../context/ContextMenuContext";
import { PlaylistSelecter } from "../component/index"

const ContextMenu = () => {
    const { menu, closeMenu, openPlaylist } = useContextMenu();

    if(!menu) return null;

    const { type, data, position } = menu;

    return (
        <div 
          style={{
            position: "fixed", 
            top: position.y, 
            left: position.x
          }} 
          onClick={(e) => e.stopPropagation()} className="bg-gray-800 rounded shadow-lg z-50"
        >
          {type === "video" && (
            <div>
              <button onClick={() => {
                console.log("Add to playlist:", data._id);
                openPlaylist(data);
                closeMenu();
                }} className="block px-4 py2 hover:bg-gray-700 w-full text-left"
              >
                Add to Playlist
              </button>
              <button onClick={() => closeMenu()} className="block px-4 py2 hover:bg-gray-700 w-full text-left">
                Cancel
              </button>
            </div>
          )}
        </div>
    )
}

export default ContextMenu;