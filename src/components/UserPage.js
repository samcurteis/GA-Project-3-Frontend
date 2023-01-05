import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
import CreateEntry from './common/CreateEntry';
import ProfilePicture from './common/ProfilePicture'

import {
  Container,
  Box,
  CardActions,
  Button
} from '@mui/material';

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

  const goToMap = () => navigate('/');
  console.log(singleUser)

  return (
    <>
      <Container maxWidth='lg' sx={{ display: 'flex' }}>
        <Box>
          <ProfilePicture cloudinaryImageId={singleUser.cloudinaryImageId} />
          <CardActions>
            {isLoggedIn && (
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
        </Box>
      </Container>
    </>
  );
}
