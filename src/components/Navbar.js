import React, { useState } from 'react';
import './Navbar.css';
const Navbar = ({ onGroupingChange, onOrderingChange }) => {
  const [displayType, setDisplayType] = useState('default');
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  const handleDisplayTypeChange = (event) => {
    const newDisplayType = event.target.value;
    setDisplayType(newDisplayType);
  };

  const handleGroupingChange = (event) => {
    const newGrouping = event.target.value; //CODED BY BHAVAY GARG
    setGrouping(newGrouping);
    onGroupingChange(newGrouping);
  };

  const handleOrderingChange = (event) => {
    const newOrdering = event.target.value;
    setOrdering(newOrdering);
    onOrderingChange(newOrdering);
  };

  return (
    <nav className="navbar">
      <div className="dropdown">
        <label htmlFor="displayDropdown">Display:</label>
        <select id="displayDropdown" value={displayType} onChange={handleDisplayTypeChange}>
          <option value="default">Default</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {displayType === 'custom' && (
        <div className="dropdown">
          <label htmlFor="groupingDropdown">Group By:</label>
          <select id="groupingDropdown" value={grouping} onChange={handleGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      )}

      {displayType === 'custom' && (
        <div className="dropdown">
          <label htmlFor="orderingDropdown">Order By:</label>
          <select id="orderingDropdown" value={ordering} onChange={handleOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
//CODED BY BHAVAY GARG
