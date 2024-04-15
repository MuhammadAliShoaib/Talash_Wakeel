import React from "react";
import img from "../../../assets/firm.jpeg";
import { useNavigate } from "react-router";

export const FirmCard = ({ item }) => {
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/client/${item.barCouncilId}`);
  };

  return (
    <div
      onClick={handleNavigate}
      style={{
        margin: "10px",
        padding: "10px",
        borderRadius: "20px",
        width: "220px",
        height: "200px",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        src={img}
        width={"60px"}
        height={"60px"}
        style={{ alignSelf: "center" }}
      />
      <p style={{ color: "black" }}>Email : {item.firmEmail}</p>
      <p style={{ color: "black" }}>Phone : {item.firmPhoneNumber}</p>
      <p style={{ color: "black" }}>City : {item.firmCity}</p>
    </div>
  );
};
