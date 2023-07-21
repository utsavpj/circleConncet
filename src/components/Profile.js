import React, { useEffect, useState } from 'react'
import { getUsers } from '../Store/AuthActions';
import { auth } from '../Firebase';
import "../style/Profile.css"
import { getUserPosts } from '../Store/Post-actions';
import { getFriends } from '../Store/Request';

function Profile() {
  const [user, setUsers] = useState({});
  const [posts,setPosts] = useState([]);
  const [isPopOpen,setPopOpen] = useState(false)
  const currentUserID = auth.currentUser.uid
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers(currentUserID);
        const friendsData = await getFriends(currentUserID);
        setFriends(friendsData) 
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

  const handleFriendsCardClick = () => {
    setPopOpen(!isPopOpen)
  }



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
      <div className='friend-card' onClick={handleFriendsCardClick}>
      <h2>Friends</h2>
      </div>
      </div>
      {isPopOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <button className='close-button' onClick={handleFriendsCardClick}><i className='fa-solid fa-x'></i></button>
            <h3 className='popup-heading'>Friends List</h3>
            {Object.keys(friends).length > 0 ? Object.keys(friends).map((uid) => (
            <div key={uid} className="friendlist-card">
            <div className="friendlist-card-user-details">
              <img
                className="friendlist-card-profile-picture"
                src={friends[uid].profilePic}
                alt="Profile"
              />
            </div>
            <div className="friend-details">
            <h3>
              {friends[uid].name}{" "}
            </h3>
            <p>@{friends[uid].username}</p>
          </div>
          </div>
          )) : <p className="friend-request-message">No Friends yet</p>}
        </div>
        </div>
      )}
    
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