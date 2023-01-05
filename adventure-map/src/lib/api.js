import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allCountries: '/api/countries',
  singleCountry: (id) => `/api/countries/${id}`,
  allEntry: (id) => `/api/entries`,
  singleEntry: (id) => `/api/entries/${id}`,
  login: '/api/login',
  register: '/api/register',
  searchCountries: (query) => `/api/countries/search?search=${query}`,
  searchUsers: (query) => `/api/users/search?search=${query}`,
  singleUser: (id) => `/api/users/${id}`
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
