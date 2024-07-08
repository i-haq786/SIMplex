import React from 'react';
import { Box,Typography } from '@mui/material';
import thankYouImage from '../public/thanks.png'; 

const ThankYou: React.FC = () => {
     React.useEffect(() => {
    document.body.style.backgroundColor = '#F0F0F0'; // Set sky blue background color
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color on component unmount
    };
  }, []);

    return (
        <>
         <Typography variant="h6" color="purple" style={{ marginTop: '30px', textAlign:'center' }}>
            Successfully Signed out! <br/> You may close this tab!
         </Typography>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
                backgroundColor: '#f0f0f0', // Example background color
            }}
        >
            <img src={thankYouImage} alt="Thank You" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Box>
         
        </>
    );
};

export default ThankYou;
