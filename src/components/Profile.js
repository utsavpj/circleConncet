import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Store/AuthActions';

function Profile() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(logout())
  } 
  return (
    <div>
    {user.email}
    <button onClick={handleLogout}>LOG OUT</button>
    </div>
  )
}

export default Profile