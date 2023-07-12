import React, { useEffect, useState } from "react";
import "../style/Feed.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { getUsers } from "../Store/AuthActions";
import { getPostComments, saveComment, updateCommentActions, updateLikeActions, updateViewActions } from "../Store/Post-actions";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../Store/Post-slice";
import { auth } from "../Firebase";
import { current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const Feed = ({ uid, content, photo, time, likes, views,postId }) => {
  const currentUserID = auth.currentUser.uid
  const [isAlertShown,setAlertShown] = useState(false)
  //For comments
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCounter, setCommentCounter] = useState();

  //For likes
  const [likeCounter, setLikeCounter] = useState(likes);

  //For View
  const [viewCounter, setViewCounter] = useState(views);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const likeStatus = useSelector(
    (state) => state.post.likeStatus[currentUserID]?.[uid+postId]
  );


  const [userProfiles, setUserProfiles] = useState({});

  //Fetch current user details
  useEffect(() => {
    setIsMounted(true);

    const fetchUsers = async () => {
      try {
        const userData = await getUsers(uid);
        setUser(userData);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    fetchUsers();
  }, [user]);

  //Comment function
  useEffect(() => {
  const getUserComments = async () => {
      try {
        const commentData = await getPostComments(uid,postId);
        setComments(commentData)
        setCommentCounter(commentData.length)
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
  getUserComments();
}, [comments]);

//View function
useEffect(() => {
  const updateView = async () => {
    try {
      setViewCounter((prevViews) => prevViews + 1); // Increment the viewCounter state

      // Update the view count in the database
      await updateViewActions(uid, postId, viewCounter + 1);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  if (isMounted) {
    updateView();
  }

  return () => {
    setIsMounted(false); // Set isMounted to false when the component unmounts
  };
}, [ currentUserID,uid, postId]);



  const handleLike = () => {
    if(!likeStatus){
      const updatedLikeCounter = likeCounter + 1;
      setLikeCounter(updatedLikeCounter);
      dispatch(toggleLike({ currentUserID, postId: uid + postId }));
      updateLikeActions(uid, postId, updatedLikeCounter);
    }
  };

  const handleComment = () => {
    setCommentClicked(!commentClicked);
  };

  const handleAddComment = () => {
    if (commentInput) {
      const newComment = {
        userId: currentUserID,
        postId: postId,
        comment_content: commentInput,
      };

      setComments([...comments, newComment]);
      setCommentInput('');
      setCommentCounter(commentCounter + 1);
    }

    saveComment(uid,currentUserID,postId,commentInput)
    
  };

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const profiles = {};
        for (const comment of comments) {
          if (!userProfiles[comment.uid]) {
            profiles[comment.uid] = await getUsers(comment.uid);
          }
        }
        setUserProfiles((prevState) => ({ ...prevState, ...profiles }));
      } catch (error) {
        console.error("Error getting user profiles:", error);
      }
    };
  
    fetchUserProfiles();
  }, [comments]);

  const handleView = () => {
    if(!isAlertShown){
    toast.info("View - The total number of times your post was displayed onscreen. This number is an estimate and may not be precise.")
    setAlertShown(true);
  }
    
  }
  

  return (
    <div className="feed-card container">
      <div className="feed-card-header">
        <img className="feed-card-avatar" src={user.profilePic} alt="Dummy" />
        <div className="author-info">
          <h3 className="feed-card-username">{user.name}</h3>
          <p className="feed-card-timestamp">{time}</p>
        </div>
      </div>
      <p className="post-content">{content}</p>
      <div className="feed-photo">
        {photo && <img className="feed-card-image" src={photo} alt="Post" />}
      </div>
      <div className="feed-card-actions">
        <button
          className="action-btn feed-card-likes"
          onClick={handleLike}
          disabled={likeStatus}
        >
          <i className={likeStatus ? "fas fa-heart" : "far fa-heart"}></i>{" "}
          {likeCounter}
        </button>
        <button
          className="action-btn feed-card-comments"
          onClick={handleComment}
        >
          <i
            className={commentClicked ? "fas fa-comment" : "far fa-comment"}
          ></i>{" "}
          {commentCounter}
        </button>
        <button className="action-btn feed-card-views" onMouseOverCapture={handleView}>
          <i className={"fa-solid fa-eye"}></i>{viewCounter}{" "}
        </button>
      </div>
      {commentClicked && (
        <div>
        <div className="comment-container">
          <input
            type="text"
            value={commentInput}
            className="comment-section"
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
          />
          <button className="comment-button" onClick={handleAddComment}>Post</button>
        </div>
        {comments.map((comment) => 
          <div className="comment-box">
          <img className="profile-pic" src={userProfiles[comment.uid]?.profilePic} alt={comment.uid} />
          <p className="comment-content">{comment.content}</p>
          </div>
        )}
        </div>
      )}
      


    </div>
  );
};

export default Feed;
