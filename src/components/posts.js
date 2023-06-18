import React, { useState } from 'react'

function Posts() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {selectedPhoto && (
        <div>
          <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
        </div>
      )}
    </div>
  );
}


export default Posts;