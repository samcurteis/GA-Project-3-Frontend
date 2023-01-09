import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { API } from '../../lib/api';

export default function AddCountriesVisited({ singleUser }) {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [formData, setFormData] = useState({
    password: '',
    countriesVisited: singleUser?.countriesVisited || []
  });

  useEffect(() => {
    setFormData({ ...formData, countriesVisited: singleUser.countriesVisited });
  }, [singleUser.countriesVisited]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allCountries)
      .then(({ data }) => setAvailableCountries(data))
      .catch((e) => console.log(e));
  }, []);

  const handleCheckboxChange = (e) => {
    console.log(e.target.checked, e.target.id);
    setFormData({
      ...formData,
      countriesVisited: formData.countriesVisited.includes(e.target.id)
        ? formData.countriesVisited.filter((i) => i !== e.target.id)
        : [...formData.countriesVisited, e.target.id]
    });
    // const value = e.target.type === 'checkbox' ? e.target.id : e.target.value;
    // setCountriesVisitedArray([...countriesVisitedArray, value]);
    // setFormData({ ...formData, countriesVisited: countriesVisitedArray });
  };
  console.log(formData.countriesVisited);

  const [error, setError] = useState(false);

  return (
    <form>
      <Container>
        <FormGroup>
          {availableCountries.map((country) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.countriesVisited.includes(country._id)}
                    id={country._id}
                  />
                }
                onChange={handleCheckboxChange}
                label={country?.name}
                key={country._id}
                id={country._id}
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

// const handleChange = (e) => {
//   setFormFields({ ...formFields, [e.target.name]: e.target.value });
// };

// const handleCheckboxChange = (e) => {
//   const value = e.target.checked === true ? e.target.id : false;
//   setFormFields({ ...formFields, countriesVisited: [value] });
//   console.log(e.target.checked);
//   console.log(e.target._id);
// };
