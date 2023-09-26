import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Admin_training from "./create_training";
import { Link } from "react-router-dom";
import { displayevent, deleteevent } from "../services/signuploginservice";
import { ToastContainer, toast } from 'react-toastify';


//import './training.css';

function Training(props) {
  const [tableData, setTableData] = useState([]);
  const [showAdminTraining, setShowAdminTraining] = useState(false);

  const handleButtonClick = () => {
    setShowAdminTraining(true);
  };
  // const handleDelete = async (itemId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5001/api/delete-training/${itemId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Item deleted successfully");
  //       const updatedTableData = tableData.filter((item) => item.id !== itemId);
  //       setTableData(updatedTableData);
  //     } else {
  //       console.error("Error deleting item");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  const handleDelete = async (itemId) => {
    const training_id = itemId
    try {
        // const response = await axios.post(`http://localhost:5000/users/dtrain`, { training_id });
        const response = await deleteevent(training_id);
        console.log(response.data.message)
        if (response.data.message === 'Training deleted successfully') {

            const updatedTableData = tableData.filter(item => item.id !== itemId);
            setTableData(updatedTableData);
            toast.success("Training deleted succesfully")
           setTimeout(()=>{
            window.location.reload()
           },1500)
        } else {
            toast.error('Error deleting item');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};

  const fetchData = async () => {
    try {
      const response = await displayevent();
      console.log('response',response)
      if (response.message = "View success") {
        setTableData(response.data);
        console.log(tableData)
      } else {
        console.error("Error response:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 

  useEffect(() => {
    

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
              {tableData.map((uData, index) => (
                <tr key={uData.id}>
                <td>{uData.id}</td>
                <td>{uData.event_organizer}</td>
                
                <td>{uData.domain} </td>
                
                <td>{(uData.startdate).split('T')[0]} </td>
                <td>{new Date((uData.startdate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} </td>
                <td>{(uData.enddate).split('T')[0]}</td>
                <td>{new Date((uData.enddate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} </td>
                <td>{uData.place}</td>
                <td>{(uData.initial_seats) - (uData.no_of_seats)}</td>
                <td>{uData.no_of_seats}</td>
                <td><button onClick={() => handleDelete(uData.id)}><i class="fa-solid fa-trash"></i></button></td>
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
