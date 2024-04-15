import { useState, useEffect } from "react";
import { FirmCard } from "../../../components/Cards/FirmCard";
import Header from "../../../components/Header";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const ClientDashboard = () => {
  const [firms, setFirms] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const getFirms = async () => {
    try {
      const response = (await axiosPrivate.get("/client/getFirm")).data;
      console.log(response);
      setFirms(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFirms();
  }, []);

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
