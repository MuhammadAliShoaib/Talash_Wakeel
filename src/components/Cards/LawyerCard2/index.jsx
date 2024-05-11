import React from 'react';
import './styles.css'; // Import your CSS file
import StarIcon from '@mui/icons-material/Star';
import Image from "../../../assets/profile.jpg"
import Image2 from "../../../assets/firm.jpeg"
import Image3 from "../../../assets/balance.png"
import { Button } from '@mui/material';

const LawyerCard2 = ({ item, onClick }) => {
  return (
    <div className="">
      <div className="laweryCard">
        <div className="additional">
          <div className="user-card">
            <div className="level center">
              Tax Lawyer
            </div>
            <div className='profileContainer' >
              <img src={Image} className='profile' />
            </div>
            <div className="points center">
              <StarIcon fontSize='small' sx={{ color: 'yellow' }} />
              <StarIcon fontSize='small' sx={{ color: 'yellow' }} />
              <StarIcon fontSize='small' sx={{ color: 'yellow' }} />
              <StarIcon fontSize='small' sx={{ color: 'yellow' }} />
              <StarIcon fontSize='small' sx={{ color: 'yellow' }} />
            </div>
          </div>
        </div>
        <div className="general">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={Image2} className='firmImage' />
            <img src={Image3} className='firmImage' />
          </div>
          <h3 style={{ color: "black", alignSelf: "center" }}>{item.firstName} {item.lastName}</h3>
          <p style={{ color: "black" }}>ID : {item.lawyerBarCouncilId}</p>
          <p style={{ color: "black" }}>Description : Lorem ipsum</p>
          <span className="more">
            <Button
              href=""
              size="small"
              variant="contained"
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => onClick(item)}
            >
              Book
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LawyerCard2;
