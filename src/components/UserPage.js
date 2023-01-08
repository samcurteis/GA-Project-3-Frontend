import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import CreateEntry from './common/CreateEntry';
import ProfilePicture from './common/ProfilePicture';
import EntryCard from './common/EntryCard';

import { Container, Box, CardActions, Button, Typography } from '@mui/material';

export default function UserPage() {
  const [isLoggedIn] = useAuthenticated();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.POST(API.ENDPOINTS.singleUser(id), {}, API.getHeaders())
      .then(({ data }) => {
        setSingleUser(data);
      })
      .catch(({ message, response }) => {
        console.log(response);
        console.log(message);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const goToMap = () => navigate('/exploreworld');

  console.log(singleUser?._id)

  return (
    <>
      <Container maxWidth='lg' sx={{ display: 'flex' }}>
        <Box>
          {singleUser?.cloudinaryImageId && (
            <ProfilePicture cloudinaryImageId={singleUser.cloudinaryImageId} />
          )}
            {AUTH.isOwner(singleUser?._id) ? (
              <Typography>Tell us about yourself</Typography>
            ) : (
              <Typography>description</Typography>
            )}
            {/* add in description to fill out the empty void in userpages */}
          <CardActions>
            {isLoggedIn && AUTH.isOwner(singleUser?._id) && (
              <>
                <Box>
                  <p> Visited somewhere recently?</p>
                  <CreateEntry />
                </Box>
              </>
            )}
            <Button size='small' sx={{ color: '#3B3D40' }} onClick={goToMap}>
              Back to the Map!
            </Button>
          </CardActions>
          <Box>
            {singleUser?.entries?.map((entry) => {
              return (
                <EntryCard
                  key={entry._id}
                  text={entry.text}
                  addedBy={null}
                  userId={singleUser?._id}
                  userpic={null}
                  country={entry.country}
                  countryId={entry.country?._id}
                  entryId={entry._id}
                  setIsUpdated={setIsUpdated}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
}
