import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelProfile } from "../../store/slices/authSlice";
import { getUserChannelSubscriber } from "../../store/slices/subscriptionSlice";
import { useParams, useNavigate, replace } from "react-router-dom";
import { PlaylistGrid } from "../index.js";

const UserChannel = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, profile } = useSelector((state) => state.auth);
  const { subscribers, totalSubscribers, loading } = useSelector(
    (state) => state.subscription
  );

  const { username: channelUsername } = useParams();

  const currChannelName = channelUsername || user?.username;

  useEffect(() => {
    if (profile?._id) {
      dispatch(getUserChannelSubscriber(profile._id));
    }
  }, [dispatch, profile?._id]);

  useEffect(() => {
    if (currChannelName) {
      dispatch(getChannelProfile(currChannelName));
    }
  }, [dispatch, currChannelName]);

  useEffect(() => {
    if (!channelUsername && user?.username) {
      navigate(`/channel/${user.username}`, {replace: true});
    }
  }, [channelUsername, user.username, navigate])

  if (!profile) return <div>Loading channel...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
       {console.log(profile)
       }
      {/* COVER */}
      <div className="relative">
        <img
          src={profile.coverImage || "/cover.png"}
          className="h-48 w-full object-cover rounded-xl"
        />
      </div>
   
      {/* HEADER */}
      <div className="flex items-center gap-6 mb-8 mt-4">
        <img
          src={profile.avatar || "/avatar.png"}
          className="w-24 h-24 rounded-full"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{profile.fullName}</h1>
          <p className="text-gray-500">@{profile.username}</p>
          <p className="mt-1 text-sm">
            {profile.subscribersCount} subscribers
          </p>
        </div>

        <button className="px-6 py-2 rounded bg-red-600 text-white">
          {profile.isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      {/* SUBSCRIBERS */}
      <h2 className="text-xl font-semibold mb-4">Subscribers</h2>

      {loading ? (
        <p>Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {subscribers.map((sub) => (
            <div key={sub._id} className="p-4 shadow rounded-lg">
              <img
                onClick={() => navigate(`/channel/${sub.username}`)}
                src={sub.avatar}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h3 className="text-center font-semibold mt-2">
                {sub.fullName}
              </h3>
              <p className="text-center text-sm text-gray-500">
                @{sub.username}
              </p>
            </div>
          ))}
        </div>
      )}

      <div>
        <PlaylistGrid userId={profile._id} />
      </div>
    </div>
  );
};

export default UserChannel;
