import React, { useEffect, useState } from 'react';
import { sportsevent, yogaevent, musicevent} from '../services/signuploginservice';
import { bookTicketsNow } from '../services/signuploginservice';
import { displaybookings } from '../services/signuploginservice';
import { useNavigate } from 'react-router-dom';


function EventsPage() {
  const [sportsEvents, setSportsEvents] = useState([]);
  const [yogaEvents, setYogaEvents] = useState([]);
  const [musicEvents, setMusicEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    sportsevent()
      .then((response) => {
        setSportsEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sports events:', error);
      });

    yogaevent()
      .then((response) => {
        setYogaEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching yoga events:', error);
      });

    musicevent()
      .then((response) => {
        setMusicEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching music events:', error);
      });
  }, []);

  const [seats, setSeats] = useState({});

  const handleChange = (eventId) => (event) => {
    const newValue = event.target.value;
    setSeats((prevSeats) => ({
      ...prevSeats,
      [eventId]: newValue,
    }));
  };

  const handleDisplay = () => {
    navigate('/display_event');
  }




  const bookTickets = (eventId,noOfSeats) => {
    const numberOfTickets = seats[eventId] || 0;
    const availableSeats = noOfSeats;

    if (numberOfTickets <= 0 ) {
      alert('Please enter the value.');
      return; // Stop execution if the validation fails
    }

    if (numberOfTickets > availableSeats) {
      alert('The tickets entered should be less than available seats.');
      return; // Stop execution if the validation fails
    }

    bookTicketsNow(eventId, numberOfTickets)
      .then((response) => {
        console.log(response);
        // Handle the response from the API as needed
        alert(`You want to book ${numberOfTickets} ticket(s)`);
      })
      .catch((error) => {
        console.error('Error booking tickets:', error);
      });
  };

  const renderEventCard = (event) => {
    const startDate = event.startdate.split('T')[0];
    const endDate = event.enddate.split('T')[0];

    return (
      <div className="event-card" key={event.id}>
        <h4>
          <strong>{event.event_organizer}</strong>
        </h4>
        <p>
          <strong>Place:</strong> {event.place}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>End Date:</strong> {endDate}
        </p>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Available Seats:</strong> {event.no_of_seats}
        </p>
        <p>
          <strong>Enter Number of Tickets:</strong>
          <input
            type="number"
            placeholder="Seats"
            min="1"
            max={event.no_of_seats}
            onChange={handleChange(event.id)}
            value={seats[event.id] || ''}
          />
        </p>
        <button onClick={() => bookTickets(event.id, event.no_of_seats)}>Book Tickets</button>
      </div>
    );
  };

  return (
    <div>
      <h2>Events</h2>
      <div className="events-container">
      <button onClick={handleDisplay}>View bookings</button>
        <div className="domain-section">
          <h3 className="heading">Sports</h3>
          <div className="section">{sportsEvents.map((event) => renderEventCard(event))}</div>
        </div>
        <div className="domain-section">
          <h3 className="heading">Yoga</h3>
          <div className="section">{yogaEvents.map((event) => renderEventCard(event))}</div>
        </div>
        <div className="domain-section">
          <h3 className="heading">Music</h3>
          <div className="section">{musicEvents.map((event) => renderEventCard(event))}</div>
        </div>
      </div>
      
    </div>
  );
}

export default EventsPage;
