import React, { useState } from 'react'
import Header from '../../../components/Header'
import { Box, Container, Grid, Typography } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
import ClientBookedTable from '../../../components/ClientBookedTable'

const sample = [
  {
    firmName: "Szabist",
    lawyerName: "Abdul Muneeb",
    date: "08/05/2024",
    status: "Done"
  }
]

export const ClientPaymentHistory = () => {

  const [data, setData] = useState(sample)
  const { auth } = useAuth()


  const getAppointments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/client/getAppointments", { params: { id: auth.clientID } })
      ).data;
      if (!res) {
        throw new Error("An Error Occured");
      }
      setData(res)
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // useEffect(() => { 
  //   getAppointments()
  // }, [])

  return (
    <div>
      <Header title="Payment History" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography
            variant="h5"
            color={"black"}
          >
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
  )
}
