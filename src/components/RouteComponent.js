import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Nav from '../components/navbar';
import Home from '../components/Home';
import Posts from '../components/posts';
import Profile from '../components/Profile';
import Messages from '../components/Messages';
import Setting from '../components/Setting';
import Explore from '../components/Explore';
import ExploreResult from './ExploreResult';

function RouteComponent() {
  return (
    <>
    
    <Routes>
    <Route path='/' element={<Nav/>}>
      <Route index element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/post' element={<Posts/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/setting' element={<Setting/>}/>
      <Route path="/explore/:title" element={<ExploreResult/>} />
    </Route>
    </Routes>
    
    </>
  )
}

export default RouteComponent