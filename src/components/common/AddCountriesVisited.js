import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Box,
  Autocomplete,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { API } from '../../lib/api';

export default function AddCountriesVisited({ singleUser }) {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [formData, setFormData] = useState({
    password: '',
    countriesVisited: []
  });
  const [countriesVisitedArray, setCountriesVisitedArray] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => setAvailableCountries(data))
      .catch((e) => console.log(e));
  }, []);

  // const handleChange = (e) => {
  //   setFormFields({ ...formFields, [e.target.name]: e.target.value });
  // };

  // const handleCheckboxChange = (e) => {
  //   const value = e.target.checked === true ? e.target.id : false;
  //   setFormFields({ ...formFields, countriesVisited: [value] });
  //   console.log(e.target.checked);
  //   console.log(e.target._id);
  // };

  const handleCheckboxChange = (e) => {
    console.log(e.target);
    // const value = e.target.type === 'checkbox' ? e.target.id : e.target.value;
    // setCountriesVisitedArray([...countriesVisitedArray, value]);
    // setFormData({ ...formData, countriesVisited: countriesVisitedArray });
  };
  console.log(singleUser);

  const [error, setError] = useState(false);

  return (
    <form>
      <Container>
        <FormGroup>
          {availableCountries.map((country) => {
            return (
              <FormControlLabel
                control={<Checkbox id={country._id} />}
                onChange={handleCheckboxChange}
                label={country?.name}
                key={country._id}
                id={country._id}
                value={true}
              />
            );
          })}
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Label'
          />
        </FormGroup>
        {/* <TextField
          size='small'
          name='password'
          id='password'
          type='password'
          label='Password'
          required={true}
          value={formFields.password}
          onChange={handleChange}
          error={error}
          sx={{ mb: 2 }}
        /> */}
      </Container>
    </form>
  );
}
