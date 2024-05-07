import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import FirmTable from '../../../components/FirmTable'
import { Box, Container, Grid, Typography } from '@mui/material'
import useAuth from '../../../hooks/useAuth'


const sample = [
  {
    clientID: 1,
    barCouncilId: '2012281',
    date: '08/05/2024',
    status: "Done"
  },
  {
    clientID: 2,
    barCouncilId: '2012281',
    date: '08/05/2024',
    status: "Done"
  },
  {
    clientID: 3,
    barCouncilId: '2012281',
    date: '08/05/2024',
    status: "Done"
  }
]

export const FirmPaymentHistory = () => {

  const [data, setData] = useState(sample)
  const { auth } = useAuth()


  const getAppointments = async () => {
    try {
      const res = (
        await axiosPrivate.get("/firm/getAppointments", { params: { id: auth.barCouncilId } })
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
              <FirmTable data={data} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
