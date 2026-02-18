import { createContext, useContext, useState, useEffect } from "react";
import { PlaylistSelecter } from "../component";

export const MenuContext = createContext();

export const ContextMenuProvider = ({children}) => {
    const [menu, setMenu] = useState(null);
    const [playlistVideo, setPlaylistVideo] = useState(null);

    const openPlaylist = (video) => {
        setPlaylistVideo(video);
    }

    const closePlaylist = () => {
        setPlaylistVideo(null);
    }

    const openMenu = (config) => {
        setMenu(config);
    }

    const closeMenu = () => {
        setMenu(null);
    }

    // close if outside of menu click
    useEffect(() => {
        const handler = () => closeMenu();
        window.addEventListener("click", handler);

        return () => window.removeEventListener("click", handler);
    }, [])

    return (
      <MenuContext.Provider value={{menu, openMenu, closeMenu, openPlaylist, closePlaylist}}>
        {children}
        {playlistVideo && (
          <PlaylistSelecter
            video={playlistVideo}
            onClose={closePlaylist}
          />
        )}
      </MenuContext.Provider>
    )
}

export const useContextMenu = () => useContext(MenuContext);