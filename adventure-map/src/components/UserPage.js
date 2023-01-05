import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { AUTH } from '../lib/auth';
import CreateEntry from './CreateEntry';

import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@mui/material';

export default function UserPage() {
  const [isLoggedIn] = useAuthenticated();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(id))
      .then(({ data }) => {
        setSingleUser(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const goToMap = () => navigate('/');

  return (
    <>
      <Container maxWidth='lg' sx={{ display: 'flex' }}>
        <Box>
          <img src={singleBeer?.image} alt={singleBeer?.name} />
        </Box>
        <Box>
          <CardContent>
            <Typography variant='h5' component='p'>
              {singleBeer?.name}
            </Typography>
            <Typography color='text.secondary'>{singleBeer?.type}</Typography>
            <Typography color='text.primary' sx={{ fontSize: 18 }} gutterBottom>
              {singleBeer?.description}
            </Typography>
            <Typography color='text.secondary'>
              {singleBeer?.strength}% ABV
            </Typography>
            {singleBeer?.brewery?.name && (
              <Typography color='text.secondary'>
                Brewed by {singleBeer?.brewery?.name}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {isLoggedIn && (
              <>
                <Button size='small' sx={{ color: '#317873' }}>
                  Visited somewhere recently?
                </Button>
                <CreateEntry />
              </>
            )}
            <Button size='small' sx={{ color: '#317873' }} onClick={goToMap}>
              Back to the Map!
            </Button>
          </CardActions>
        </Box>
      </Container>
    </>
  );
}
