import React, { useState } from 'react';

const TicketBookingPage = ({ event }) => {
  const [numTickets, setNumTickets] = useState(1); // Default to booking 1 ticket
  const [availableSeats, setAvailableSeats] = useState();

  const handleTicketChange = (event) => {
    const newNumTickets = parseInt(event.target.value, 10);
    if (!isNaN(newNumTickets)) {
      setNumTickets(newNumTickets);
    }
  };

  const handleBooking = () => {
    if (numTickets <= availableSeats) {
      // Perform the booking logic here (e.g., API call to update available seats)
      // Update availableSeats state with the new available seats count
      setAvailableSeats(availableSeats - numTickets);
      alert(`Booked ${numTickets} ticket(s) for ${event.event_organizer}`);
    } else {
      alert('Not enough tickets available');
    }
  };

  return (
    <div>
      <h2>Event Details</h2>
      <p><strong>Name:</strong> {event.event_organizer}</p>
      <p><strong>Place:</strong> {event.place}</p>
      <p><strong>Start Date:</strong> {event.startDate}</p>
      <p><strong>End Date:</strong> {event.endDate}</p>
      <p><strong>Description:</strong> {event.description}</p>
      
      <div>
        <label htmlFor="numTickets">Number of Tickets:</label>
        <input
          type="number"
          id="numTickets"
          value={numTickets}
          onChange={handleTicketChange}
          min="1"
          max={event.no_of_seats}
        />
      </div>
      
      <button onClick={handleBooking}>Book Tickets</button>
      
      <p><strong>Available Seats:</strong> {availableSeats}</p>
    </div>
  );
};

export default TicketBookingPage;
