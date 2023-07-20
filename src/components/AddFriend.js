import React, { useState } from "react";
import "../style/Addfriend.css";
import { cancelRequest, confirmRequest, removeRequest, sendRequest } from "../Store/Request";
import { auth } from "../Firebase";

function AddFriend(props) {
  const [isAddBtnClicked,setAddBtnClick] = useState(false); 
  const [isCancelBtnClicked,setCancelBtnClick] = useState(false);
  const currentUserID = auth.currentUser.uid
  
  //To Accept friend request
  const handleConfirm = (SendUserid) => {
    if(!isAddBtnClicked){
      const isConnected = confirmRequest(currentUserID, SendUserid);

      if (isConnected) {
        setTimeout(() => {
          cancelRequest(currentUserID, SendUserid); // Call removeRequest after 2 seconds
        }, 2000); // Delay in milliseconds (2 seconds)
      }

        setAddBtnClick(true)
    }
  } 

  //To Send frind request
  const handleConnect = (SendUserid) => {
    if(!isAddBtnClicked){
        sendRequest(currentUserID,SendUserid)
        setAddBtnClick(true)
    }
  } 

  const handleConnectCancel = async(SendUserid) => {

    try {
      setCancelBtnClick(true); // Start the animation
      await cancelRequest(currentUserID, SendUserid);
      // Request successfully removed
    } catch (error) {
      // Handle the error if the request removal fails
      console.error("Error removing request:", error);
    } finally {
      setCancelBtnClick(false); // Stop the animation
    }
  };
        

  const handleRequestCancel = (SendUserid) => {
    if(isAddBtnClicked){
    removeRequest(currentUserID,SendUserid)
    setAddBtnClick(false)
    }
}
 
  return (
    <>
      <div className="add-friend-card-container">
      <div className="add-friend-card">
        <div className="notification-user-details">
          <img
            className="notification-profile-picture"
            src={props.profilePic}
            alt="Profile"
          />
          {props.type === "Confirm" ? (
            <div className="friend-details">
              <h3>
                {props.name}{" "}
                <span className="senetence">wants to join your circle</span>
              </h3>
              <p>@{props.username}</p>
            </div>
          ) : (
            <div className="friend-details">
              <h3>
                {props.name}{" "}
                <span className="senetence">
                  on CircleConnect
                </span>
              </h3>
              <p>@{props.username}</p>
            </div>
          )}
        </div>
        {props.type === "Confirm" && (
        <div className="friend-actions">
        <button className={isAddBtnClicked ? "sent-button" : "add-friend-button"} onClick={() => handleConfirm(props.uid)}>{isAddBtnClicked ? "Connected" : props.type}</button>
        <button className="cancel-button" onClick={() => handleConnectCancel(props.uid)}>Cancel</button>
        </div>
        )}
        {props.type === "Connect" && (
            <div className="friend-actions">
            <button className={isAddBtnClicked ? "sent-button" : "add-friend-button"} onClick={() => handleConnect(props.uid)}>{isAddBtnClicked ? "Requested" : props.type}</button>
            <button className="cancel-button" onClick={() => handleRequestCancel(props.uid)}>Cancel</button>
            </div>
        )}
      </div>
      </div>
    </>
  );
}

export default AddFriend;
