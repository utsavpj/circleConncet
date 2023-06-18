import React from 'react'
import '../style/home.css'
import Feed from './Feed';
import Explore from './Explore';
import ExploreResult from './ExploreResult'

function Home() {
  const posts = [
    {
      id: 1,
      author: {
        name: 'Jill Doe',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&usqp=CAU',
      },
      content: 'Hello, this my first post!',
      timestamp: 'June 7, 2023',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dPQU09A75NZREiLKEEkY1CiI6eNkviUAFQ&usqp=CAU',
    },
    {
      id: 2,
      author: { 
      name:  "Jane Smith",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW2MAFrFnfa_bT1jSttLbmvfotJcqQyCCGg&usqp=CAU",
    },
      content: "Check out this amazing photo!",
      timestamp: "June 7, 2023",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzo4U7Px_lc84va6ahojLAaiWqB114dOvLMQ&usqp=CAU"
    },
    {
      id: 3,
      author: { 
      name:  "Alex Johnson",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
    },
      content: "Just a quick update.",
      timestamp: "June 6, 2023",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo4poLlOoBuHqD3a2Hw9SqTteE4-_sXK5ZA&usqp=CAU"
    },

  ];

  return (
    <div className="home-container">
      <div className='left-container column'>
      <h4>Profile</h4>
      </div>
      <div className='middle-container column'>
      {posts.map((post) => (
        <Feed key={post.id} post={post} />
      ))}
      </div>
      <div className='right-container column'>
      <Explore/>
      </div>
    </div>
  );
};


export default Home