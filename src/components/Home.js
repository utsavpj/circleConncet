import React, { useEffect, useState } from "react";
import "../style/home.css";
import Feed from "./Feed";
import Explore from "./Explore";
import { getAllPosts } from "../Store/Post-actions";
import { auth } from "../Firebase";

function Home() {
  const [posts, setPosts] = useState([]);
  const currentUserID = auth.currentUser.uid;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await getAllPosts();
        setPosts(userPosts);
      } catch (error) {
        console.error("Error while fetching user posts: ", error);
      }
    };

    fetchUserPosts();
  }, [posts]);

  return (
    <div className="home-container">
      <div className="left-container column">
        <h4>Profile</h4>
      </div>
      <div className="middle-container column">
        <h4>Feed</h4>
        {posts.map((post) =>
          Object.entries(post).map(
            ([key, value]) =>
              currentUserID && (
                <Feed
                  key={key}
                  uid={value.uid}
                  content={value.content}
                  photo={value.photo}
                  time={value.time}
                  likes={value.likes}
                  views={value.views}
                  comments={value.comments}
                />
              )
          )
        )}
      </div>
      <div className="right-container column">
        <Explore />
      </div>
    </div>
  );
}

export default Home;
