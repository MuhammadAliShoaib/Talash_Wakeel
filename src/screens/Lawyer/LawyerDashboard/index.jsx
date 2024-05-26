import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Grid, Container, Box, Typography } from "@mui/material";
import AppointmentTable from "../../../components/AppointmentTable";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const LawyerDashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [flag, setFlag] = useState(false);
  const [oldRecord, setOldRecord] = useState([]);
  const [currentRecord, setCurrentRecord] = useState([]);
  const { auth } = useAuth();

  const getAppointments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/lawyer/getAppointments", {
          params: { id: auth.lawyerCouncilId },
        })
      ).data;
      if (!res) {
        throw new Error("An Error Occurred");
      }

      const currentDate = new Date();
      const updatedCurrentRecord = [];
      const updatedOldRecord = [];

      res.forEach((data) => {
        if (
          new Date(data.bookingDate) > currentDate &&
          data.status !== "Done"
        ) {
          updatedCurrentRecord.push(data);
        } else {
          updatedOldRecord.push(data);
        }
      });

      setCurrentRecord(updatedCurrentRecord);
      setOldRecord(updatedOldRecord);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [flag]);

  return (
    <>
      <Header title="Dashboard" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
            Requested Appointments
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <AppointmentTable
                data={currentRecord}
                flag={flag}
                setFlag={setFlag}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
            Confirmed Appointments
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

      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
            Next Appointments
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <AppointmentTable
                data={currentRecord}
                flag={flag}
                setFlag={setFlag}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
            Finalized Cases
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <AppointmentTable
                data={currentRecord}
                flag={flag}
                setFlag={setFlag}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
