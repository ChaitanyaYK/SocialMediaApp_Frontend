
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { publishVideo, updateVideo } from "../../store/slices/videoSlice.js";

function UploadVideo({ isEdit = false, video = {} }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
      defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
        isPublished: video?.isPublished || false,
    },
    });

  // const watchedThumbnail = watch("thumbnail");
    const watchedPublished = watch("isPublished");

  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewThumb, setPreviewThumb] = useState(video?.thumbnail || null);
  const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
      if (isEdit && video) {
        setValue("title", video.title);
        setValue("description", video.description);
      setValue("isPublished", video.isPublished);
      }
  }, [isEdit, video, setValue]);

  const handleVideoPreview = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewVideo(url);
    }
  };

  const handleThumbPreview = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewThumb(url);
    }
  };

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

    const submit = async (data) => {
      try {
        const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("isPublished", data.isPublished);

      if (data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0]);
      if (!isEdit && data.videoFile?.[0]) {
        formData.append("videoFile", data.videoFile[0]);
        handleVideoPreview(data.videoFile[0]);
      }

      simulateProgress();

        if (isEdit) {
        await dispatch(updateVideo({ videoId: video._id, videoData: formData }));
        } else {
          await dispatch(publishVideo(formData));
      }

      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-white">
        {isEdit ? "Edit Video" : "Upload Video"}
      </h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        {/* Drag & Drop Video Upload */}
        {!isEdit && (
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              accept="video/*"
              {...register("videoFile", { required: "Video file is required" })}
              className="hidden"
              id="video-upload"
              onChange={(e) => handleVideoPreview(e.target.files[0])}
            />
            <label htmlFor="video-upload" className="block">
              {previewVideo ? (
                <video
                  src={previewVideo}
                  controls
                  className="rounded-lg w-full max-h-64 mx-auto"
                />
              ) : (
                <div className="text-gray-400">
                  <p className="text-lg">Drag & Drop your video here</p>
                  <p className="text-sm">or click to browse</p>
                </div>
              )}
            </label>
            {errors.videoFile && (
              <p className="text-red-400 text-sm mt-2">
                {errors.videoFile.message}
              </p>
            )}
          </div>
        )}

        {/* Title */}
    <div>
      <Input
            placeholder="Enter video title"
            label="Title"
            {...register("title", { required: "Title is required" })}
            className="w-full"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Write a description..."
            className="w-full bg-neutral-800 text-white rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
        <Input
          type="file"
            label="Thumbnail Image"
        accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("thumbnail")}
            onChange={(e) => handleThumbPreview(e.target.files[0])}
            className="w-full"
          />
          {previewThumb && (
            <div className="mt-3">
              <p className="text-gray-400 mb-1">Thumbnail Preview:</p>
              <img
                src={previewThumb}
                alt="Thumbnail Preview"
                className="rounded-lg w-full max-h-48 object-cover"
              />
            </div>
          )}
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isPublished")}
            checked={watchedPublished}
            onChange={(e) => setValue("isPublished", e.target.checked)}
            className="w-5 h-5 rounded accent-blue-500"
          />
          <label className="text-white">Publish immediately</label>
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
        </div>
      )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full rounded-xl py-3 font-semibold text-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isEdit ? "Update Video" : "Publish Video"}
      </Button>
      </form>
    </div>
  );
}

export default UploadVideo;

