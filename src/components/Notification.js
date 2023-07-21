import React, { useEffect, useState } from "react";
import AddFriend from "./AddFriend";
import { auth } from "../Firebase";
import { getAllUsers, getUsers } from "../Store/AuthActions";
import { getFriends, getRequests } from "../Store/Request";

function Notification() {
  const currentUserID = auth.currentUser.uid;
  const [users, setUsers] = useState([]);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
        
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    fetchUsers();

  }, [users]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const reqUsers = await getRequests(currentUserID);
        const friend = await getFriends(currentUserID);
        setRequestedUsers(reqUsers);
        setFriends(friend)
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    fetchRequests();
  }, [requestedUsers,friends]);
  

  return (
    <div className="main-notification-container">
      <div className="friend-request-container">
      <div>
      <hr></hr>
      <h4 className="heading-grow-circle">Connect Requests</h4>
      </div>
        {Object.keys(requestedUsers).length > 0 ? Object.keys(requestedUsers).map((uid) => (
          <AddFriend
            key={requestedUsers.uid}
            uid={requestedUsers[uid].uid}
            type="Confirm"
            profilePic={requestedUsers[uid].profilePic}
            name={requestedUsers[uid].name}
            username={requestedUsers[uid].username}
          />
        )) : <p className="friend-request-message">No new friend request</p>}
      </div>
      <div className="add-friend-container">
        <div>
          <hr></hr>
          <h4 className="heading-grow-circle">Grow your circle</h4>
        </div>
        {users.map((user, index) => {
          const isRequested = Object.keys(requestedUsers).includes(user.uid);
          const isFriends = Object.keys(friends).includes(user.uid);
          const isCurrentUser = user.uid === currentUserID;
          if (!isRequested && !isCurrentUser && !isFriends) {
            return (
              <AddFriend
                key={index}
                uid={user.uid}
                type="Connect"
                profilePic={user.profilePic}
                name={user.name}
                username={user.username}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Notification;
