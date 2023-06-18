import React from 'react'
import '../style/Message.css'

function Messages() {
  return (
    <div className="message">
      <div className="message-header">
        <div className="message-author">Tim hortons</div>
        <div className="message-timestamp">9:55 AM</div>
      </div>
      <div className="message-content">Is is possible to do interview at 9 AM Tommorrow</div>
    </div>
  );
  
}

export default Messages