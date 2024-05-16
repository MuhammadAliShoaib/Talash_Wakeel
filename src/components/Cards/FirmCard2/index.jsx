import React from 'react';
import './styles.css'; // Make sure to import your CSS file
import Image from "../../../assets/firm.jpeg"
import Image2 from "../../../assets/lawBackground.jpg"
import { useNavigate } from 'react-router-dom';

const FirmCard2 = ({ item }) => {

  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/client/${item.firmBarCouncilId}`);
  };

  return (
    <div className="card">
      <div className="banner" style={{
        backgroundImage: `url(${Image2})`
      }}>
        <div className='imageContainer'>
          <img src={Image} style={{ width: '8rem', height: '8rem', borderRadius: '50%' }} />
        </div>
      </div>
      <div className="menu">
        <div className="opener">
          {/* <span></span>
          <span></span>
          <span></span> */}
        </div>
      </div>
      <h2 className="name">SZABIST</h2>
      <div className="title">Firm</div>
      <div className="actions">
        <div className="follow-info">
          <h2>
            <a href="#">
              <span>12</span>
              <small>Lawyers</small>
            </a>
          </h2>
          <h2>
            <a href="#">
              <span>1000</span>
              <small>Cases</small>
            </a>
          </h2>
        </div>
        <div className="follow-btn">
          <button onClick={handleNavigate}>View</button>
        </div>
      </div>
      {/* <div className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi vero corrupti sit. Similique repellat rem tempora nihil consectetur, nemo enim dolorem sunt asperiores qui quis voluptate perspiciatis soluta. Voluptates sequi ducimus suscipit.</div> */}
      <div className="desc">
        <p style={{ color: "black",fontWeight : 'bold' }}>{item.firmEmail}</p>
        <p style={{ color: "black",fontWeight : 'bold' }}>{item.firmPhoneNumber}</p>
        <p style={{ color: "black",fontWeight : 'bold' }}>{item.firmCity}</p>
      </div>
    </div>
  );
};

export default FirmCard2;
