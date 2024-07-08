import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from "axios";

const ValidateCustomerDetail = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formIsEmpty, setFormIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    setFormIsEmpty(firstName === '' || lastName === '' || emailId === '');
  }, [firstName, lastName, emailId]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    setError(null);
    setSuccess(null);

    if (!firstName) {
      setError("First Name can't be left blank!");
      return;
    }

    if (!lastName) {
      setError("Last Name can't be left blank!");
      return;
    }

    if (!emailId) {
      setError("Email value is required");
      return;
    }

    if (!validateEmail(emailId)) {
      setError("Invalid email");
      return;
    }

    console.log("Validations complete! Proceeding to post request!");

    axios.post('http://localhost:1002/api/Customer/us04', { email: emailId, firstName, lastName })
      .then(response => {
        if (response.data.toLowerCase().includes("success")) {
          setSuccess(response.data);
        } else {
          setError(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message || 'An error occurred.');
        } else {
          setError('An error occurred.');
        }
      });
  };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ width: '300px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h6">Customer Basics Details</Typography>
      {error && <Alert severity="error">{typeof error === 'string' ? error : JSON.stringify(error)}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <TextField label="Email" variant="outlined" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />

      <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#f0aa00' }} disabled={formIsEmpty}>
        Validate
      </Button>
    </Box>
  );
}

export default ValidateCustomerDetail;
