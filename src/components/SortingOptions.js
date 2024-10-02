import React from 'react';

const SortingOptions = ({ onSortOptionChange }) => {
  return (
    <div className="sorting-options">
      <button onClick={() => onSortOptionChange('priority')}>Sort by Priority</button>
      <button onClick={() => onSortOptionChange('title')}>Sort by Title</button>
    </div>
  );
};

export default SortingOptions;
