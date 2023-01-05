import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allCountries: '/api/countries',
  singleCountry: (id) => `/api/countries/${id}`,
  allEntries: (id) => `/api/entries`,
  singleEntry: (id) => `/api/entries/${id}`,
  allUsers: '/api/users',
  singleUser: (id) => `/api/users/${id}`,
  login: '/api/login',
  register: '/api/register',
  search: (query) => `/api/countries/search?search=${query}`
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
