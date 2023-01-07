import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

import { Container, Grid, TextField } from '@mui/material';

import UserCard from './common/UserCard.js';

export default function UserIndex() {
  const navigate = useNavigate();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [users, setUsers] = useState(searchedUsers);
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    setQuery('');
    setIsDropdownOpen(false);
    // console.log(users.contains(id));
    navigate(`/users/${e.target.id}`);
    console.log('handleClick acivated');
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
    if (!query) {
      setIsDropdownOpen(false);
    }

    console.log('value is ' + query);
    API.POST(API.ENDPOINTS.searchUsers(query), {}, API.getHeaders())
      .then(({ data }) => {
        setSearchedUsers(data);
        setIsDropdownOpen(true);
      })
      .catch((e) => console.log(e));
  }, [query]);

  useEffect(() => {
    setUsers(searchedUsers);
  }, [searchedUsers]);

  return (
    <Container maxWidth='lg'>
      <div>
        <TextField value={query} onChange={handleChange} label='Search users' />
        {isDropdownOpen && (
          <div>
            {searchedUsers.map((user) => (
              <p onClick={handleClick} key={user._id} id={user._id}>
                {user.username}
              </p>
            ))}
          </div>
        )}
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
