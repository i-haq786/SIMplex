import React from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';

const cardStyle: React.CSSProperties = {
  minWidth: '200px',
  maxWidth: '300px',
  borderRadius: '16px',
  backdropFilter: 'blur(10px)', // Glassmorphism effect
  backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent background
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', // Box shadow
  transition: 'transform 0.2s',
};

const hoverStyle: React.CSSProperties = {
  transform: 'scale(1.05)',
};

const ShowSpecialOffers: React.FC = () => {
  const offers = [
    {
      title: 'Rs. 148',
      description: '5GB data + 100 calls',
      details: 'No roaming | Validity: 50 days',
    },
    {
      title: 'Rs. 199',
      description: '10GB data + 200 calls',
      details: 'Roaming included | Validity: 30 days',
    },
    {
      title: 'Rs. 299',
      description: '15GB data + Unlimited calls',
      details: 'No roaming | Validity: 60 days',
    },
    {
      title: 'Rs. 399',
      description: '20GB data + Unlimited calls',
      details: 'Roaming included | Validity: 90 days',
    },
    {
      title: 'Rs. 148',
      description: '5GB data + 100 calls',
      details: 'No roaming | Validity: 50 days',
    },
    {
      title: 'Rs. 199',
      description: '10GB data + 200 calls',
      details: 'Roaming included | Validity: 30 days',
    },
    {
      title: 'Rs. 299',
      description: '15GB data + Unlimited calls',
      details: 'No roaming | Validity: 60 days',
    },
    {
      title: 'Rs. 399',
      description: '20GB data + Unlimited calls',
      details: 'Roaming included | Validity: 90 days',
    },
  ];

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        {offers.map((offer, index) => (
          <Grid item key={index}>
            <Card style={cardStyle} sx={{ '&:hover': hoverStyle }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {offer.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {offer.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {offer.details}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShowSpecialOffers;
