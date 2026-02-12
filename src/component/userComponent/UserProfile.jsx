
import React, { useEffect } from 'react';
import { Input, Button } from '../index.js';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  updateAccount,
  updateAvatar,
  updateCoverImage,
  getChannelProfile,
  getCurrentUser,
  getWatchHistory
} from '../../store/slices/authSlice.js';

import {resetSubscriptionState} from '../../store/slices/subscriptionSlice.js'

const UserProfile = () => {
  const dispatch = useDispatch();
  const {user, loading, profile} = useSelector((state) => state.auth);

  
  const {subscribers, subscriptions, totalSubscribers, totalChannels, isSubscribed} = useSelector((state) => state.subscription );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  // if store don't give current user then by getCurrentUser() we get user
  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (user?.username) {
      dispatch(getChannelProfile(user.username));
    }
  }, [dispatch, user?.username])

  // // Pre-fill form when user data is available
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        password: user.password || '',
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
      formData.append('password', data.password);

      if (data.avatar?.[0]) {
        formData.append('avatar', data.avatar[0]);
        await dispatch(updateAvatar(formData));
      }

      if (data.coverImage?.[0]) {
        formData.append('coverImage', data.coverImage[0]);
        await dispatch(updateCoverImage(formData));
      }

      await dispatch(updateAccount(formData));
      await dispatch(getCurrentUser()); // refresh user info
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="w-full m-6 bg-zinc-900 min-h-screen text-white">
      {/* Cover Image */}
      <div className="relative w-full h-48 bg-gray-700">
        {profile?.coverImage && (
          // <Link >
          // </Link>
        <img
          src={profile.coverImage}
          alt="cover"
          className="w-full h-full object-cover"
        />
        )}
        {/* Avatar */}
        <div className="absolute -bottom-12 left-12">
          {profile?.avatar && (
            // <Link>
            // </Link>
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-12">
        <h2 className="text-2xl font-bold">@{profile?.username}</h2>
        <p className="text-gray-400">{profile?.fullName}</p>
        <p className="text-sm text-gray-500">
          {totalSubscribers || 0} subscribers
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
            error={errors.username}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            {...register('email', { required: true })}
            error={errors.email}
          />
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter Full Name"
            {...register('fullName', { required: true })}
            error={errors.fullName}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: true })}
            error={errors.password}
          />
          <Input
            label="Avatar"
            type="file"
            {...register('avatar')}
            error={errors.avatar}
          />
          <Input
            label="Cover Image"
            type="file"
            {...register('coverImage')}
            error={errors.coverImage}
          />
        </div>

        <div className="flex justify-center mt-8">
          <Button type="submit" disabled={loading} className='p-3'>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Subscribers & Subscriptions */}
      <div className="px-12 py-8 grid grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribers</h3>
          <div className="flex gap-4 flex-wrap">
            {subscribers?.length > 0 && subscribers?.map((sub, idx) => (
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
            {profile?.subscribedTo?.length > 0 && profile?.subscribedTo?.map((sub, idx) => (
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

    </div>
  );
};

export default UserProfile;
