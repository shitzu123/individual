import React, { useEffect, useState } from 'react';
import { sportsevent, yogaevent, musicevent} from '../services/signuploginservice';
import { displaybookings } from '../services/signuploginservice';


function DisplayEventsPage() {
  const [DisplayEvents, SetDisplayEvents] = useState([]);

  useEffect(() => {
    displaybookings()
      .then((response) => {
        SetDisplayEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sports events:', error);
      });
  }, []);

  const renderEventCard = (event) => {
    const startDate = event.admin_training.startdate.split('T')[0];
    const endDate = event.admin_training.enddate.split('T')[0];

    return (
      <div className="event-card" key={event.id}>
        <h4>
          <strong>{event.admin_training.event_organizer}</strong>
        </h4>
        <p>
          <strong>Place:</strong> {event.admin_training.place}
        </p>
        <p>
          <strong>Start Date:</strong> {admin_training.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {admin_training.endDate}
        </p>
        <p>
          <strong>Description:</strong> {event.admin_training.description}
        </p>
        <p>
          <strong>Available Seats:</strong> {event.admin_training.no_of_seats}
        </p>
        <p>
          <strong>Enter Number of Tickets:</strong>{event.numberOfTickets}
        </p>
      </div>
    );
  };

  return (
    <div>
      <h2>Events</h2>
      <div className="events-container">
        <div className="domain-section">
          <div className="section">{DisplayEvents.map((event) => renderEventCard(event))}</div>
        </div>
      </div>
      
    </div>
  );
}

export default DisplayEventsPage;
