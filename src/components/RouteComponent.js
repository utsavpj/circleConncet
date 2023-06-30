import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Posts from "../components/posts";
import Profile from "../components/Profile";
import Messages from "../components/Messages";
import Setting from "../components/Setting";
import ExploreResult from "./ExploreResult";
import Reset from "./Reset";
import Login from "./Login";
import Navbar from "../components/navbar";
import Signup from "./Signup";
import { useSelector } from "react-redux";

function RouteComponent() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <Routes>
    {isLoggedIn ? (
      <Route path="/" element={<Navbar />}>
        <Route index path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/explore/:title" element={<ExploreResult />} />
        <Route path="/explore/:title" element={<ExploreResult />} />
      </Route>
    ) : (
      <Route path="/" element={<Login />} />
    )}
    <Route path="/reset" element={<Reset />} />
    <Route path="/register" element={<Signup />} />
    
  </Routes>
  ); 
}

export default RouteComponent;
