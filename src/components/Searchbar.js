import React from 'react'
import '../style/searchbar.css'

function Searchbar() {
  return (
    <div className='search-bar'>
    <input type='search' className='searchbar' placeholder='Search'/>
    <button className='search-btn' type='submit'><i className="fas fa-search"></i></button>
    </div>
  )
}

export default Searchbar