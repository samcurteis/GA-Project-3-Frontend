import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Box, Autocomplete, Button } from '@mui/material';
import { API } from '../../lib/api';

export default function CreateEntry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    text: ''
  });
  const [availableCountries, setAvailableCountries] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => setAvailableCountries(data))
      .catch((e) => console.log(e));
  }, []);

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allEntries, formData, API.getHeaders())
      .then(({ data }) => {
        navigate(`/users/${data.addedBy}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  // const listOfNames = availableCountries.map((country) => country.name);

  return (
    <Container
      maxWidth='lg'
      sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
    >
      <form onSubmit={handleSubmit}>
        <Box>
          <Autocomplete
            id='country-select-demo'
            sx={{ width: 300 }}
            options={availableCountries}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
              // console.log(option);

              return (
                <Box
                  component='li'
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                  onChange={handleChange}
                >
                  <img
                    loading='lazy'
                    width='20'
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=''
                  />
                  {option.name}
                </Box>
              );
            }}
            renderInput={(params) => {
              console.log(params);

              return (
                <TextField
                  {...params}
                  label='Choose a country'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password' // disable autocomplete and autofill
                  }}
                />
              );
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.text}
            onChange={handleChange}
            error={error}
            label='Write about your visit'
            name='text'
          />
        </Box>
        <Button type='submit' sx={{ color: '#3B3D40' }}>
          ADD MY VISIT
        </Button>
      </form>
    </Container>
  );
}
