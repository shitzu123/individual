// apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/users';

// Function to make a GET request to the API
// export const fetchData = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/data`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Function to make a POST request to the API
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



