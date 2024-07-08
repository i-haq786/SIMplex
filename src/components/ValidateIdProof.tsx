import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from "axios";

const ValidateIdProof: React.FC = () => {
  const [aadharId, setAadharId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formIsEmpty, setFormIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    setFormIsEmpty(!aadharId || !firstName || !lastName || !dob);
  }, [aadharId, firstName, lastName, dob]);

  const validateAadharId = (id: string) => {
    return /^\d{15,16}$/.test(id);
  };

  const validateDate = (date: string) => {
    return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date);
  };

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (!aadharId) {
      setError("Aadhar ID is required");
      return;
    }

    if (!validateAadharId(aadharId)) {
      setError("Id should be 16 digits");
      return;
    }

    if (!firstName) {
      setError("First Name is required");
      return;
    }

    if (!lastName) {
      setError("Last Name is required");
      return;
    }

    if (!dob) {
      setError("Date of Birth is required");
      return;
    }

    if (!validateDate(dob)) {
      setError("Invalid details");
      return;
    }

    console.log("Validations complete! Proceeding to post request!");

    axios.put('http://localhost:1002/api/customerIdentity/idProofCheck', { id:aadharId, dob, firstName, lastName })
      .then(response => {
        if (response.data.toLowerCase().includes("pass")) {
          setSuccess(response.data);
        } else {
          setError(response.data);
        }
      })
      .catch(error => {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError('Customer Not Found');
        }
      });
  };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ width: '300px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h6">Customer ID Proof Validation</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField label="Aadhar ID" variant="outlined" value={aadharId} onChange={(e) => setAadharId(e.target.value)} required />
      <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <TextField label="DOB (mm-dd-yyyy)" variant="outlined" value={dob} onChange={(e) => setDob(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary" disabled={formIsEmpty} sx={{ backgroundColor: 'orange' }}>
        Validate
      </Button>
    </Box>
  );
}

export default ValidateIdProof;
