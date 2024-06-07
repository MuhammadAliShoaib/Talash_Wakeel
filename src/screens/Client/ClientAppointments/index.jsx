import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { Box, Container, Grid, Tab, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import ClientBookedTable from "../../../components/ClientBookedTable";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { RateLawyerModal } from "../../../components/Modal/RateLawyerModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export const ClientAppointments = () => {
  const axiosPrivate = useAxiosPrivate();
  const [reqAppointments, setReqAppointments] = useState();
  const [approvedAppointments, setApprovedAppointments] = useState();
  const [followUpAppointments, setFollowUpAppointments] = useState();
  const [closedAppointments, setClosedAppointments] = useState();
  const [flag, setFlag] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [booking, setBooking] = useState();
  const { auth } = useAuth();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

      const requested = [];
      const approved = [];
      const followUp = [];
      const closed = [];

      res.forEach((appointment) => {
        if (appointment.status === "Requested") {
          requested.push(appointment);
        } else if (
          appointment.status === "Approved" ||
          appointment.status === "Rescheduled"
        ) {
          approved.push(appointment);
        } else if (appointment.status === "Follow Up") {
          followUp.push(appointment);
        } else if (
          appointment.status === "Closed" ||
          appointment.status === "Canceled"
        ) {
          closed.push(appointment);
        }
      });

      setReqAppointments(requested);
      setApprovedAppointments(approved);
      setFollowUpAppointments(followUp);
      setClosedAppointments(closed);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleClick = async (appointmentId) => {
    try {
      const res = await axiosPrivate.put("/client/cancelBooking", {
        updatedStatus: "Canceled",
        appointmentId,
      });
      setFlag(!flag);

      toast.success(`${res.data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleRatingModal = (row) => {
    setBooking(row);
    setRatingModal(true);
  };

  useEffect(() => {
    getAppointments();
  }, [flag]);

  return (
    <div>
      <RateLawyerModal
        open={ratingModal}
        onClose={() => setRatingModal(false)}
        data={booking}
        flag={flag}
        setFlag={setFlag}
      />
      <Header title="Appointment Details" />


      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
        <Box sx={{ width: '80%', typography: 'body1', }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList centered onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Requested" value="1" />
                <Tab label="Confirmed" value="2" />
                <Tab label="Follow Up" value="3" />
                <Tab label="Finalized Cases" value="4" />
              </TabList>
            </Box>

            <TabPanel value="1">

              <Box sx={{ paddingTop: "25px" }}>
                {/* <Container>
                <Typography variant="h5" color={"black"}>
                Requested Appointments
                </Typography>
              </Container> */}

                <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{ paddingTop: "5px", paddingBottom: "10px" }}
                    >
                      <ClientBookedTable
                        data={reqAppointments}
                        requestTable={true}
                        handleClick={handleClick}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </TabPanel>

            <TabPanel value="2">
              <Box sx={{ paddingTop: "25px" }}>
                {/* <Container>
                  <Typography variant="h5" color={"black"}>
                    Confirmed Appointments
                  </Typography>
                </Container> */}

                <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{ paddingTop: "5px", paddingBottom: "10px" }}
                    >
                      <ClientBookedTable data={approvedAppointments} />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </TabPanel>


            <TabPanel value="3">

              <Box sx={{ paddingTop: "25px" }}>
                <Container>
                  <Typography variant="h5" color={"black"}>
                    Follow Up Appointments
                  </Typography>
                </Container>

                <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{ paddingTop: "5px", paddingBottom: "10px" }}
                    >
                      <ClientBookedTable data={followUpAppointments} />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </TabPanel>


            <TabPanel value="4">

              <Box sx={{ paddingTop: "25px" }}>
                <Container>
                  <Typography variant="h5" color={"black"}>
                    Closed Appointments
                  </Typography>
                </Container>

                <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{ paddingTop: "5px", paddingBottom: "10px" }}
                    >
                      <ClientBookedTable
                        data={closedAppointments}
                        closedTable={true}
                        handleRatingModal={handleRatingModal}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </TabPanel>

          </TabContext>
        </Box>
      </Box>
    </div >
  );
};
