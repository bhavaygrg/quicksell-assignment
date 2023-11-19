import React, { useState, useEffect } from 'react';
import TicketComponent from './components/TicketComponent';
import './App.css';
import Navbar from './components/Navbar';
function App() {
  // Declare a variable to store the tickets array
  const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const [ticketsArray, setTicketsArray] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [sorting, setSorting] = useState('priority'); // Default sorting by priority
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
  
  
// Function to sort tickets based on the selected sorting criteria
const sortTickets = (tickets) => {
  return tickets.sort((a, b) => {
    if (sorting === 'priority') {
      return b.priority - a.priority;
    } else if (sorting === 'title') {
      // Ensure both titles exist before comparing
      if (a.title && b.title) {
        return a.title.localeCompare(b.title);
      }
      // If titles don't exist, maintain the original order
      return 0;
    }
    return 0;
  });
};


// Function to group tickets based on the selected grouping criteria
const groupTickets = (tickets) => {
  if (grouping === 'status') {
    // Group by status
    return tickets.reduce((grouped, ticket) => {
      const status = ticket.status;
      grouped[status] = [...(grouped[status] || []), ticket];
      return grouped;
    }, {});
  } else if (grouping === 'user') {
    // Group by user
    return tickets.reduce((grouped, ticket) => {
      const user = ticket.userId;
      grouped[user] = [...(grouped[user] || []), ticket];
      return grouped;
    }, {});
  } else if (grouping === 'priority') {
    // Group by priority
    return tickets.reduce((grouped, ticket) => {
      const priority = ticket.priority;
      grouped[priority] = [...(grouped[priority] || []), ticket];
      return grouped;
    }, {});
  }
};
  


  useEffect(() => {
    // Make a GET request to the API
    fetch(apiUrl)
      .then(response => {
        // Check if the request was successful (status code 200)
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        // Store the tickets array in the variable
        setTicketsArray(data.tickets);
      })
      .catch(error => {
        // Log any errors to the console
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once
  const sortedAndGroupedTickets = groupTickets(sortTickets(ticketsArray));
  return (
    <div className="App">
    <div>
      <Navbar className="navbar" onGroupingChange={handleGroupingChange} onOrderingChange={handleSortingChange} />

    </div>
      {/* Render the sorting and grouping controls here */}
      <div className='dashboard'>
      {Object.keys(sortedAndGroupedTickets).map((groupKey) => (
        <div key={groupKey} className='divs'>
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

/*Priority Sorting:

If the selected sorting criteria is 'priority', the function uses b.priority - a.priority. This sorts the tickets in descending order of priority, with higher priority values coming first.
Title Sorting:

If the selected sorting criteria is 'title', the function uses a.title.localeCompare(b.title). This sorts the tickets based on their titles in alphabetical order.
The localeCompare method performs a case-sensitive string comparison. It returns a negative value if a comes before b, a positive value if b comes before a, and 0 if they are equal.
To make the comparison case-insensitive, toLowerCase() is applied to both titles before using localeCompare.*/