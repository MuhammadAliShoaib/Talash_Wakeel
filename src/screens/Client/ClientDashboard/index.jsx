import React from "react";
import { firms } from "../../../utility/data";
import { FirmCard } from "../../../components/Cards/FirmCard";
import Header from "../../../components/Header";

export const ClientDashboard = () => {
  return (
    <div>
      <Header title="Dashboard" role="client" />
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {firms.map((firm, index) => {
          return <FirmCard book={true} key={index} item={firm} />;
        })}
      </div>
    </div>
  );
};
