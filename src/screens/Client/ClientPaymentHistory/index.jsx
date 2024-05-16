import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Box, Container, Grid, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import ClientBookedTable from "../../../components/ClientBookedTable";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const sample = [
  {
    firmName: "Szabist",
    firstName: "Abdul Muneeb",
    date: "08/05/2024",
    status: "Done",
  },
];

export const ClientPaymentHistory = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const { auth } = useAuth();

  const getAppointments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/client/getAppointments", {
          params: { clientID: auth.clientID },
        })
      ).data;
      if (!res) {
        throw new Error("An Error Occured");
      }
      // console.log(res);
      setData(res);
      // console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <Header title="Appointment Details" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
            Lawyer Appointments
          </Typography>
        </Container>

        <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "5px", paddingBottom: "10px" }}
            >
              <ClientBookedTable data={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
