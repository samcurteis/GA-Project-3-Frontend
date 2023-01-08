import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  // CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';

import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// Import required actions and qualifiers.
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

export default function UserCard({ username, cloudinaryImageId, id, entries }) {
  const navigate = useNavigate();
  const navigateToUser = () => navigate(`/users/${id}`);
  const [userImage, setUserImage] = useState(cloudinaryImageId);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  if (!userImage) {
    setUserImage('xyfrkvpysclpv4wbxzm7');
  }

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(userImage);

  // Apply the transformation.
  myImage.resize(thumbnail().width(345).gravity(focusOn(FocusOn.face()))); // Crop the image, focusing on the face.
  // Round the corners.

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToUser}>
        <AdvancedImage cldImg={myImage} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {username}
          </Typography>
          {entries?.length === 1 ? (
            <Typography variant='body2' color='text.secondary'>
              1 country visited
            </Typography>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              {entries?.length} countries visited
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
