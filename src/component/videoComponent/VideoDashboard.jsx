import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteVideo, toggleVideoPublishStatus, fetchVideos } from "../../store/slices/videoSlice.js";


const VideoDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {videos, loading, pagination, error} = useSelector((state) => state.video);

    useEffect(() => {
        dispatch(fetchVideos({page: 1, limit: 10}));
    }, [dispatch]);


    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this video?")) {
        dispatch(deleteVideo(id))
      }
    }

    const handleTogglePublish = (id) => {
      dispatch(toggleVideoPublishStatus(id));
    };

    const handleEdit = (id) => {
      navigate(`/videos/edit/${id}`);
    };

    const handleView = (id) => {
      navigate(`/videos/${id}`);
    };


    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Videos</h1>

      {loading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {videos.map((video) => (
          <div key={video._id} className="border p-4 rounded-lg shadow-sm flex gap-4">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-32 h-20 object-cover rounded-md"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-500">{video.description}</p>
              <p className="text-sm mt-1">
                Duration: <strong>{video.duration}</strong>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    video.isPublished ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {video.isPublished ? "Published" : "Unpublished"}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleView(video._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(video._id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(video._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleTogglePublish(video._id)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
              >
                {video.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(pagination.totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() =>
                dispatch(fetchVideos({ page: page + 1, limit: 10 }))
              }
              className={`px-3 py-1 border rounded ${
                pagination.page === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoDashboard;

