import React from 'react'

export const FirmCard = ({ item }) => {
  return (
    <div style={{ margin: '10px', border: '1px solid black', padding: '10px', borderRadius: '20px' }}>
      <img src='../../../assets/firm.jpeg' style={{ width: '20px', height: '20px' }} />
      <p style={{ color: 'black' }}>{item.email}</p>
      <p style={{ color: 'black' }}>{item.phoneNo}</p>
      <p style={{ color: 'black' }}>{item.city}</p>
    </div>
  )
}
