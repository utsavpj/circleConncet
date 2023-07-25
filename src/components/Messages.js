import React, { useEffect, useState } from 'react'
import '../style/Message.css'
import { getFriends } from '../Store/Request';
import { auth } from '../Firebase';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isPopOpen,setPopOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('');
  const [friends, setFriends] = useState([]);
  const currentUserID = auth.currentUser.uid;

  useEffect(() => {
    // Fetch messages from the API
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const friendsData = await getFriends(currentUserID);
      setFriends(friendsData) 
    
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessages = messages.map((message) => {
        if (message.id === selectedMessage.id) {
          return {
            ...message,
            content: `${message.content}\n${newMessage}`,
          };
        }
        return message;
      });
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const handleFriendsCardClick = () => {
    setPopOpen(!isPopOpen)
  }

  const handleChatButtonClick = (uid,name,username) => {
    setMessages([{sender:name,content :uid + username}])
  }

  return (
    <div className="message-component">
      <div className="inbox">
      <div className='inbox-header'>
        <h2 className="inbox-heading">Inbox</h2>
        <div className='add-new-chat-card' onClick={handleFriendsCardClick}>
        <i class="fa-sharp fa-solid fa-plus add-new-chat"></i>
      </div>
        </div>  
        <ul className="inbox-list">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`inbox-item ${
                selectedMessage && selectedMessage.id === message.id ? 'active' : ''
              }`}
              onClick={() => handleSelectMessage(message)}
            >
              <h4 className="inbox-item-sender">{message.sender}</h4>
              <p className="inbox-item-content">{message.content}</p>
            </li>
          ))}
        </ul>
        {isPopOpen && (
          <div className="popup-container">
            <div className="popup-content">
              <button className='close-button' onClick={handleFriendsCardClick}><i className='fa-solid fa-x'></i></button>
              <h3 className='popup-heading'>Friends List</h3>
              {Object.keys(friends).length > 0 ? Object.keys(friends).map((uid) => (
              <div key={uid} className="friendlist-card">
              <div className="friendlist-card-user-details">
                <img
                  className="friendlist-card-profile-picture"
                  src={friends[uid].profilePic}
                  alt="Profile"
                />
              </div>
              <div className="friend-details">
              <h3>
                {friends[uid].name}{" "}
              </h3>
              <p>@{friends[uid].username}</p>
            </div>
            <div className="friendlist-card-button-container">
            <button className='chat-button' onClick={() => handleChatButtonClick(friends[uid].uid,friends[uid].name,friends[uid].username)}>PING</button>
          </div>
            </div>
            )) : <p className="friend-request-message">No Friends yet</p>}
          </div>
          </div>
        )}
      </div>
      <div className="chat-box">
        <h4 className='chat-box-heading'>Messages</h4>      
        {selectedMessage ? (
          <div className="chat">
            <div className="chat-header">
              <h2 className="chat-sender">{selectedMessage.sender}</h2>
            </div>
            <div className="chat-content">
              <p>{selectedMessage.content}</p>
            </div>
            <div className='chat-message-send'> 
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={handleInputChange}
                />
                <button type="submit" className="chat-submit">
                  <i class="fa-regular fa-paper-plane"></i>
                </button>
              </form>
            </div>  
          </div>
        ) : (
          <div className="chat-placeholder">Select a message to view</div>
        )}
      </div>
    </div>
  );
};

  


export default Messages