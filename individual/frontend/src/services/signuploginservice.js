// apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/users';
export const signup = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email,password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`,{email:email,password:password});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addevent = async (training,startDate,endDate) => {
    try {
      console.log('hgs')
      const response = await axios.post(`${BASE_URL}/add_event`,training,startDate,endDate);
      console.log('backend',response)
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const displayevent = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/display_event`);
      return response.data;
    }catch (error) {
      throw error;
    }
  }

  export const deleteevent = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/delete_event`);
      return response.data;
    }catch (error) {
      throw error;
    }
  }

  export const sportsevent = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/sports_events`);
      return response.data;
    }catch (error) {
      throw error;
    }
  }

  export const yogaevent = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/yoga_events`);
      return response.data;
    }catch (error) {
      throw error;
    }
  }

  export const musicevent = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/music_events`);
      return response.data;
    }catch (error) {
      throw error;
    }
  }



  export const displaybookings = async() =>{
    try{
      console.log("services for bookings");
      const response = await axios.get(`${BASE_URL}/get_bookings`);
      console.log( "booking details from services ",response)
      return response.data;
    }catch (error) {
      throw error;
    }
  }



  export const bookTicketsNow = async (eventId, numberOfTickets) => {
    try {
      console.log('hgs')
      const response = await axios.post(`${BASE_URL}/book_tickets`, {
        eventId: eventId,
        numberOfTickets: numberOfTickets,
      });
      console.log('backend', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


