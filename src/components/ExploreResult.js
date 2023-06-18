import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/ExploreResult.css'

function ExploreResult() {
    const { title } = useParams();
    const [images, setImages] = useState([]);


    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await fetch(`https://api.unsplash.com/search/photos?query=${title}&per_page=10&client_id=Mt7paSI_LrmXpRhXKKM7JsIdP3DJnfR2sG-L7jnzW74`);
          const data = await response.json();
          setImages(data.results);
        } catch (error) {
          console.log(error);
        }
      };
      if (title) {
        fetchImages();
      }
    }, [title]);
  
    return (
      <div className='grid-container'>
        {images.map((image) => (
          <div className='grid-item'>
          <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    );
  };


export default ExploreResult