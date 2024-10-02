import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, users = [], groupingCriteria }) => {
  const user = users.find(u => u.id === ticket.userId);

  const statusIconPath = `/icons/status-${ticket.status.toLowerCase().replace(' ', '')}`;
  const priorityIconPath = `/icons/priority-${ticket.priority === 4 ? 'urgent' : ticket.priority === 3 ? 'high' : ticket.priority === 2 ? 'medium' : ticket.priority === 1 ? 'low' : 'nopriority'}`;
  const userIconPath = user ? `/icons/user-${ticket.userId}` : null; 

  return (
    <div className="ticket-card">
      {}
      <div className="ticket-grouping-icon">
        {groupingCriteria === 'status' && <img src={statusIconPath} alt="Status Icon" />}
        {groupingCriteria === 'priority' && <img src={priorityIconPath} alt="Priority Icon" />}
        {groupingCriteria === 'user' && user && <img src={userIconPath} alt="User Icon" />}
      </div>

      {}
      <div className="ticket-content">
        <h3>{ticket.title}</h3>
        {}
        <div className="ticket-icons">
          {groupingCriteria !== 'status' && <img src={statusIconPath} alt="Status Icon" />}
          {groupingCriteria !== 'priority' && <img src={priorityIconPath} alt="Priority Icon" />}
          {groupingCriteria !== 'user' && user && <img src={userIconPath} alt="User Icon" />}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
