import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from "axios";

const ValidateCustomers = () => {
    const [emailId, setEmailId] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);

    useEffect(()=>{
        setIsFormEmpty(emailId ==='' && dob==='')
    },[emailId,dob]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        return emailRegex.test(email);
    };

    const validateDob = (dob: string) => {
        const dobRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
        return dobRegex.test(dob);
    };

    const handleSubmit = () => {
        setError('');
        setSuccess('');

        if (!emailId ) {
            setError("Email value is required");
            return;
        }

        if (!dob) {
            setError("Date of birth is require");
            return;
        }

        if (!validateEmail(emailId)) {
            setError("Invalid email");
            return;
        }

        if (!validateDob(dob)) {
            setError("Invalid dob format. Use mm-dd-yyyy");
            return;
        }

        console.log("Handling submit");
        axios.post('http://localhost:1002/api/Customer/verify', { email: emailId, dob })
            .then(response => {
                if (response.data.toLowerCase() === 'success') {
                    setSuccess(response.data);
                } else {
                    setError(response.data);
                }
                })
            .catch(error => setError(error.response?.data || 'An error occurred.'));
    }

    return (
        <Box 
            component="form" 
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} 
            sx={{ width: '300px', margin: '0 auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }} 
        >      
            <Typography variant="h4">Are you for real??</Typography>
            {/* <Typography variant="h6" alignContent="center">Validate Customer</Typography> */}
           
            <TextField 
                label="Email" 
                variant="outlined" 
                value={emailId} 
                onChange={(e) => setEmailId(e.target.value)} 
                 
            />
            <TextField 
                label="DOB (mm-dd-yyyy)" 
                variant="outlined" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)}  
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ display: 'flex', alignItems: 'center' }}
                style={{
                    backgroundColor: !isFormEmpty?'#f0aa00' :'#DEDEDE', 
                    color: 'white',
                    cursor: !isFormEmpty ? 'pointer' : 'not-allowed',
                }}
                disabled={isFormEmpty}
            >
                Validate
            </Button>
            {error && (
                <Alert severity="error" icon={<ErrorOutlineIcon sx={{ color: 'red' }} />}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" icon={<CheckCircleOutlineIcon />}>
                    {success}
                </Alert>
            )}
        </Box>
    );
}

export default ValidateCustomers;
