import React, { useState } from 'react'
import '../style/Posts.css'
import { postPhoto } from '../Store/Post-actions';
import { auth } from '../Firebase';

function Posts() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const userId = auth.currentUser.uid;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader()

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (event) => {
    if(event.target.value === ''){
      setCaption("")
    }
    setCaption(event.target.value);
  };

  const handlePost = () => {
    postPhoto(userId,selectedImage,caption)
    console.log(selectedImage)
    setSelectedImage(null);
    setCaption('');
  };

  return (
    <div>
    <h2 className='home-heading'>Upload a Photo</h2>
    <div className="post-uploader-container">
      
      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="selected-image" />
      )}
      <div className='upload-container'>
      <label className="upload-input">
      <i class="fa-solid fa-cloud-arrow-up"></i>Upload Photo
      <input id="upload-input" type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, image/heic, image/jpg" onChange={handleImageChange}/>
      </label>
      </div>
      <br />
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={handleCaptionChange}
      />
      <br />
      <button disabled={!selectedImage} onClick={handlePost}>
        Post
      </button>
    </div>
    </div>
  );
}


export default Posts;