import React, { useEffect, useState } from "react";
import AddLawyerModal from "../../../components/Modal/AddLawyerModal";
import Header from "../../../components/Header";
import { lawyers } from "../../../utility/data";
import { LawyerCard } from "../../../components/Cards/LawyerCard";
import { Button, Grid, Container, Typography } from "@mui/material";
import DropDown from "../../../components/DropDown";
import { lawyerTypes } from "../../../utility/utils";
import TextField from "@mui/material/TextField";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import LawyerCard2 from "../../../components/Cards/LawyerCard2";

export const FirmDashboard = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isOpen, setIsOpen] = useState(false);
  const [lawyers, setLawyers] = useState();
  const [lawyerData, setLawyerData] = useState();

  const handleChange = (e) => {
    const lowerCaseQuery = e.target.value.toLowerCase();
    const filteredNames = lawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(lowerCaseQuery)
    );
    setLawyers(filteredNames);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDropDown = (type) => {
    const array = lawyers.filter((lawyer) => lawyer.field === type);
    setLawyerData(array);
  };

  const getLawyers = async () => {
    try {
      const res = (
        await axiosPrivate.get("/firm/getLawyers", {
          params: { id: auth.firmCouncilId },
        })
      ).data;
      if (!res) {
        throw new Error("An Error Occured");
      }

      console.log(res);
      setLawyers(res);
      setLawyerData(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getLawyers();
  }, [isOpen]);

  return (
    <>
      <Header title="Dashboard" />
      <Container maxWidth="false" disableGutters sx={{ padding: "10px" }}>
        <AddLawyerModal open={isOpen} onClose={() => setIsOpen(false)} />
        {/* {lawyers?.length === 0 && (
          <Typography variant="h4" align="center">
            Welcome..
          </Typography>
        )} */}
        <Grid container spacing={2} sx={{ my: 0 }}>
          <Grid item xs={12} md={2}>
            <TextField
              label="Search name"
              onChange={handleChange}
              InputProps={{
                type: "search",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DropDown options={lawyerTypes} setType={handleDropDown} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              displa: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={toggleModal}
              href=""
              size="medium"
              variant="contained"
            >
              Add Lawyer
            </Button>
          </Grid>
        </Grid>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {lawyerData?.map((lawyer, index) => {
            return <LawyerCard2 key={index} item={lawyer} />;
          })}
        </div>
      </Container>
    </>
  );
};
