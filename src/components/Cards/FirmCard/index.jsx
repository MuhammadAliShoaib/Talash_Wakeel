import React from 'react'
import img from "../../../assets/firm.jpeg"

export const FirmCard = ({ item }) => {
  return (
    <div style={{ margin: '10px', padding: '10px', borderRadius: '20px', width: '220px', height: '200px',boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",display:'flex',flexDirection : 'column',justifyContent:'center' }}>
      <img src={img} width={'60px'} height={'60px'} style={{alignSelf:'center'}}/>
      <p style={{ color: 'black' }}>Email : {item.email}</p>
      <p style={{ color: 'black' }}>Phone : {item.phoneNo}</p>
      <p style={{ color: 'black' }}>City : {item.city}</p>
    </div>
  )
}
