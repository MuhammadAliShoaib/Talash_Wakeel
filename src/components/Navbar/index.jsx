import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'

const Navbar = () => {
    return (
        <AppBar
            position="static"
            color="default"
            style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", backgroundColor: '#000' }}
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: "wrap" }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, color: "#ffffff" }}>
                    Talash Wakeel
                </Typography>
                <Button
                    href=""
                    size="medium"
                    variant="contained"
                    sx={{ my: 1, mx: 1.5,background:'white',color :"#000" }}
                >
                    Login
                </Button>
                <Button
                    href=""
                    size="medium"
                    variant="contained"
                    sx={{ my: 1, mx: 1.5,background:'white',color :"#000" }}
                >
                    Signup
                </Button>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;
