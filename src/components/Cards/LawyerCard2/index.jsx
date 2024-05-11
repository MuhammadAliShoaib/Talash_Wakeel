import React from 'react';
import './styles.css'; // Import your CSS file
import StarIcon from '@mui/icons-material/Star';
import Image from "../../../assets/profile.jpg"

const LawyerCard2 = ({ name, groupName, joinedDate, position, location, awards, matches, pals, coffee }) => {
  return (
    <div className="">
      <div className="laweryCard">
        <div className="additional">
          <div className="user-card">
            <div className="level center">
              Tax Lawyer
            </div>
            <div >
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
          <h1>{name}</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
          <span className="more">Random Text</span>
        </div>
      </div>
    </div>
  );
}

export default LawyerCard2;
