import React from 'react';

const GroupingOptions = ({ onGroupingChange }) => {
  return (
    <div className="grouping-options">
      <button onClick={() => onGroupingChange('status')}>Group by Status</button>
      <button onClick={() => onGroupingChange('user')}>Group by User</button>
      <button onClick={() => onGroupingChange('priority')}>Group by Priority</button>
    </div>
  );
};

export default GroupingOptions;
