import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Box,
  Typography,
  Grid
} from '@mui/material';
import { API } from '../../lib/api';

export default function AddCountriesVisited({ singleUser, setIsUpdated }) {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [formData, setFormData] = useState({
    password: '',
    countriesVisited: singleUser?.countriesVisited || []
  });
  const [error, setError] = useState(false);
  const [isAddCountriesOpen, setIsAddCountriesOpen] = useState(false);

  useEffect(() => {
    if (singleUser?.countriesVisited) {
      setFormData({
        ...formData,
        countriesVisited: singleUser.countriesVisited
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleUser]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => setAvailableCountries(data))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    console.log(e.target.checked, e.target.id);
    setFormData({
      ...formData,
      countriesVisited: formData.countriesVisited.includes(e.target.id)
        ? formData.countriesVisited.filter((i) => i !== e.target.id)
        : [...formData.countriesVisited, e.target.id]
    });
  };
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.PUT(
      API.ENDPOINTS.singleUser(singleUser._id),
      formData,
      API.getHeaders()
    )
      .then(() => {
        setIsUpdated(true);
        setIsAddCountriesOpen(false);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  const openAddCountries = () => setIsAddCountriesOpen(true);
  const closeAddCountries = () => setIsAddCountriesOpen(false);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!isAddCountriesOpen && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Button
            variant='contained'
            size='large'
            sx={{ color: 'black', br: 2 }}
            onClick={openAddCountries}
          >
            List the countries you've visited
          </Button>
        </Box>
      )}

      {isAddCountriesOpen && (
        <form onSubmit={handleSubmit}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  maxWidth: '80%'
                }}
              >
                {availableCountries.map((country) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.countriesVisited.includes(
                            country._id
                          )}
                          id={country._id}
                          size='small'
                        />
                      }
                      onChange={handleCheckboxChange}
                      label={
                        <Typography sx={{ fontSize: '12px', width: '100px' }}>
                          {country?.name}
                        </Typography>
                      }
                      key={country._id}
                      id={country._id}
                    />
                  );
                })}
              </Grid>
            </FormGroup>
            <TextField
              size='small'
              name='password'
              id='password'
              type='password'
              label='Confirm password'
              required={true}
              value={formData.password}
              onChange={handleChange}
              error={error}
              sx={{ mb: 2, display: 'flex' }}
            />
            <Button
              variant='contained'
              type='submit'
              sx={{ display: 'flex', color: '#3B3D40', margin: '10px' }}
            >
              UPDATE VISITED COUNTRIES
            </Button>
            <Button
              variant='contained'
              onClick={closeAddCountries}
              sx={{ display: 'flex', color: '#3B3D40', margin: '10px' }}
            >
              CANCEL
            </Button>
          </Container>
        </form>
      )}
    </Container>
  );
}
