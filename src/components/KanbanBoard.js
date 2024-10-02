import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const PRIORITY_ORDER = [0, 4, 3, 2, 1]; 
const PRIORITY_LABELS = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

const groupTickets = (tickets, users, grouping) => {
  if (!Array.isArray(tickets)) return {};

  return tickets.reduce((groups, ticket) => {
    let group;
    if (grouping === 'user') {
      group = users.find(user => user.id === ticket.userId)?.name || 'Unknown User';
    } else if (grouping === 'priority') {
      group = PRIORITY_LABELS[ticket.priority] || 'Unknown Priority';
    } else {
      group = ticket[grouping] || 'Uncategorized';
    }

    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(ticket);
    return groups;
  }, {});
};

const sortTickets = (tickets, sortOption) => {
  if (!Array.isArray(tickets)) return [];

  if (sortOption === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  } else if (sortOption === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

const KanbanBoard = ({ tickets, users, grouping, sortOption }) => {
  const groupedTickets = groupTickets(tickets, users, grouping);
  const sortedTickets = Object.keys(groupedTickets).reduce((acc, key) => {
    acc[key] = sortTickets(groupedTickets[key], sortOption);
    return acc;
  }, {});

  const priorityOrder = PRIORITY_ORDER.map(priority => PRIORITY_LABELS[priority]);

  return (
    <div className="kanban-board">
      {grouping === 'priority' &&
        priorityOrder.map(group => (
          <div className="kanban-column" key={group}>
            <h2>{group} ({sortedTickets[group]?.length || 0})</h2>
            {sortedTickets[group]?.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))
      }

      {grouping !== 'priority' &&
        Object.keys(sortedTickets).map(group => (
          <div className="kanban-column" key={group}>
            <h2>{group} ({sortedTickets[group].length})</h2>
            {sortedTickets[group].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))
      }
    </div>
  );
};

export default KanbanBoard;
