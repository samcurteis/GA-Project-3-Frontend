import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import EntryCard from './common/EntryCard';
import { useAuthenticated } from '../hooks/useAuthenticated';

import {
  Container,
  TextField,
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
  const [formData, setFormData] = useState({
    country: id,
    text: ''
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allEntries, formData, API.getHeaders())
      .then(() => {
        setIsUpdated(!isUpdated);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

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
      <Typography
        variant='h2'
        component='p'
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
        className='importantTitles'
      >
        {singleCountry?.name}
      </Typography>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <Box>
          <CardContent>
            {singleCountry && (
              <img
                loading='lazy'
                width='200'
                src={`https://www.worldatlas.com/r/w425/img/flag/${singleCountry.code.toLowerCase()}-flag.jpg`}
                srcSet={`https://www.worldatlas.com/r/w425/img/flag/${singleCountry.code.toLowerCase()}-flag.jpg 2x`}
                alt={`${singleCountry.name}`}
              />
            )}
          </CardContent>
          <CardActions>
            <Button size='small' sx={{ color: '#3B3D40' }} onClick={goToMap}>
              Back to the Map!
            </Button>
          </CardActions>
        </Box>
        {isLoggedIn && (
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: 300 }}
                size='medium'
                type='text'
                value={formData.text}
                onChange={handleChange}
                error={error}
                label='Write about this country'
                name='text'
              />
            </Box>
            <Button type='submit' sx={{ color: '#173042' }}>
              ADD MY VISIT
            </Button>
          </form>
        )}
      </Container>
      <Container maxWidth='lg'>
        {!!singleCountry?.entries.length && (
          <Box>
            {singleCountry?.entries?.map((entry) => (
              <EntryCard
                key={entry._id}
                text={entry.text}
                addedBy={entry.addedBy.username}
                countryId={id}
                entryPic={entry.cloudinaryImageId}
                userpic={entry.addedBy.cloudinaryImageId}
                entryId={entry._id}
                setIsUpdated={setIsUpdated}
              />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
