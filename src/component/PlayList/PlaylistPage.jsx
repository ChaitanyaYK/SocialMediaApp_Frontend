import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlaylistById, addVideoToPlaylist, deleteVideoFromPlaylist, deletePlaylist } from '../../store/slices/playlistSlice';
import { ArrowLeft, Play, Plus, Trash2, PenBox } from 'lucide-react';
// import {} from "../.."

const PlaylistPage = () => {
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { playlist, loading } = useSelector((state) => state.playlist);

    const [videoId, setVideoId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(playlistId) {
            dispatch(getPlaylistById({playlistId}));
        }
    }, [playlistId])

    const handleVideoRemove = (e) => {
      e.stopPropagation();
      dispatch(deleteVideoFromPlaylist({ playlistId, videoId }));
    }

    const handleDeletePlaylist = (e) => {
      e.stopPropagation();
      dispatch(deletePlaylist({ playlistId }));
      navigate(`/playlist`);
    }

    const handleAddVideoToPlaylist = (e) => {
      e.stopPropagation();
      dispatch(addVideoToPlaylist({playlistId, videoId}))
      setOpen(false);
    }

    if (loading) {
        return <div>Loading...</div>
    }

  return (
    <div className="min-h-screen text-white p-6">
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4'>
          <button onClick={() => navigate(-1)} className='p-2 rounded-full bg-neutral-800 hover:bg-neutral-700'>
            <ArrowLeft className='w-5 h-5' />
          </button>
          <h1 className='text-2xl font-bold'>{playlist?.name}</h1>
        </div>

        <div className='flex gap-3'>
          <button onClick={() => navigate(`/playlist/${playlistId}/edit`)} className='flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg'>
            <PenBox className='w-4 h-4'/> Edit
          </button>
          <button  onClick={() => navigate('/publishVideo')} className='flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg'>
            <Plus className='w-4 h-4'/> Add Video
          </button>
          <button onClick={handleDeletePlaylist} className='flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg'>
            <Trash2 className='w-4 h-4'/> Delete
          </button>
        </div>
      </div>

      {playlist && (
        <div className='relative w-full h-70 rounded-xl overflow-hidden mb-8'>
          <img 
            src={playlist?.videos?.thumbnail?.url}
            alt='cover'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/60'/>

          <div className='absolute bottom-6 left-6'>
            <h2 className='text-3xl font-bold'>{playlist?.name}</h2>
            <p className='text-gray-300 mt-1'>{playlist?.description || "No description"}</p>
            <p className='text-sm text-gray-400 mt-2'>
              {playlist?.totalVideos || 0} videos
            </p>
          </div>
        </div>
      )}
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {playlist?.videos?.map((video) => (
          <div key={video._id} onClick={() => setVideoId(video._id)} className='group bg-neutral-800 rounded-xl shadow-lg hover:shadow-2xl trasition'>
            <div className='relative h-40'>
             {video?.thumbnail && ( 
                <div className='overflow-hidden'>
                  <img 
                    src={video?.thumbnail?.url || "/vite.svg"}
                    alt={video?.title}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform '
                  />
                </div>
              )}
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition'>
                <button onClick={() => navigate(`/watch/${video._id}`)} className='bg-white text-black p-3 rounded-full'>
                  <Play className='w-6 h-6' />
                </button>
              </div>

              <div className='p-4'>
                <h3 className='font-semibold truncate'>{video?.title}</h3>
                <p className='text-sm text-gray-300 line-clamp-2'>
                  {video.description || "des"}
                </p>

                <div className='flex justify-between items-center mt-3 text-xs text-gray-400'>
                  <span>{video?.views} views</span>
                </div>

                <button onClick={handleVideoRemove} className='mt-3 w-full bg-red-600 hover:bg-red-500 text-sm py-2 rounded-lg'>
                  Remove from playlist
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>


      {playlist?.videos?.length === 0 && (
        <div className='text-center text-gray-400 mt-20'>
          <p>No videos in this playlist</p>
          <button onClick={() => navigate(`/`)} className='mt-4 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg'>
            Add your first video
          </button>
        </div>
      )}
    </div>
  )
}

export default PlaylistPage;

