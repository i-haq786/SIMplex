import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Box, Card, CardContent, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import SimCardIcon from '@mui/icons-material/SimCard';

const menuItems = [
    { text: 'All Customers', icon: <PeopleIcon />, link: '/', color: '#FFFFFF' }, 
    { text: 'Validate Sim', icon: <SimCardIcon />, link: '/c2', color: '#03a9f4' }, 
    { text: 'Validate Customer', icon: <HowToRegIcon />, link: '/c3', color: '#0afc5b' }, 
    { text: 'Validate Customer Details', icon: <VerifiedUserIcon />, link: '/c4', color: '#0afc5b' },
    { text: 'Validate ID Proof', icon: <BadgeIcon />, link: '/c5', color: '#ffcf21' }, 
    { text: 'Show Special Offers', icon: <CardGiftcardTwoToneIcon />, link: '/c6', color: 'red' }, 
];

const SideMenu: React.FC = () => {
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{ '& .MuiDrawer-paper': { marginTop: '64px', width: 240, boxSizing: 'border-box' } }}
        >
            <Toolbar />
            <Box sx={{ mt: -8.94 }}> 
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            button
                            component={Link}
                            to={item.link}
                            sx={{
                                backgroundColor: location.pathname === item.link ? '#3f51b5' : 'inherit',
                                color: location.pathname === item.link ? '#ffffff' : '#757575', // White when active, grey when inactive
                                '&:hover': {
                                    backgroundColor: location.pathname === item.link ? '#3f51b5' : '#a2b9f8',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.link ? item.color : 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Card variant="outlined" style={{
                    marginTop: '260px',
                    marginLeft: '10px',
                    maxWidth: '180px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)',
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    color: '#3f51b5',
                    textAlign: 'center'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            "Stay Connected, Anytime, Anywhere" <br/> - Our Motto
                        </Typography>
                    </CardContent>
                </Card>
                <p style={{ textAlign: 'right', marginTop: '16px', marginRight:'10px', color: '#757575', fontSize: '14px' }}>
                    Created by,<br/> Md Inzamamul Haque
                </p>
            </Box>
        </Drawer>
    );
};

export default SideMenu;
