import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import img from '../public/logo.png'; // Replace with your image path

const Header: React.FC = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={img} alt="Logo" style={{ marginRight: '10px', height: '60px', width: 'auto' }} />
                    <Typography variant="h6" component="div">
                        SIMplex - Simplified SIM Management System
                    </Typography>
                </div>
                <Button variant="outlined" style={{ borderColor: '#F5F5F5', color: '#F5F5F5' }} component={Link} to="/t">Sign Out</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
