import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import CreateEntry from './common/CreateEntry';
import ProfilePicture from './common/ProfilePicture';
import EntryCard from './common/EntryCard';

import { Container, Box, CardActions, Button } from '@mui/material';

export default function UserPage() {
  const [isLoggedIn] = useAuthenticated();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCreateEntryOpen, setIsCreateEntryOpen] = useState(false);

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

  const goToUsers = () => navigate('/users');

  const openCreateEntry = () => setIsCreateEntryOpen(true);
  const closeCreateEntry = () => setIsCreateEntryOpen(false);

  // console.log(AUTH.getPayload().userId);

  if (isLoggedIn) {
    return (
      <>
        <Container maxWidth='lg' sx={{ display: 'flex' }}>
          <Box>
            {singleUser && (
              <>
                <ProfilePicture
                  cloudinaryImageId={singleUser.cloudinaryImageId}
                />
                <h2>{singleUser?.username}</h2>
              </>
            )}
            <Button size='small' sx={{ color: '#3B3D40' }} onClick={goToMap}>
              BACK TO THE MAP
            </Button>
            <Button size='small' sx={{ color: '#3B3D40' }} onClick={goToUsers}>
              BACK TO USERS
            </Button>
            <CardActions>
              {AUTH.isOwner(singleUser?._id) ? (
                <>
                  {singleUser?.entries?.length === 1 ? (
                    <p>You have visited 1 country</p>
                  ) : (
                    <p>
                      You have visited {singleUser?.entries.length} countries
                    </p>
                  )}
                  <Box>
                    {!isCreateEntryOpen && (
                      <Button
                        size='small'
                        sx={{ color: '#3B3D40' }}
                        onClick={openCreateEntry}
                      >
                        WRITE ABOUT SOMEWHERE YOU'VE BEEN
                      </Button>
                    )}
                    {isCreateEntryOpen && (
                      <>
                        <CreateEntry
                          closeCreateEntry={closeCreateEntry}
                          setIsUpdated={setIsUpdated}
                        />
                        <Button
                          size='small'
                          sx={{ color: '#3B3D40' }}
                          onClick={closeCreateEntry}
                        >
                          CANCEL
                        </Button>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  {singleUser?.entries?.length === 1 ? (
                    <p>{singleUser?.username} has visited 1 country</p>
                  ) : (
                    <p>
                      {singleUser?.username} has visited{' '}
                      {singleUser?.entries.length} countries
                    </p>
                  )}
                </>
              )}
            </CardActions>
            <Box>
              {singleUser?.entries?.map((entry) => (
                <EntryCard
                  key={entry._id}
                  text={entry.text}
                  addedBy={null}
                  country={entry.country}
                  countryId={id}
                  entryId={entry._id}
                  setIsUpdated={setIsUpdated}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </>
    );
  } else {
    return <p>Uh oh! You need to be logged in to view this page</p>;
  }
}
