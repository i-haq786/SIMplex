import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableRow, Paper,Card,CardContent } from '@mui/material';

// // Notes for develpers/scope of improvement
// {  long errors affect alignment
// }

const SimDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [serviceNumber, setServiceNumber] = useState<string>('');
  const [simNumber, setSimNumber] = useState<string>('');
  const [simStatus, setSimStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();
    setLoading(true);
    setError(null);
    setSimStatus(null); // Clear previous table output

    axios.get(`http://localhost:1001/api/simDetails/validateSim/serviceNumber/${serviceNumber}/simNumber/${simNumber}`)
      .then(response => {
        const responseData = response.data;

        // Check if responseData includes '404' (assuming '404' is part of error message)
        if (responseData.includes('404')) {
          throw new Error(responseData); // Simulate handling 404 error
        }

        setSimStatus(responseData); // Update simStatus state with the extracted status
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const { description, message } = error.response.data;
          setError(`Error: \nDescription: ${description} \n\nMessage: ${message}`);
        } else {
          setError(error.message); // Handle other errors
        }
        setLoading(false);
        setServiceNumber('');
        setSimNumber('');
        setSimStatus('');
      });
  };

  const isFormValid = () => {
    return serviceNumber.trim() !== '' && simNumber.trim() !== '';
  };

  return (
    <Container   sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
         <Card
      sx={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        mt: 5
      }}
    >
    <CardContent>
      <Typography variant="h4" align="center">Sim Details Validator</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Service Number"
          value={serviceNumber}
          onChange={(e) => setServiceNumber(e.target.value)}
          fullWidth
          margin="normal"
        />

        
        <TextField
          label="Sim Number"
          value={simNumber}
          onChange={(e) => setSimNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: isFormValid() ? '#f0aa00' : '#DEDEDE', // Conditionally set background color
              color: 'white',
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
            }}
            disabled={!isFormValid()} // Disable button if form is invalid
          >
            Validate
          </Button>
        </div>

      </form>
      
      {loading && <CircularProgress style={{ marginTop: '20px' }} />}
      {error && (<Alert severity="error" style={{ marginTop: '20px', maxWidth: '300'}}>{error}</Alert>)}
      {simStatus !== null && !error && (
        <div style={{ marginTop: '20px' }}>

          <Typography variant="h5" alignContent={'center'}>Validation Result</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong> Service Number: </strong></TableCell>
                  <TableCell>{serviceNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Sim Number:</strong></TableCell>
                  <TableCell>{simNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status:</strong></TableCell>
                  <TableCell>{simStatus}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="success" style={{ marginTop: '10px' }}>
            Status: {simStatus}
          </Alert>
        </div>
      )}
      </CardContent>
      </Card>
    </Container>
  );
};

export default SimDetails;