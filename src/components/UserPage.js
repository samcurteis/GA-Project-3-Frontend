import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import CreateEntry from './common/CreateEntry';
import ProfilePicture from './common/ProfilePicture';
import EntryCard from './common/EntryCard';
import AddCountriesVisited from './common/AddCountriesVisited';

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
        <Container
          maxWidth='lg'
          sx={{
            display: 'flex',
            marginTop: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '60%'
            }}
          >
            {singleUser && (
              <>
                <ProfilePicture
                  cloudinaryImageId={singleUser.cloudinaryImageId}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <h2>{singleUser?.username}</h2>
                  {singleUser?.countriesVisited.length === 1 ? (
                    <p>1 country visited</p>
                  ) : (
                    <p>
                      {singleUser?.countriesVisited.length} countries visited
                    </p>
                  )}
                </Box>
              </>
            )}
          </Box>
          <CardActions
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <AddCountriesVisited
              singleUser={singleUser}
              setIsUpdated={setIsUpdated}
              isUpdated={isUpdated}
            />
            <Box>
              <Button
                size='small'
                sx={{ color: '#3B3D40', margin: '20px' }}
                onClick={goToMap}
              >
                BACK TO THE MAP
              </Button>
              <Button
                size='small'
                sx={{ color: '#3B3D40', margin: '20px' }}
                onClick={goToUsers}
              >
                BACK TO USERS
              </Button>
            </Box>
          </CardActions>
        </Container>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            {singleUser?.entries?.map((entry) => (
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
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {AUTH.isOwner(singleUser?._id) && (
              <Box
                sx={{
                  // display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {!isCreateEntryOpen && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <h2> Been somewhere new?</h2>
                    <Button
                      variant='contained'
                      size='large'
                      sx={{ color: 'black', br: 2 }}
                      onClick={openCreateEntry}
                    >
                      Write about it!
                    </Button>
                  </Box>
                )}
                {isCreateEntryOpen && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <CreateEntry
                      closeCreateEntry={closeCreateEntry}
                      setIsUpdated={setIsUpdated}
                    />
                    <Button
                      size='small'
                      sx={{ color: '#3B3D40', margin: '10px' }}
                      onClick={closeCreateEntry}
                    >
                      CANCEL
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </>
    );
  } else {
    return <p>Loading</p>;
  }
}
