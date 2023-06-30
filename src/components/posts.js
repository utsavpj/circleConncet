import React, { useState } from 'react'
import '../style/Posts.css'

function Posts() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handlePost = () => {
    // Here you can perform the necessary logic to post the image with the caption
    // For example, you can send the image file and caption to a server using an API request.

    // Reset the component state after posting
    setSelectedImage(null);
    setCaption('');
  };

  return (
    <div className="post-uploader-container">
      <h3 className='fancy-h3'>Upload a Photo</h3>
      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="selected-image" />
      )}
      <div className='upload-container'>
      <label className="upload-input">
      <i class="fa-solid fa-cloud-arrow-up"></i>Upload Photo
      <input id="upload-input" type="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange}/>
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
      <button disabled={!selectedImage || !caption} onClick={handlePost}>
        Post
      </button>
    </div>
  );
}


export default Posts;