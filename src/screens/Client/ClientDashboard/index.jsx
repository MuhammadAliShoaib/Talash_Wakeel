import { useState, useEffect } from "react";
import { FirmCard } from "../../../components/Cards/FirmCard";
import Header from "../../../components/Header";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import FirmCard2 from "../../../components/Cards/FirmCard2";
import LawyerCard2 from "../../../components/Cards/LawyerCard2";

export const ClientDashboard = () => {
  const [firms, setFirms] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
  // const location = useLocation();

  const getFirms = async () => {
    try {
      const response = (await axiosPrivate.get("/client/getFirms")).data;
      setFirms(response);
    } catch (error) {
      console.log(error);
      // navigate("/", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getFirms();
  }, []);

  return (
    <div>
      <Header title="Dashboard" />
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {firms.map((firm, index) => {
          return <FirmCard2 key={index} item={firm} />;
        })}
      </div>
    </div>
  );
};
