import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allCountries: '/api/countries',
  singleCountry: (id) => `/api/countries/${id}`,
  searchCountries: (query) => `/api/countries/search?search=${query}`,
  allEntries: (id) => `/api/entries`,
  singleEntry: (id) => `/api/entries/${id}`,
  allUsers: '/api/users',
  singleUser: (id) => `/api/users/${id}`,
  searchUsers: (query) => `/api/users/search?search=${query}`,
  login: '/api/login',
  register: '/api/register',
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${AUTH.getToken()}`
  }
});

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
