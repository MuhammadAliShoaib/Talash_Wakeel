import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Image from "../../assets/logoIcon.png"

const Navbar = () => {

    const navigate = useNavigate()

    const handleClick = (route) => {
        navigate(`${route}`)
    }

    return (
        <AppBar
            position="static"
            color="default"
            style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", backgroundColor: '#000' }}
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: "wrap"}}>
                <div style={{width : '60px',height : '60px',borderRadius : '50%'}}>
                    <img src={Image} width={'100%'} height={'100%'}/>
                </div>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, color: "#ffffff" }}>
                    TalashWakeel
                </Typography>
                <Button
                    href=""
                    size="medium"
                    variant="contained"
                    sx={{ my: 1, mx: 1.5, background: 'white', color: "#000" }}
                    onClick={() => handleClick('/login')}
                >
                    Login
                </Button>
                <Button
                    href=""
                    size="medium"
                    variant="contained"
                    sx={{ my: 1, mx: 1.5, background: 'white', color: "#000" }}
                    onClick={() => handleClick('/signup')}
                >
                    Signup
                </Button>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;
