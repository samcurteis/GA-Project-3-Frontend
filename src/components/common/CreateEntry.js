import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Box, Autocomplete, Button } from '@mui/material';
import { API } from '../../lib/api';

export default function CreateEntry({ closeCreateEntry, setIsUpdated }) {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
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

  const handleCountryChange = (_e, value) => {
    console.log(value._id);
    setFormData({ ...formData, country: value._id });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    const cloudinaryResponse = await API.POST(
      API.ENDPOINTS.cloudinary,
      imageData
    );

    const apiReqBody = {
      ...formData,
      cloudinaryImageId: cloudinaryResponse.data.public_id
    };

    await API.POST(API.ENDPOINTS.allEntries, apiReqBody, API.getHeaders())
      .then(({ data }) => {
        navigate(`/users/${data.addedBy}`);
        closeCreateEntry();
        setIsUpdated(true);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 5
        }}
      >
        <Box>
          <Autocomplete
            id='country-select-demo'
            sx={{ width: 300 }}
            options={availableCountries}
            autoHighlight
            onChange={handleCountryChange}
            getOptionLabel={(option) => option.name}
            // getOptionSelected={(option, value) => option._id === value._id}
            renderOption={(props, option) => (
              <Box
                value={option.name}
                component='li'
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
                id={option._id}
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
                label='Choose a country'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            sx={{ width: 300 }}
            size='medium'
            type='text'
            value={formData.text}
            onChange={handleChange}
            error={error}
            label='Write about your visit'
            name='text'
          />
        </Box>
        <div>
          <TextField
            size='small'
            name='entry-picture'
            id='entry-picture'
            type='file'
            onChange={handleFileChange}
            sx={{ mb: 2 }}
          />
        </div>
        <Button
          variant='contained'
          type='submit'
          sx={{ display: 'flex', color: '#3B3D40' }}
        >
          ADD MY VISIT
        </Button>
      </Container>
    </form>
  );
}
