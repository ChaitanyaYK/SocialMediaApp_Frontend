import React, { useEffect, useState } from 'react';
import { createPlaylist, getUserPlaylists, deletePlaylist } from '../../store/slices/playListSlice';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlaySquare, Plus, PlusCircle } from 'lucide-react';
import { Input } from '../index.js';


const PlaylistGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth)
  const { playlists, loading } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPlaylists(user._id))
    }
  }, [user?._id])

  if (loading) {
    return <div className='text-white p-6'>Loading...</div>
  }


  return (
    <div className="p-6">
      <h2 className="text-white text-2xl font-bold mb-6">Your Video</h2>
      <div className='flex items-center justify-between gap-4 mb-6'>
        <button onClick={() => navigate(-1)} className='p-2 rounded-full bg-neutral-800 hover:bg-neutral-700'>
          <ArrowLeft className='w-5 h-5' />
        </button>
        <div className='flex gap-3'>
          <button onClick={() => setOpen(true)} className='flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg'>
            <Plus />Add Playlist
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
            onDelete={() => dispatch(deletePlaylist({playlistId: playlist._id}))}
            onOpen={() => navigate(`/playlist/${playlist._id}`)}
          />
        ))}
      </div>

      {open && (
        <AddPlaylistModel open={open} setOpen={setOpen} onClose={() => setOpen(false)} />
      )}
    </div>
  )
}

export default PlaylistGrid;




export const AddPlaylistModel = ({ open, setOpen, onClose }) => {
  if(!open) return null;
  const dispatch = useDispatch();

  const [data, setData] = useState({
    "name": "",
    "description": ""
  })

  const [errors, setErrors] = useState({});

  const validationConfig = {
    name: [
      { required: true, message: 'Please enter name' },
      { minLength: 2, message: 'Name should be at least 3 characters long'},
    ],
    description: [
      { required: true, message: 'Please enter description' }
    ]
  }

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }
      })
    })

    setErrors(errorsData);
    return errorsData;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(data);

    if(Object.keys(validateResult).length) return;

    setData(e.target.value);

    dispatch(createPlaylist(data));

    setOpen(false);
  }

  const handleChange = (e) => {
    const {name, value} = e.target 
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form onSubmit={handleSubmit} className="bg-neutral-900 w-105 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add Playlist</h2>

        <Input 
          label="name" 
          name="name" 
          value={data.name}
          error={errors.name} 
          onChange={handleChange}
          placeholder="Enter title" 
          className="mb-2" 
        />
        <Input 
          label="Description" 
          name="description" 
          value={data.description} 
          error={errors.description} 
          onChange={handleChange}
          placeholder="Enter description" 
          className="mb-2" 
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600">
            Cancel
          </button>

          <button type='submit' className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}