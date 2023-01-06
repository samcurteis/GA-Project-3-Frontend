import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';

import { Container, Grid, TextField, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';

import UserCard from './common/UserCard.js';

const filter = createFilterOptions();

export default function UserIndex() {
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [users, setUsers] = useState(searchedUsers);
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    API.POST(API.ENDPOINTS.allUsers, {}, API.getHeaders())
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  useEffect(() => {
    if (query) {
      console.log('value is ' + query);
      API.POST(API.ENDPOINTS.searchUsers(query), {}, API.getHeaders())
        .then(({ data }) => {
          setSearchedUsers(data);
        })
        .catch((e) => console.log(e));
    }
  }, [query, searchedUsers]);

  useEffect(() => {
    setUsers(searchedUsers);
  }, [searchedUsers]);

  return (
    <Container maxWidth='lg'>
      <div>
        <TextField value={query} onChange={handleChange} label='Search users' />
      </div>
      <Grid container spacing={2}>
        {users?.map((user) => (
          <Grid item xs={4} key={user._id}>
            <UserCard
              username={user.username}
              cloudinaryImageId={user.cloudinaryImageId}
              id={user._id}
              entries={user.entries}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
