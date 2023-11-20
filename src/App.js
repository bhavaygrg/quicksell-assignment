import React, { useState, useEffect } from 'react';
import TicketComponent from './components/TicketComponent';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const [ticketsArray, setTicketsArray] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('grouping', newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
    localStorage.setItem('sorting', newSorting);
  };

  useEffect(() => {
    const storedGrouping = localStorage.getItem('grouping');
    const storedSorting = localStorage.getItem('sorting');

    setGrouping(storedGrouping || 'status');
    setSorting(storedSorting || 'priority');
  }, []);

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority;
      } else if (sorting === 'title') {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0;
      }
      return 0;
    });
  };

  const groupTickets = (tickets) => {
    if (grouping === 'status') {
      return tickets.reduce((grouped, ticket) => {
        const status = ticket.status;
        grouped[status] = [...(grouped[status] || []), ticket];
        return grouped;
      }, {});
    } else if (grouping === 'user') {
      return tickets.reduce((grouped, ticket) => {
        const user = getUserName(ticket.userId);
        grouped[user] = [...(grouped[user] || []), ticket];
        return grouped;
      }, {});
    } else if (grouping === 'priority') {
      return tickets.reduce((grouped, ticket) => {
        const priorityLabel = getPriorityLabel(ticket.priority);
        grouped[priorityLabel] = [...(grouped[priorityLabel] || []), ticket];
        return grouped;
      }, {});
    }
  };

  const getUserName = (userId) => {
    // You can retrieve the user name from the API data based on userId
    // For simplicity, assuming there's a usersArray in the state
    const user = usersArray.find((user) => user.id === userId);
    return user ? user.name : `User (${userId})`;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent (Priority level 4)';
      case 3:
        return 'High (Priority level 3)';
      case 2:
        return 'Medium (Priority level 2)';
      case 1:
        return 'Low (Priority level 1)';
      case 0:
        return 'No priority (Priority level 0)';
      default:
        return `Unknown Priority (${priority})`;
    }
  };

  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTicketsArray(data.tickets);
        setUsersArray(data.users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const sortedAndGroupedTickets = groupTickets(sortTickets(ticketsArray));

  return (
    <div className="App">
      <div>
        <Navbar
          className="navbar"
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleSortingChange}
        />
      </div>
      <div className="dashboard">
        {Object.keys(sortedAndGroupedTickets).map((groupKey) => (
          <div key={groupKey} className="divs">
            <h2>{groupKey}</h2>
            {sortedAndGroupedTickets[groupKey].map((ticket) => (
              <TicketComponent key={ticket.id} {...ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
