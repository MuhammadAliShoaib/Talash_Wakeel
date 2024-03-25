import Box from "@mui/material/Box";
import { Badge, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Header({ title }) {

    const navigate = useNavigate();


    let handleDisconnect = () => {
        navigate('/')
    }

    return (
        <Box
            sx={{
                padding: "0px 20px 0px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                background: 'black'
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div className="">
                    <Typography
                        sx={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: 25,
                            marginY: '14px',
                            color: 'white'
                        }}
                    >
                        {title}
                    </Typography>
                </div>
            </Box>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    onClick={handleDisconnect}
                    href=""
                    size="medium"
                    variant="contained"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Logout
                </Button>
            </div>
        </Box >
    );
}
