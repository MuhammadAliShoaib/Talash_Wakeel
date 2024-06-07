import { useState, useEffect } from "react";
import { FirmCard } from "../../../components/Cards/FirmCard";
import Header from "../../../components/Header";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import FirmCard2 from "../../../components/Cards/FirmCard2";
import LawyerCard2 from "../../../components/Cards/LawyerCard2";
import AdminTable from "../../../components/AdminTable";
import { Box, Container, Typography, Grid } from "@mui/material";
import { AdminModal } from "../../../components/Modal/AdminModal";

export const AdminDashboard = () => {
  const [firms, setFirms] = useState([]);
  const [flag, setFlag] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [row, setRow] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getFirms = async () => {
    try {
      const response = (await axiosPrivate.get("/client/getFirms")).data;
      setFirms(response);
    } catch (error) {
      console.log(error);
      navigate("/", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getFirms();
  }, [flag]);

  const handleModal = (row) => {
    setRow(row);
    setAdminModal(true);
  };

  return (
    <div>
      <AdminModal
        open={adminModal}
        onClose={() => setAdminModal(false)}
        data={row}
        flag={flag}
        setFlag={setFlag}
      />
      <Header title="Dashboard" />
      <Box sx={{ paddingTop: "25px" }}>
        <Container>
          <Typography variant="h5" color={"black"}>
            Firms Listed
          </Typography>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                style={{ paddingTop: "5px", paddingBottom: "10px" }}
              >
                <AdminTable data={firms} handleModal={handleModal} />
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
    </div>
  );
};
