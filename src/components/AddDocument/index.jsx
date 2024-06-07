import React, { useState } from "react";
import { Button, Grid, Container, Typography } from "@mui/material";

import "./styles.css"
import { AddDocumentModal } from "../Modal/AddDocumentModal";
import Header from "../Header";


const docs = [
    {
        title: 'CNIC',
        imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg"
    },
    {
        title: 'CNIC',
        imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg"
    },
    {
        title: 'CNIC',
        imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg"
    },
]


export const AddDocuments = ({ data }) => {


    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <Header title="Documents" />
            <Container maxWidth="false" disableGutters sx={{ padding: "10px" }}>
                <AddDocumentModal open={isOpen} onClose={() => setIsOpen(false)} />
                <Grid container spacing={2} sx={{ my: 0 }}>
                    <Grid item xs={12} md={2}>

                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            displa: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            onClick={toggleModal}
                            href=""
                            size="medium"
                            variant="contained"
                        >
                            Add Document
                        </Button>
                    </Grid>
                </Grid>
                <div
                    style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
                >
                    {docs.map((doc, index) => {
                        return (
                            <div key={index} class="documentContainer">
                                <h4>{doc.title}</h4>
                                <img src={doc.imageUrl} style={{ width: '90%', height: '90%' }} />
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    );
};
