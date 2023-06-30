import React, { useEffect, useState } from 'react'
import { getUsers } from '../Store/AuthActions';
import { auth } from '../Firebase';
import "../style/Profile.css"

function Profile() {
  const [users, setUsers] = useState({});
  const currentUserID = auth.currentUser.uid
  console.log(currentUserID)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers(currentUserID);
        setUsers(userData);
        console.log(userData)
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    fetchUsers();
  }, []);

  const user = {
    name: 'John Doe',
    username: 'johndoe',
    birthday: 'January 1, 1990',
    email: 'johndoe@example.com',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&usqp=CAU',
    posts: [
      {
        id: 1,
        content: 'Post 1',
        date: 'June 1, 2023',
        photo: 'path/to/post-photo.jpg',
        likes: 10,
        comments: 5,
        views: 100,
      },
      {
        id: 2,
        content: 'Post 2',
        date: 'June 2, 2023',
        photo: 'path/to/post-photo.jpg',
        likes: 20,
        comments: 10,
        views: 200,
      },
      {
        id: 3,
        content: 'Post 3',
        date: 'June 3, 2023',
        photo: 'path/to/post-photo.jpg',
        likes: 30,
        comments: 15,
        views: 300,
      },
    ],
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-picture">
          <img src={user.profilePicture} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>Birthday: {user.birthday}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="posts-card">
        <h3>Posts</h3>
        {user.posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <div className="post-user-info">
                <h4>{user.name}</h4>
                <p>{post.date}</p>
              </div>
              <div className="post-actions">
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
                <span>{post.views} Views</span>
              </div>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
              <img src={post.photo} alt="Post" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Profile