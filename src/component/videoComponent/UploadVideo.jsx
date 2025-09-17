import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Input, Button} from "../index.js";
import { useState, useEffect } from "react";

// import { usePublishVideoMutation, useUpdateVideoMutation } from '../../store/api/videoApi.js';

import { publishVideo, updateVideo } from "../../store/videoSlice.js";

function UploadVideo({ isEdit = false, video = {}}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.video?.videos || []);

    const {register, handleSubmit, watch, setValue} = useForm({
      defaultValues: {
        title: video?.title || '',
        description: video?.description || '',
        isPublished: video?.isPublished || false,
        videoFile: video?.videoFile || null,
        thumbnail: video?.thumbnail || null,
      }
    });

    // const [publishVideo, { isLoading: creating }] = usePublishVideoMutation();
    // const [updateVideo, { isLoading: updating }] = useUpdateVideoMutation();

    const watchedThumbnail = watch("thumbnail");  // watch used to Subscribe to field update/change without trigger re-render
    const watchedPublished = watch("isPublished");

    useEffect(() => {
      if (isEdit && video) {
        setValue("title", video.title);
        setValue("description", video.description);
        setValue("isPublished", video.isPublished)
      }
    }, [isEdit, video, setValue])

    const submit = async (data) => {
      try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('isPublished', data.isPublished);

        if (data.thumbnail?.[0]) formData.append('thumbnail', data.thumbnail[0]);
        if (!isEdit && data.videoFile?.[0]) formData.append('videoFile', data.videoFile[0]);

        if (isEdit) {
          await dispatch(updateVideo({videoId: videoData.$id, videoData: formData}));
          // await updateVideo({ videoId: videoData._id, videoData: formData }).unwarp();
        } else {
          await dispatch(publishVideo(formData));
          // await publishVideo(formData).unwarp();
        }
        navigate('/');
      } catch (error) {
        console.error('Submission error:', error);
      }
    }


  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>

      <Input
        placeholder='Enter video title'
        label='Title :'
        className='mb-4'
        {...register("title", { required: true })}
      />
      <Input
        placeholder='Description'
        label='Description :'
        className='mb-4'
        {...register("description", { required: true })}
      // {...errors.description && <p className="text-red-500">{errors.description.message}</p>}
      />

      { !isEdit &&
        <Input
          type="file"
          placeholder='Enter video file'
          label='Video File :'
          className='mb-4'
          {...register("videoFile", { required: true })}
        />
      }
      <Input
        label="Thumbnail Image :"
        type="file"
        className="mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("thumbnail", { required: !watchedThumbnail && !video?.thumbnail })}
      />
      {video?.thumbnail && (
        <div className="w-full mb-4">
            <img
            //  src={getVideoById(video.thumbnail)}
             src={video.thumbnail}
             alt={video.title}
             className="rounded-lg"
            />
        </div>
      )}
      <Input
       label='Publish Video '
       type='checkbox'
       checked={watchedPublished}
       className='mb-4'
       onInput={(e) => {
          setValue("isPublished", e.target.value, {required: true})
       }}
      />

      <Button type="submit" className="w-full">
          {isEdit ? "Update Video" : "Publish Video"}
      </Button>
      </form>
    </div>
  )
}

export default UploadVideo;

