import { useEffect, useState } from 'react';
import { API } from '../lib/api';

// import { Container, Grid } from '@mui/material';

// import UserCard from './common/UserCard.js';

export default function UserIndex() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allUsers, API.getHeaders())
      .then(({ data }) => {
        setUsers(data);
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  console.log(users);

  // useEffect(() => {
  //   setUsers(searchedUsers);
  // }, [searchedUsers]);

  return (
    // <Container maxWidth='lg'>
    //   <Grid container spacing={2}>
    //     {users?.map((user) => (
    //       <Grid item xs={4} key={user._id}>
    //         <UserCard
    //           username={user.username}
    //           cloudinaryImageId={user.cloudinaryImageId}
    //           id={user._id}
    //           entries={user.entries}
    //         />
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Container>
    <div> user index page </div>
  );
}
