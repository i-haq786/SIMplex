import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import img from '../public/404.png';

const PageNotFound: React.FC = () => {
     React.useEffect(() => {
    document.body.style.backgroundColor = '#F4F5F5'; // Set sky blue background color
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color on component unmount
    };
  }, []);

  return (
    <Container style={{ textAlign: 'center', marginTop: '20px' }}>
      <img src={img} alt="404 Not Found" style={{ maxWidth: '600px', height: 'auto', marginTop:'70px' }} />
      <Typography variant="h3" color="red" style={{ marginTop: '60px' }}>
        Are you lost?
      </Typography>
      <Typography variant="h6" color="grey" style={{ marginTop: '10px' }}>
        404 Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="warning"
        component={Link}
        to="/"
        style={{ marginTop: '40px', textDecoration: 'none', color: 'white' }}
      >
        Go Back to Home
      </Button>
    </Container>
  );
};

export default PageNotFound;
