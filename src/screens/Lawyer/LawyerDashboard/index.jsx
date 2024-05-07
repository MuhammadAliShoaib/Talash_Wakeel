import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Grid, Container, Box, Typography } from "@mui/material";
import AppointmentTable from "../../../components/AppointmentTable";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const sample = [
  {
    clientID: 1,
    clientFirstName: "Abdul",
    clientLastName: "Muneeb",
    date: "08/05/2024",
  },
  {
    clientID: 1,
    clientFirstName: "Abdul",
    clientLastName: "Muneeb",
    date: "08/05/2024",
  },
  {
    clientID: 1,
    clientFirstName: "Abdul",
    clientLastName: "Muneeb",
    date: "08/05/2024",
  },
];

export const LawyerDashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(sample);
  const [oldRecord, setOldRecord] = useState([]);
  const [currentRecord, setCurrentRecord] = useState([]);
  const { auth } = useAuth();

  const getAppointments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/lawyer/getAppointments", {
          params: { id: auth.lawyerBarCouncilId },
        })
      ).data;
      if (!res) {
        throw new Error("An Error Occured");
      }
      // setData(res);

      res.map((data) => {
        if (new Date() < new Date(data.bookingDate)) {
          setCurrentRecord((prev) => [...prev, data]);
        } else {
          setOldRecord((prev) => [...prev, data]);
        }
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
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
              <AppointmentTable data={currentRecord} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
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
              <AppointmentTable data={oldRecord} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
