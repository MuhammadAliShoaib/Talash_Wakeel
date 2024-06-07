import React, { useState } from "react";
import "./styles.css"; // Import your CSS file
import StarIcon from "@mui/icons-material/Star";
import Image from "../../../assets/profile.jpg";
import Image2 from "../../../assets/firm.jpeg";
import Image3 from "../../../assets/balance.png";
import { Button } from "@mui/material";

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}

const LawyerCard2 = ({ item, onClick, button = false }) => {
  const [color, setColor] = useState(getRandomColor());

  return (
    <div>
      <div className="laweryCard">
        <div className="additional" style={{ backgroundColor: color }}>
          <div className="user-card">
            <div className="level center">{item.field}</div>
            <div className="profileContainer">
              <img src={Image} className="profile" />
            </div>
            <div className="points center">
              {Array.from({ length: item.rating }).map((_, index) => (
                <StarIcon key={index} fontSize="small" sx={{ color: "gold" }} />
              ))}
            </div>
            <div style={{ marginTop: "15px", color: "white" }}>
              Rating: {item.rating}
            </div>
          </div>
        </div>
        <div className="general">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img src={Image2} className="firmImage" />
            <img src={Image3} className="firmImage" />
          </div>
          <h3 style={{ color: "black", alignSelf: "center" }}>
            {item.firstName} {item.lastName}
          </h3>
          <p style={{ color: "black" }}>ID : {item.lawyerCouncilId}</p>
          <p style={{ color: "black" }}>Description : Lorem ipsum</p>
          {button && (
            <span className="more">
              <Button
                href=""
                size="small"
                variant="contained"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => onClick(item)}
              >
                Request Appointment
              </Button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerCard2;
