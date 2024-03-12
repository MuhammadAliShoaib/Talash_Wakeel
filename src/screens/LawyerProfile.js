import { Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import SMTable from '../components/SMTable';

const LawyerProfile = () => {
  // console.log("i am lawyer");
  return (
    <Stack>
      {/* <Typography>You are lawyer</Typography> */}
      <Container>
        <Grid>
          <Grid item md={12}>
            <Typography style={{textAlign:'start',fontSize:'20px',fontWeight:'bold'}}>Finalized Cases</Typography>
            <SMTable />
          </Grid>
        </Grid>
      </Container>
      <Container style={{marginTop:'50px'}}>
        <Grid>
          
          <Grid item md={8} >
          <Typography style={{textAlign:'start',fontSize:'20px',fontWeight:'bold'}}>Current Cases</Typography>
            <SMTable />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  )
}

export default LawyerProfile