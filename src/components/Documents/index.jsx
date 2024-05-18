import { Box, Button, Grid } from '@mui/material'
import React from 'react'


const docs = [
    {
        title: 'CNIC',
        imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716061115/pjo5lckoorckgqxz1j6s.png"
    }
]

export const Documents = () => {
    return (
        <Box>
            <Grid container spacing={2} sx={{ my: 0 }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        margin: '15px'
                    }}
                >
                    <Button
                        href=""
                        size="medium"
                        variant="contained"
                    >
                        Add Document
                    </Button>

                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ padding: '15px' }}>
                <Grid
                    item
                    xs={12}>
                    {docs.map((doc, index) => {
                        return (
                            <div key={index} style={{ width: '320px', height: '250px', overflow: 'hidden', backgroundColor: '#dde7f4', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',paddingBottom : '30px',paddingTop : '10px',borderRadius:'15px' }}>
                                <h4>{doc.title}</h4>
                                <img src={doc.imageUrl} style={{ width: '90%', height: '90%' }} />
                            </div>
                        )
                    })}
                </Grid>
            </Grid>
        </Box>
    )
}
