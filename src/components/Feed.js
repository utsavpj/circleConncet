import React, { useEffect, useState } from "react";
import "../style/Feed.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { getUsers } from "../Store/AuthActions";
import { updateLikeActions } from "../Store/Post-actions";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../Store/Post-slice";

const Feed = ({ uid, content, photo, time, likes, comments, views }) => {
  //For comments
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [v_comments, setComments] = useState([]);
  const [commentCounter, setCommentCounter] = useState(v_comments.length);

  //For likes
  const [likeCounter, setLikeCounter] = useState(likes);

  //For View
  const [viewCounter, setViewCounter] = useState(views);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const likeStatus = useSelector(
    (state) => state.post.likeStatus[uid]?.[uid + content]
  );

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

  useEffect(() => {
    // This effect will be triggered whenever `likeCounter` changes
    // Call `updateLikeActions` here to ensure it has the latest `likeCounter` value
    updateLikeActions(uid, content, likeCounter, viewCounter);
  }, [likeCounter, viewCounter]);

  const handleLike = () => {
    if (!likeStatus) {
      setLikeCounter(likeCounter + 1);
      dispatch(toggleLike({ uid, postId: uid + content }));
      updateLikeActions(uid, content, likeCounter, viewCounter);
    }
    console.log(likeStatus);
  };

  const handleComment = () => {
    setCommentClicked(!commentClicked);
  };

  const handleAddComment = () => {
    if (commentInput) {
      const newComment = {
        id: v_comments.length + 1,
        content: commentInput,
      };

      setComments([...comments, newComment]);
      setCommentInput('');
      setCommentCounter(commentCounter + 1);
    }
  };





  const handleViews = () => {

  };
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
        <button className="action-btn feed-card-views" onClick={handleViews}>
          <i className={"fa-solid fa-eye"}></i> {viewCounter}
        </button>
      </div>
      {commentClicked && (
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
      )}
      {v_comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))}
    </div>
  );
};

export default Feed;
