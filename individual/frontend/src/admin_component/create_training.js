import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './style.scss'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';


import View_training from './view_trainings';
import Archieve from './archieve';




function MyFormModal(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [training, setTraining] = useState({
        organizer_name: '',
        Place: '',
        skill: '',
        description: '',
        Genre: 'Sports', // Default domain value
        seats: 1, // Default seats value
    });

    const handleSubmit = async (e) => {
        console.log("abcd check", startDate, endDate)
        console.log("working", training);
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/data', training, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Scheduled training:', response.data);
            } else {
                console.error('Set training failed');
            }
        } catch (error) {
            console.error('Registering error:', error);
        }
    };

    return (
        <>


            <div className="train">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-xs">
                            <form onSubmit={handleSubmit}>
                                <div className="head">
                                    <div className="header-content">
                                        <h5>
                                            Create Event
                                        </h5>
                                        <Link to="/view_event">
                                            <button className="btn btns"><i class="fa-solid fa-x"></i></button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="trainingName">Event Organizer</label>
                                    <input
                                        type="text"
                                        id="trainingName"
                                        placeholder="Event Name"
                                        value={training.training_name}
                                        onChange={(e) =>
                                            setTraining({ ...training, training_name: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="trainer">Place</label>
                                    <input
                                        type="text"
                                        id="trainer"
                                        placeholder="Trainer"
                                        value={training.trainer}
                                        onChange={(e) =>
                                            setTraining({ ...training, trainer: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                {/* <div className="form-group">
            <label for="skillTitle">Skill Title</label>
            <input
              type="text"
              id="skillTitle"
              placeholder="Title"
              value={training.skill}
              onChange={(e) =>
                setTraining({ ...training, skill: e.target.value })
              }
              required
            />
          </div> */}
                                <div className="form-group">
                                    <label for="description">Description</label>
                                    <textarea
                                        id="description"
                                        placeholder="Leave a comment here"
                                        value={training.description}
                                        onChange={(e) =>
                                            setTraining({ ...training, description: e.target.value })
                                        }
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label for="domain">Genre</label>
                                    <select
                                        id="domain"
                                        value={training.domain}
                                        onChange={(e) =>
                                            setTraining({ ...training, domain: e.target.value })
                                        }
                                        required
                                    >
                                        <option value="">Select One</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Music&Dance">Music & Dance</option>
                                        <option value="Health">Yoga</option>
                                        <option value="Food">Food Festival</option>
                                    </select>
                                </div>
                                <div className="form-group date-picker-container">
                                    <div className="date-picker">
                                        <label htmlFor="startDate">Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => {
                                                setStartDate(date);
                                                setTraining({ ...training, startDate: date });
                                            }}
                                            dateFormat="Pp"
                                            showTimeSelect
                                            timeFormat="p"
                                            minDate={new Date()}
                                            required
                                        />
                                    </div>
                                    <div className="date-picker">
                                        <label htmlFor="endDate">End Date</label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => {
                                                setEndDate(date);
                                                setTraining({ ...training, endDate: date });
                                            }}
                                            dateFormat="Pp"
                                            showTimeSelect
                                            timeFormat="p"
                                            minDate={startDate}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="seats">No of Seats</label>
                                    <input
                                        type="number"
                                        id="seats"
                                        placeholder="Seats"
                                        min="1"
                                        max="99"
                                        value={training.seats}
                                        onChange={(e) =>
                                            setTraining({ ...training, seats: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <Button type="submit" className="button_" name="Submit">
                                    Submit
                                </Button>
                                <Button className="button_" onClick={props.onHide}>
                                    Close
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default function Admin_training() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className='maincontent'>
                <div className="row">

                    <div className="container">
                        {/* <div className="col-lg-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3>New Training</h3>
                                            </div>
                                            <div className="card-body">
                                                <p className='card-text'>"Effortlessly create and customize training sessions for your team's growth and development needs"</p>
                                                <Button className='schedule' variant="primary" onClick={() => setModalShow(true)}>
                                                    Schedule  <i className="fa-regular fa-calendar"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div> */}

                    </div>
                </div>
            </div>



            <MyFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {/* </div> */}

        </>
    )
}
