// import React from 'react';
// import { Input, Button } from '../index.js';
// import { useForm } from 'react-hook-form';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { updateAccount, updateAvatar, updateCoverImage, getChannelProfile, getCurrentUser } from '../../store/authSlice.js';

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const { loading, isAuthenticated, isError, error} = useSelector((state) => state.auth);
//   const {register, handleSubmit, reset, watch, setValue, getValues} = useForm();


//   return (
//     <div className='w-full h-200 bg-blend-color-burn bg-zinc-800 relative'>
//       <img src="" alt="" className='rounded-b-full '/>
//         <div className='w-full h-50 bg-neutral-200'>
//           <div className='w-32 h-32 rounded-full bg-blue-300 absolute left-11 top-30'><Link to={ProfileImage.jpg}>Profile</Link></div>
//           <span></span>
//         </div>
//         <div className='w-full h-0.5 bg-amber-50'></div>
//         <form >
//             <div className='my-15 px-7 space-5-y space-y-4 grid grid-rows-2 grid-cols-2 gap-x-6 gap-y-7'>
//               <Input
//                   label="Email"
//                   type="email"
//                   placeholder="Email"
//                   className=""

//                   {...register("email", {required: true})}
//                   // error={errors.email?.message}
//               />
//               <Input
//                   label="Full Name"
//                   type="text"
//                   placeholder="Enter Full Name"
//                   className=""

//                   {...register("fullName", {required: true})}
//                   // onInput={(e) => {
//                   //     setValue("fullName", slugTransform(e.currentTarget.value), {shouldValidate: true});
//                   // } }
//               />
//               <Input
//                   label="Avatar"
//                   type="file"
//                   placeholder="Upload Avatar Image"
//                   className=""
//                   // onInput={(e) => {
                  
//               // }}
//               {...register("avatar", {required: true})}
//               />
//               <Input
//                   label="Cover Image"
//                   type="file"
//                   placeholder="Upload Cover Image"
//                   className=""
//                   {...register("coverImage", {required: true})}
//               />
//               <div className='grid-cols-subgrid col-start-1 col-span-2'>
//               <Input
//                   label="Password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className=""
//                   {...register("password", {required: true})}
//               />
//               <div className='w-full py-6 flex align-middle justify-center'>
//               <Button type="submit" disabled={loading} className=''>
//                   {loading? "Saving..." : "Save Changes"}
//               </Button>
              
//               </div>
//             </div>
//           </div>
//         </form>
//     </div>
//   )
// }

// export default UserProfile;


import React, { useEffect } from 'react';
import { Input, Button } from '../index.js';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateAccount,
  updateAvatar,
  updateCoverImage,
  getChannelProfile,
  getCurrentUser
} from '../../store/authSlice.js';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Fetch current user details
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getChannelProfile());
  }, [dispatch]);

  // Pre-fill form when user data is available
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || ''
      });
    }
  }, [user, reset]);

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('fullName', data.fullName);
      formData.append('username', data.username);

      if (data.avatar?.[0]) {
        formData.append('avatar', data.avatar[0]);
        await dispatch(updateAvatar(formData));
      }

      if (data.coverImage?.[0]) {
        formData.append('coverImage', data.coverImage[0]);
        await dispatch(updateCoverImage(formData));
      }

      await dispatch(updateAccount(formData));
      dispatch(getCurrentUser()); // refresh user info
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="w-full bg-zinc-900 min-h-screen text-white">
      {/* Cover Image */}
      <div className="relative w-full h-48 bg-gray-700">
        <img
          src={user?.coverImage || ''}
          alt="cover"
          className="w-full h-full object-cover"
        />
        {/* Avatar */}
        <div className="absolute -bottom-12 left-12">
          <img
            src={user?.avatar || ''}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-12">
        <h2 className="text-2xl font-bold">@{user?.username}</h2>
        <p className="text-gray-400">{user?.fullName}</p>
        <p className="text-sm text-gray-500">
          {user?.subscribers?.length || 0} subscribers
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-8">
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Username"
            type="text"
            placeholder="Enter Username"
            {...register('username', { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            {...register('email', { required: true })}
          />
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter Full Name"
            {...register('fullName', { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: true })}
          />
          <Input
            label="Avatar"
            type="file"
            {...register('avatar')}
          />
          <Input
            label="Cover Image"
            type="file"
            {...register('coverImage')}
          />
        </div>

        <div className="w-full flex justify-center mt-8">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Subscribers & Subscriptions */}
      <div className="px-12 py-8 grid grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
          <div className="flex gap-4 flex-wrap">
            {user?.subscribers?.map((sub, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={sub.avatar}
                  alt={sub.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-sm">{sub.username}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscriptions</h3>
          <div className="flex gap-4 flex-wrap">
            {user?.subscriptions?.map((sub, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={sub.avatar}
                  alt={sub.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-sm">{sub.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {
          user?.videos?.map((vid, idx) => (
            <div className=''>
              <video src={vid.video} controls>

              </video>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default UserProfile;
