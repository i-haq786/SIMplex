import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const NavBar = () => {
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
                <Box sx={{ width: '240px' }}>
                    <SideMenu />
                </Box>
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default NavBar;