import { AUTH } from '../../lib/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../lib/api';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextareaAutosize
} from '@mui/material/';
import ProfilePicture from './ProfilePicture';

export default function EntryCard({
  text,
  addedBy,
  country,
  countryId,
  entryId,
  setIsUpdated
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [entryText, setReviewText] = useState(text);
  const navigate = useNavigate();

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const navigateToCountry = () => {
    // console.log('onclick working');
    navigate(`/countries/${country._id}`);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const saveChanges = () => {
    if (text !== entryText) {
      API.PUT(
        API.ENDPOINTS.singleEntry(countryId, entryId),
        { text: entryText },
        API.getHeaders()
      )
        .then(() => {
          toggleEditMode();
          setIsUpdated(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteReview = () => {
    API.DELETE(API.ENDPOINTS.singleEntry(countryId, entryId), API.getHeaders())
      .then(() => {
        setIsUpdated(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {addedBy?.cloudinaryImageId && (
          <ProfilePicture cloudinaryImageId={addedBy.cloudinaryImageId} />
        )}
        {country?.code && (
          <img
            loading='lazy'
            width='20'
            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
            alt=''
          />
        )}
        {addedBy ? (
          <Typography
            sx={{ fontSize: 14, textTransform: 'capitalize' }}
            color='text.secondary'
            gutterBottom
          >
            Added by {addedBy}:
          </Typography>
        ) : (
          <Typography
            sx={{ fontSize: 14, textTransform: 'capitalize' }}
            color='text.secondary'
            gutterBottom
            onClick={navigateToCountry}
          >
            {country?.name}
          </Typography>
        )}

        {isEditMode ? (
          <TextareaAutosize
            value={entryText}
            onChange={handleReviewTextChange}
            style={{ width: '100%', height: '22px' }}
          />
        ) : (
          <Typography variant='h5' component='div'>
            {text}
          </Typography>
        )}
      </CardContent>
      {(AUTH.isOwner(addedBy) || AUTH.getPayload().isAdmin) && (
        <CardActions>
          {AUTH.isOwner(addedBy) && (
            <Button
              size='small'
              sx={{ color: '#3B3D40' }}
              onClick={toggleEditMode}
            >
              {isEditMode ? 'Cancel' : 'Edit Review'}
            </Button>
          )}
          <Button
            sx={{ color: '#3B3D40' }}
            size='small'
            onClick={isEditMode ? saveChanges : deleteReview}
          >
            {isEditMode ? 'Save Changes' : 'Delete Review'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
