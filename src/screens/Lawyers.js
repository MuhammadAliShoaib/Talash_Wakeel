import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLawyerProfile,
  editLawyersFromDatabase,
  getLawyersFromDatabase,
} from "../config/firebase/FirebaseMethods";
import { Box, Button, Checkbox, Input, Stack, Typography } from "@mui/material";
import CustomModal from "../components/modal/CustomModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FaqAccordion from "../components/FaqAccordion/FaqAccordion";
import FileUpload from "../components/FileUploadInput/FileUpload";
const Lawyers = () => {
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.auth);
  const [lawyers, setLawyers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [lawyersData, setLawyerData] = useState({});

  const submitHandler = () => {
    if (editId.id) {
      editLawyersFromDatabase(editId.id, lawyersData)
        .then(() => {
          let a = [...lawyers];
          a = a.filter((x) => x.id !== editId.id);
          a = [...a, lawyersData];
          setLawyers(a);
          setEditId({});
          setLawyerData({});
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let { firstName, lastName, field, email, password } = lawyersData;
      if (!firstName || !lastName || !field || !email || !password)
        return alert("PLEASE FILL ALL FIELDS");
      createLawyerProfile(lawyersData, dispatch, current_user);
    }
  };
  const inputHandler = (e, forRadio) => {
    setLawyerData((prev) => ({
      ...prev,
      [e.target.id]: !forRadio ? e.target.value : e.target.checked,
    }));
  };
  useEffect(() => {
    const foo = async () => {
      const data = await getLawyersFromDatabase();
      setLawyers(data);
    };
    foo();
  }, []);
  console.log(lawyers);
  const deleteFunc = (id) => {
    editLawyersFromDatabase(id, { isDeleted: true })
      .then(() => {
        let a = [...lawyers];
        a = a.filter((x) => x.id !== id);
        setLawyers(a);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalBtnLabel = //BUTTON FOR CUSTOM MODAL COMPONENT
    (
      <>
        <Typography>Add</Typography>
        <AddCircleIcon />
      </>
    );
  return (
    // <div>
    //   <button
    //     onClick={() =>
    //       createLawyerProfile(
    //         {
    //           firstName: "poiu",
    //           lastName: "iop",
    //           email: "euwyiulikhdcbnk@gmail.com",
    //           password: "iop@!234",
    //           field: "crime",
    //         },
    //         dispatch,
    //         current_user
    //       )
    //     }
    //   >
    //     Add lawyer
    //   </button>
    //   <p>siuzkxzhj,</p>
    // </div>
    <Stack style={{justifyContent:'center',alignItems:'center'}}>
      <Typography
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textDecorationLine: "underline",
          color: "#9c4f6c",
        }}
      >
        My lawyers
      </Typography>
      {lawyers.length===0? <Typography
        style={{
          fontSize: 20,
          padding: '50px',
          fontWeight: "bold",
         // textDecorationLine: "underline",
          //color: "#9c4f6c",
        }}
      >
        Congratulations on successfully signing up on TalashWakeel.pk!
        To get started, please click on the "ADD LAWYER" button in your dashboard to begin adding lawyers to your firm.
      </Typography> : null}
      <Stack
        // position={"fixed"}
        // bottom={"20px"}
        // right={"20px"}
        style={{paddingTop:'50px'}}
        flexDirection={"row"}
        justifyContent={"flex-end"}
      >
        <Button
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: "#9c4f6c",
            color: "white",
            padding:'15px'
          }}
          onClick={()=>{
            setEditId({})
            handleOpen()
          }}
        >
          <Typography>Add Lawyer</Typography>
          <AddCircleIcon />
        </Button>
      </Stack>
      <CustomModal
        closeCondition={false}
        // Btnlabel={modalBtnLabel}
        heading={"Create Lawyers"}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <Stack gap={2}>
          <Stack>
            <Typography>First Name</Typography>
            <Input
              id="firstName"
              onChange={inputHandler}
              style={{ padding: "10px" }}
              placeholder={"Enter First Name"}
            />
          </Stack>
          <Stack>
            <Typography>Last Name</Typography>
            <Input
              id="lastName"
              onChange={inputHandler}
              style={{ padding: "10px" }}
              placeholder={"Enter Last Name"}
            />
          </Stack>
          <Stack>
            <Typography>Bar Council ID</Typography>
            <Input
              id="barCouncilId"
              type="number"
              onChange={inputHandler}
              style={{ padding: "10px" }}
              placeholder={"Enter Bar Council ID"}
            />
          </Stack>
          <Stack>
            <Typography>Field</Typography>
            <Input
              id="field"
              onChange={inputHandler}
              style={{ padding: "10px" }}
              placeholder={"Enter Field"}
            />
          </Stack>
          {!editId.id && (
            <Stack>
              <Typography>Email</Typography>
              <Input
                id="email"
                onChange={inputHandler}
                style={{ padding: "10px" }}
                placeholder={"Enter Email"}
              />
            </Stack>
          )}
          {!editId.id && (
            <Stack>
              <Typography>Password</Typography>
              <Input
                id="password"
                type="password"
                onChange={inputHandler}
                style={{ padding: "10px" }}
                placeholder={"Enter Password"}
              />
            </Stack>
          )}
          <Stack alignItems={"flex-end"}>
            <Button onClick={submitHandler}>
              {editId.id ? "Edit" : "Create"}
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
      <Stack    flexDirection={"row"}
        justifyContent={"space-around"}
        sx={{ gap: 5, flexWrap: "wrap", padding: 10 }} >
        {lawyers?.map((e, i) => (
          <FaqAccordion
            data={e}
            onEdit={() => {
              handleOpen();
              setEditId(e);
            }}
            onDelete={() => deleteFunc(e.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Lawyers;
