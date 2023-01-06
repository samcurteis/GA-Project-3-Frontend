import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import EntryCard from './common/EntryCard';
import { useAuthenticated } from '../hooks/useAuthenticated';
import CreateEntry from './common/CreateEntry';

import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@mui/material';

export default function CountryPage() {
  const [isLoggedIn] = useAuthenticated();
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleCountry, setSingleCountry] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleCountry(id))
      .then(({ data }) => {
        setSingleCountry(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const goToMap = () => navigate('/exploreworld');

  return (
    <>
      <Container maxWidth='lg' sx={{ display: 'flex' }}>
        <Box>
          <CardContent>
            <Typography variant='h5' component='p'>
              {singleCountry?.name}
            </Typography>
            {singleCountry && (
              <img
                loading='lazy'
                width='20'
                src={`https://flagcdn.com/w20/${singleCountry.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${singleCountry.code.toLowerCase()}.png 2x`}
                alt=''
              />
            )}
          </CardContent>
          <CardActions>
            {isLoggedIn && <CreateEntry />}
            <Button size='small' sx={{ color: '#3B3D40' }} onClick={goToMap}>
              Back to the Map!
            </Button>
          </CardActions>
        </Box>
      </Container>
      {!!singleCountry?.entries.length && (
        <Container maxWidth='lg'>
          <Box>
            {singleCountry?.entries?.map((entry) => (
              <EntryCard
                key={entry._id}
                text={entry.text}
                addedBy={entry.addedBy}
                countryId={id}
                entryId={entry._id}
                setIsUpdated={setIsUpdated}
              />
            ))}
          </Box>
        </Container>
      )}
    </>
  );
}
