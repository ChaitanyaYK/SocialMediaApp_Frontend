
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button, TextArea } from "../index.js";
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

      return () => {
        if(previewVideo) URL.revokeObjectURL(previewVideo);
        if(previewThumb) URL.revokeObjectURL(previewThumb);
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
    }, 3000);
  };

  const submit = async (data) => {
    console.log("Submit is call", data);
    
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("isPublished", data.isPublished ? "true" : "false");
      formData.append("visibility", data.visibility);

      if (data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0]);

      if (!isEdit && data.videoFile?.[0]) {
        formData.append("videoFile", data.videoFile[0]);
      }

      if (isEdit) {
        await dispatch(updateVideo({
          videoId: video._id,
          videoData: formData,
        })).unwrap();
      } else {
        await dispatch(publishVideo(formData)).unwrap();
      }

      navigate("/");
    } catch (error) {
      toast.error(error || "Video Upload failed");
      console.error("Video Submission error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900 border-2 border-gray-400 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-white">
        {isEdit ? "Edit Video" : "Upload Video"}
      </h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-8">
      
        {!isEdit && (
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition">
            <Input
              type="file"
              accept="video/*"
              {...register("videoFile", { 
                required: "Video file is required", 
                onChange: (e) => handleVideoPreview(e.target.files[0]),
               },
              )}
              className="hidden"
              id="video-upload"
              error={errors.videoFile?.message}
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
            
          </div>
        )}

 
    <div>
      <Input
            placeholder="Enter video title"
            label="Title"
            {...register("title", { 
              required: "Title is required",
            })}
            className="w-full"
            error={errors.title?.message}
          />
        </div>

      
        <div>
          <TextArea
            {...register("description", { required: "Description is required" })}
            label="Description"
            placeholder="Write a description..."
            className="w-full bg-neutral-800 text-white rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>


        <div>
          <Input
            type="file"
            label="Thumbnail Image"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("thumbnail",
              {onChange: (e) => handleThumbPreview(e.target.files[0])}
            )}
            className="w-full"
            error={errors.thumbnail?.message}
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

        <select {...register("visibility")}>
          <option value="public">public</option>
          <option value="subscriber">subscriber</option>
          <option value="private">private</option>
        </select>


        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isPublished")}
            checked={watchedPublished}
            onChange={(e) => setValue("isPublished", e.target.checked)}
            className="w-5 h-5 accent-blue-500"
          />

          <label className="text-white font-medium">
            Publish Video
          </label>
        </div>


       
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
        </div>
      )}


        <div className="flex justify-center m-10">
          <Button
            type="submit"
            bgColor="bg-white hover:bg-gray-500"
            textColor="text-neutral-900"
            className="rounded-b-md p-2.5 font-semibold text-lg"
          >
            {isEdit ? "Update Video" : "Publish Video"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadVideo;

