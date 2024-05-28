import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Grid, Container, Box, Typography } from "@mui/material";
import AppointmentTable from "../../../components/AppointmentTable";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { RescheduleModal } from "../../../components/Modal/RescheduleModal";
import { FollowUpModal } from "../../../components/Modal/FollowUpModal";

export const LawyerDashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [flag, setFlag] = useState(false);
  const [reqAppointments, setReqAppointments] = useState();
  const [approvedAppointments, setApprovedAppointments] = useState();
  const [followUpAppointments, setFollowUpAppointments] = useState();
  const [closedAppointments, setClosedAppointments] = useState();
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [followUpModal, setFollowUpModal] = useState(false);
  const [reschedule, setReschedule] = useState();
  const [followUp, setFollowUp] = useState();
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

  const updateStatus = async (Data) => {
    try {
      const res = await axiosPrivate.put(`/lawyer/updateStatus`, {
        appointmentId: Data.appointmentId,
        updatedStatus: Data.updatedStatus,
      });
      if (!res) {
        throw new Error("Error Occured, Update Failed");
      }
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

  const handleRescheduleModal = (booking) => {
    setReschedule(booking);
    setRescheduleModal(true);
  };

  const handleFollowUpModal = (booking) => {
    setFollowUp(booking);
    setFollowUpModal(true);
  };

  useEffect(() => {
    getAppointments();
  }, [flag]);

  return (
    <>
      <Header title="Dashboard" />
      <RescheduleModal
        open={rescheduleModal}
        onClose={() => setRescheduleModal(false)}
        data={reschedule}
        flag={flag}
        setFlag={setFlag}
      />
      <FollowUpModal
        open={followUpModal}
        onClose={() => setFollowUpModal(false)}
        data={followUp}
        flag={flag}
        setFlag={setFlag}
      />
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
                data={reqAppointments}
                requestTable={true}
                updateStatus={updateStatus}
                onReschedule={handleRescheduleModal}
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
              <AppointmentTable
                data={approvedAppointments}
                approveTable={true}
                updateStatus={updateStatus}
                onFollowUp={handleFollowUpModal}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

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
              <AppointmentTable
                data={followUpAppointments}
                approveTable={true}
                updateStatus={updateStatus}
                onFollowUp={handleFollowUpModal}
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
              <AppointmentTable data={closedAppointments} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
