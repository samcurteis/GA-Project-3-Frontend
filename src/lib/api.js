import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allCountries: `${process.env.REACT_APP_BASE_URL}/api/countries`,
  singleCountry: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/countries/${id}`,
  searchCountries: (query) =>
    `${process.env.REACT_APP_BASE_URL}/api/countries/search?search=${query}`,
  allEntries: `${process.env.REACT_APP_BASE_URL}/api/entries`,
  singleEntry: (id) => `${process.env.REACT_APP_BASE_URL}/api/entries/${id}`,
  allUsers: `${process.env.REACT_APP_BASE_URL}/api/users`,
  singleUser: (id) => `${process.env.REACT_APP_BASE_URL}/api/users/${id}`,
  searchUsers: (query) =>
    `${process.env.REACT_APP_BASE_URL}/api/users/search?search=${query}`,
  login: `${process.env.REACT_APP_BASE_URL}/api/login`,
  register: `${process.env.REACT_APP_BASE_URL}/api/register`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${AUTH.getToken()}`
  }
});

const GET = (endpoint, headers) =>
  headers ? axios.get(endpoint, headers) : axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
