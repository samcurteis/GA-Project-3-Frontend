import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Link to='/'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/login'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Login
            </Typography>
          </Link>
          <Link to='/register'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Register
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
