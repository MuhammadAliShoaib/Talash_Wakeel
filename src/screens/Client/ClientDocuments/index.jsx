import React, { useState } from "react";
import Header from "../../../components/Header";
import { Button, Grid, Container, Typography } from "@mui/material";
import { AddDocumentModal } from "../../../components/Modal/AddDocumentModal";

import "./styles.css"


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


export const ClientDocuments = () => {


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
            {/* <TextField
              label="Search name"
              onChange={handleChange}
              InputProps={{
                type: "search",
              }}
            /> */}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* <DropDown options={lawyerTypes} setType={handleDropDown} /> */}
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
