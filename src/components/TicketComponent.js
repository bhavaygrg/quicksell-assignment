import React from 'react';
import './ticket.css'; // Assuming your CSS file is named styles.css

const TicketComponent = ({ id, title, type }) => {
  return (
    <div className="card">
      <div className="first">
        <h3 className="heading">{id}</h3>
        <div className="icon"></div>
      </div>
      <div className="second">
        <h2>{title}</h2>
      </div>
      <div className="third">
        <div className="exclamation-outer">
          <div className="exclamation">!</div>
        </div>
        <div>{type}</div>
      </div>
    </div>
  );
};

export default TicketComponent;
