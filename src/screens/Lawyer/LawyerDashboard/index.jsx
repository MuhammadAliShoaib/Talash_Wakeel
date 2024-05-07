import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Grid, Container, Box, Typography } from "@mui/material";
import AppointmentTable from "../../../components/AppointmentTable";
import useAuth from "../../../hooks/useAuth";
import axiosPrivate from "../../../api/axiosPrivate";

export const LawyerDashboard = () => {

  const [data, setData] = useState()
  const { auth } = useAuth()


  const getAppointments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/lawyer/getAppointments", { params: { id: auth.barCouncilId } })
      ).data;
      if (!res) {
        throw new Error("An Error Occured");
      }
      setData(res)
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  // useEffect(()=>{
  //   getAppointments()
  // },[])

  return (
    <>
      <Header title="Dashboard" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography
            variant="h5"
            color={"black"}
          >
            Current Booked Appointments
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <AppointmentTable data={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography
            variant="h5"
            color={"black"}
          >
            Previous Booked Appointments
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <AppointmentTable data={data}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
