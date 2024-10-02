import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); 
  const [sorting, setSorting] = useState('priority'); 
  const [selectedGrouping, setSelectedGrouping] = useState('status');
  const [selectedSorting, setSelectedSorting] = useState('priority'); 
  const [displayDropdown, setDisplayDropdown] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        if (response.data && Array.isArray(response.data.tickets) && Array.isArray(response.data.users)) {
          setTickets(response.data.tickets);
          setUsers(response.data.users);
        } else {
          setError('Invalid API response structure');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch tickets and users');
      });

    const savedGrouping = localStorage.getItem('grouping');
    const savedSorting = localStorage.getItem('sorting');
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  }, []);

  const handleApplyClick = () => {
    setGrouping(selectedGrouping);
    setSorting(selectedSorting);
    localStorage.setItem('grouping', selectedGrouping); 
    localStorage.setItem('sorting', selectedSorting); 
    setDisplayDropdown(false); 
  };

  return (
    <div className="App">
      <header className="App-header">
        {}
        <div className="display-dropdown">
          <button onClick={() => setDisplayDropdown(!displayDropdown)}>
            Display
          </button>

          {displayDropdown && (
            <div className="dropdown-menu">
              {}
              <div className="dropdown-section">
                <h4>Group by</h4>
                <select value={selectedGrouping} onChange={(e) => setSelectedGrouping(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              {}
              <div className="dropdown-section">
                <h4>Sort by</h4>
                <select value={selectedSorting} onChange={(e) => setSelectedSorting(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>

              {}
              <div className="apply-section">
                <button onClick={handleApplyClick}>Apply</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {}
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} sortOption={sorting} />
    </div>
  );
};

export default App;
