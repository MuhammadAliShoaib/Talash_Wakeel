import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../../components/Header";
// import { lawyers } from "../../../utility/data";
import { LawyerCard } from "../../../components/Cards/LawyerCard";
import { Grid, TextField } from "@mui/material";
import DropDown from "../../../components/DropDown";
import { lawyerTypes } from "../../../utility/utils";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const FirmLawyers = () => {
  const axiosPrivate = useAxiosPrivate();
  let { id } = useParams();
  const [lawyers, setLawyers] = useState();
  const [lawyerData, setLawyerData] = useState();

  const handleDropDown = (type) => {
    const array = lawyers.filter((lawyer) => lawyer.field === type);
    setLawyerData(array);
  };

  const handleChange = (e) => {
    const lowerCaseQuery = e.target.value.toLowerCase();
    const filteredNames = lawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(lowerCaseQuery)
    );
    setLawyerData(filteredNames);
  };

  const getLawyers = async () => {
    try {
      const res = (
        await axiosPrivate.get("/client/getLawyers", { params: { id } })
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
  }, [id]);

  return (
    <>
      <Header title="Szabist Firm" />
      <div style={{ padding: "10px" }}>
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
        </Grid>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {lawyerData?.map((lawyer, index) => {
            return <LawyerCard key={index} item={lawyer} book />;
          })}
        </div>
      </div>
    </>
  );
};
