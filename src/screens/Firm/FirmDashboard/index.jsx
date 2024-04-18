import React, { useState } from "react";
import AddLawyerModal from "../../../components/Modal/AddLawyerModal";
import Header from "../../../components/Header";
import { lawyers } from "../../../utility/data";
import { LawyerCard } from "../../../components/Cards/LawyerCard";
import { Button } from "@mui/material";
import DropDown from "../../../components/DropDown";
import { lawyerTypes } from "../../../utility/utils";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const FirmDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lawyerData, setLawyerData] = useState(lawyers);

  const handleChange = (e) => {
    const array = lawyers.filter((lawyer) => lawyer.name === e.target.value);
    setLawyerData(array);
  };

  const handleAddLawyer = () => {
    console.log("Lawyer added");
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <AddLawyerModal
        onSave={handleAddLawyer}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Header title="Dashboard" />
      {lawyers.length == 0 && (
        <h1 style={{ textAlign: "center" }}>Welcome..</h1>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: lawyers.length == 0 ? "center" : "space-between",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "35%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            style={{ width: "40%" }}
            size="small"
            options={lawyerTypes.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search name"
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <DropDown options={lawyerTypes} />
        </div>
        <Button
          onClick={toggleModal}
          href=""
          size="medium"
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
        >
          Add Lawyer
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {lawyerData.map((lawyer, index) => {
          return <LawyerCard key={index} item={lawyer} />;
        })}
      </div>
    </div>
  );
};
