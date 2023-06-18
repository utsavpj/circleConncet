import React, { useEffect, useState } from 'react'
import '../style/Feed.css'
import '@fortawesome/fontawesome-free/css/all.css';

const Feed = ({ post }) => {
  const [likeCounter,setLikeCounter] = useState({isClicked:false,counter: 0})
  const [commnetCounter,setCommnetCounter] = useState({isClicked:false,counter: 0})
  const [viewCounter,setViewCounter] = useState({isClicked:false,counter: 0})
  const [isMounted, setIsMounted] = useState(false);
  const { author, content, timestamp, imageUrl } = post;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLike = () => {
    setLikeCounter({
      ...likeCounter,
      isClicked: !likeCounter.isClicked,
      counter: likeCounter.counter+1
    });
  }

  const handleComment = () => {
    setCommnetCounter({
      ...commnetCounter,
      isClicked: !commnetCounter.isClicked,
      counter: commnetCounter.counter+1
    });
  }

  const handleViews = () => {
    setViewCounter({
      ...viewCounter,
      isClicked: !viewCounter.isClicked,
      counter: viewCounter.counter+1
    });
  }
  return (
    <div className="feed-card container">
      <div className="feed-card-header">
        <img className="feed-card-avatar" src={author.avatar} alt={author.name} />
        <div className="author-info">
          <h3 className="feed-card-username">{author.name}</h3>
          <p className="feed-card-timestamp">{timestamp}</p>
        </div>
      </div>
      <p className="post-content">{content}</p>
      {imageUrl && <img className="feed-card-image" src={imageUrl} alt="Post" />}
      <div className="feed-card-actions">
        <button className="action-button feed-card-likes" onClick={handleLike}><i className= {likeCounter.isClicked ? 'fas fa-heart' : 'far fa-heart'}></i>  {likeCounter.counter}</button>
        <button className="action-button feed-card-comments" onClick={handleComment}><i className={commnetCounter.isClicked ? 'fas fa-comment' : 'far fa-comment'}></i>  {commnetCounter.counter}</button>
        <button className="action-button feed-card-views" onClick={handleViews}><i className={viewCounter.isClicked ? 'fa-regular fa-eye' : 'fa-solid fa-eye'}></i>  {viewCounter.counter}</button>
      </div>
    </div>
 
  );
};



export default Feed