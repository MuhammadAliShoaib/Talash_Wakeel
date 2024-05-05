import React, { useState } from "react";
import AddLawyerModal from "../../../components/Modal/AddLawyerModal";
import Header from "../../../components/Header";
import { lawyers } from "../../../utility/data";
import { LawyerCard } from "../../../components/Cards/LawyerCard";
import { Button, Grid, Container, Typography } from "@mui/material";
import DropDown from "../../../components/DropDown";
import { lawyerTypes } from "../../../utility/utils";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const FirmDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lawyerData, setLawyerData] = useState(lawyers);

  const handleChange = (e) => {
    const array = lawyers.filter((lawyer) => lawyer.name === e.target.value);
    setLawyerData(array);
  };


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header title="Dashboard" />
      <Container maxWidth="false" disableGutters sx={{ padding: '10px' }}>
        <AddLawyerModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
        {lawyers.length === 0 && (
          <Typography variant="h4" align="center">
            Welcome..
          </Typography>
        )}
        <Grid container spacing={3} sx={{ my: 0 }}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={lawyerTypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search name"
                  onChange={handleChange}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
            <DropDown options={lawyerTypes} />
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "center", displa: 'flex', justifyContent: 'flex-end' }} >
            <Button
              onClick={toggleModal}
              href=""
              size="medium"
              variant="contained"
            >
              Add Lawyer
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {lawyerData.map((lawyer, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <LawyerCard item={lawyer} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
