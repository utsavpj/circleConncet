import React, { useEffect, useState } from 'react'
import '../style/Message.css'

function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages from the API
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // const response = await fetch('https://api.example.com/messages');
      // const data = await response.json();

      const data = [
        {
          id: 1,
          sender: 'John',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T10:30:00'
        },
        {
          id: 2,
          sender: 'Jane',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T12:45:00'
        },
        {
          id: 3,
          sender: 'July',
          content: 'Lorem ipsum dolor sit amet asjbdhalhjsbdjhlabsdljahbsdjlahbsdjhasbdjahbsdjahsbdjahsbdjashbdjahsbdjahsbdjahsbdjahsbdjahsbdjhasbdajhsbdjhasbdjahsbdhjab...',
          timestamp: '2023-06-20T12:45:00'
        },
        {
          id: 4,
          sender: 'Jane',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T12:45:00'
        },
        {
          id: 5,
          sender: 'Jane',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T12:45:00'
        },
        {
          id: 6,
          sender: 'Jane',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T12:45:00'
        },
        {
          id: 7,
          sender: 'Jane',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T12:45:00'
        },
        {
          id: 8,
          sender: 'Jane',
          content: 'Lorem ipsum dolor sit amet...',
          timestamp: '2023-06-20T12:45:00'
        },
        // Add more message objects as needed
      ];
    
      setMessages(data);
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

  return (
    <div className="message-component">
      <div className="inbox">
        <h2 className="inbox-heading">Inbox</h2>
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