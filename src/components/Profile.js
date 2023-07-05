import React, { useEffect, useState } from 'react'
import { getUsers } from '../Store/AuthActions';
import { auth } from '../Firebase';
import "../style/Profile.css"
import { getUserPosts } from '../Store/Post-actions';

function Profile() {
  const [user, setUsers] = useState({});
  const [posts,setPosts] = useState([])
  const currentUserID = auth.currentUser.uid

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers(currentUserID);
        setUsers(userData);
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    const fetchUserPosts = async() => {
      try{
        const userPosts = await getUserPosts(currentUserID);
        setPosts(userPosts);
      } catch(error){
        console.error('Error while fetching user posts: ',error)
      }
    }

    fetchUsers();
    fetchUserPosts();
  }, [currentUserID]);




  return (
    <div className="profile">
      <div className="profile-card">
      <h2>Profile</h2>
        <div className="profile-picture">
          <img src={user.profilePic} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>Birthday: {user.dob}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="posts-card">
        <h2>Posts</h2>
        {posts.map((post) => (
          <div className="post">
            <div className="post-header">
              <div className="post-user-info">
                <h3>{user.name}</h3>
                <p>{post.time}</p>
              </div>
              <div className="post-actions">
                <span className='post-likes'>{post.likes} <i className='fas fa-heart'/></span>
                <span className='post-comments'>{post.comments} <i className='fas fa-comment'/></span>
                <span className='post-views'>{post.views} <i className='fas fa-eye'/></span>
              </div>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
              <div className='post-photo-container'>
              <img src={post.photo} alt="Post" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Profile