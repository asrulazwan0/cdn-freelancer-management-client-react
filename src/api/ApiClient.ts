import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

export const ApiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});