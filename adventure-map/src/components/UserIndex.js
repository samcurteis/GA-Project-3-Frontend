import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import { Container, Grid } from '@mui/material';

import UserCard from './common/UserCard.js';

export default function UserIndex({ searchedUsers }) {
  const [users, setUsers] = useState(searchedUsers);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allUsers)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  useEffect(() => {
    setUsers(searchedUsers);
  }, [searchedUsers]);

  return (
    <Container maxWidth='lg'>
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
