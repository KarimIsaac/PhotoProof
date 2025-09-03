import React, { useState } from 'react';
import '../Sass/notification.css'; 

const mockNotifications = [
  { id: 1, message: 'message 1' },
  { id: 2, message: 'message 2' },
  
];

const NotificationBar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [notifications] = useState(mockNotifications);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="notification-bar">
      <button onClick={togglePanel}>
        Notifications ({notifications.length})
      </button>
      {isPanelOpen && (
        
        <NotificationPanel notifications={notifications} />
      )}
    </div>
  );
};

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="notification-panel">
      {notifications.map(notification => (
        
        <div key={notification.id}>{notification.message}</div>
        
      ))}
      
    </div>
  );
};

export default NotificationBar;
