import React, { useState } from 'react'
import '../style/Card.css'

function Card() {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click); 
    return(
            <div className="card-container">
            <img className="profile-picture" alt={`post`} src={`https://robohash.org/$1?set=set2&size=50x50`}/>
            <p className='user-name'><b>Utsav patel</b> upload a photo</p>
            <p>Caption</p>
            <img className="post-picture" alt={`post`} src={`https://robohash.org/$1?set=set2&size=400x400`}/>
            <div className='handle-reaction' onClick={handleClick}>
            {click ? <i class="fa-thin fa-circle-heart"></i> : <i class="fa-solid fa-circle-heart"></i>}
            </div>
            </div>
            
        )}

export default Card