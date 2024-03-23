import React, { useEffect, useState } from "react";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../utils";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);

  const uri = "/posts/get-user-post/" + id;

  const getPosts = async () => {
    await fetchPosts(user.token, dispatch, uri);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await getPosts();
  };

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });

    await getPosts();
  };

  const getUser = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
  }, [id]);

  return (
    <>
      <div className='w-full h-screen px-0 pb-20 overflow-hidden lg:px-10 2xl:px-40 bg-bgColor lg:rounded-lg'>
        <TopBar />
        <div className='flex w-full h-full gap-2 pt-5 pb-0 lg:gap-4 md:pb-10'>
          {/* LEFT */}
          <div className='flex-col hidden w-1/3 gap-6 overflow-y-auto lg:w-1/4 md:flex md:pl-4 lg:pl-0'>
            <ProfileCard user={userInfo} />

            <div className='block lg:hidden'>
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>
          {/* CENTER */}
          <div className='flex flex-col flex-1 h-full gap-6 pl-4 overflow-y-auto  bg-orimary'>
            <div className='block md:hidden'>
              <ProfileCard user={userInfo} />
            </div>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className='flex items-center justify-center w-full h-full'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )}
          </div>
          -{/* RIGHT */}
          <div className='flex-col hidden w-1/4 h-full gap-8 overflow-y-auto lg:flex'>
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;