import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Box, Autocomplete, Button } from '@mui/material';
import { API } from '../../lib/api';

export default function SearchCountry() {
  const navigate = useNavigate();
  const [availableCountries, setAvailableCountries] = useState([]);
  const [stateCountry, setStateCountry] = useState('');

  const navigateToCountry = (id) => navigate(`/countries/${id}`);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => setAvailableCountries(data))
      .catch((e) => console.log(e));
  }, []);

  const handleCountryChange = (e, value) => {
    setStateCountry(value);
  };

  return (
    <Box>
      <Autocomplete
        id='country-select-demo'
        sx={{ width: 300 }}
        options={availableCountries}
        autoHighlight
        onChange={handleCountryChange}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            value={option.name}
            component='li'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
            id={option._id}
            onClick={navigateToCountry}
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
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Find a country'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password' // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Box>
  );
}
