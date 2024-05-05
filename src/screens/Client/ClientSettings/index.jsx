import React from 'react'
import Header from '../../../components/Header'
import ProfileForm from '../../../components/ProfileForm'
import { Box } from '@mui/material'

export const ClientSettings = () => {
  return (
    <>
      <Header title="Settings" />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Box
          sx={{
            width: '40vw',
            height: '80vh',
            boxShadow: 15,
            padding: '20px',
            textAlign: 'center',
            borderRadius: '15px'
          }}
        >
          <ProfileForm />
        </Box>
      </div>
    </>
  )
}
