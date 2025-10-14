import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://localhost:7249/',
  headers: { 'Content-Type': 'application/json' },
});
