import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Admin_training from "./create_training";
import { Link } from "react-router-dom";

//import './training.css';

function Training(props) {
  const [tableData, setTableData] = useState([]);
  const [showAdminTraining, setShowAdminTraining] = useState(false);

  const handleButtonClick = () => {
    setShowAdminTraining(true);
  };
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/delete-training/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully");
        const updatedTableData = tableData.filter((item) => item.id !== itemId);
        setTableData(updatedTableData);
      } else {
        console.error("Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/training-data");
        const text = await response.text();
        console.log("Response:", text);

        if (response.ok) {
          console.log("Success");
          const data = JSON.parse(text);
          setTableData(data);
        } else {
          console.error("Error response:", text);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="maincontent">
        <div className="header">
          <div className="header-content">
            <h6>
              <i class="fa-solid fa-rectangle-list"></i> Eventzz
            </h6>
            <h6>
                <Link to="/">
                Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
              
            </h6>
          </div>
        </div>
        
       
                                           
        <div className="btn-container">
            <Link to="/create_event">
              <button className="btn">New Event <i class="fa-solid fa-plus"></i></button>
            </Link>
        </div>
        

        <div className="head">
          <h5>Events List</h5>
        </div>
        <div className="table-responsive table-responsive-sm">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Event Organizer</th>
                <th scope="col">Genre</th>
                <th scope="col">Start Date</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Date</th>
                <th scope="col">End Time</th>
                <th scope="col">Place</th>
                <th scope="col">RegisteredforEvent</th>
                <th scope="col">VacanciesLeft</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.ProjectName}</td>
                  <td>{item.Trainer}</td>
                  <td>{item.Domain}</td>
                  <td>{item.StartDate}</td>
                  <td>{item.EndDate}</td>
                  <td>{item.RegisteredUsers}</td>
                  <td>{item.VacanciesLeft}</td>
                  <td>
                    <button onClick={handleDelete}>
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Training;
