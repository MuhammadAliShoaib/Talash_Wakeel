import { Button } from '@mui/material'
import React from 'react'

export const LawyerCard = ({ item }) => {

  return (
    <div style={{ margin: '10px', padding: '10px', borderRadius: '20px', width: '220px', height: '200px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h3 style={{ color: 'black', alignSelf: 'center' }}>{item.name}</h3>
      <p style={{ color: 'black' }}>Email : {item.email}</p>
      <p style={{ color: 'black' }}>Field : {item.field}</p>
      <Button
        href=""
        size="small"
        variant="contained"
        sx={{ my: 1, mx: 1.5 }}
      >
        Add
      </Button>
    </div>
  )
}
