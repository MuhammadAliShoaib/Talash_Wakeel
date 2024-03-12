import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLawyersForClientFromDatabase } from "../config/firebase/FirebaseMethods";
import FaqAccordion from "../components/FaqAccordion/FaqAccordion";

const ViewLawyer = () => {
  const { id } = useParams();
  const [lawyers, setLawyers] = useState();
  useEffect(() => {
    const foo = async () => {
      const data = await getLawyersForClientFromDatabase(id);
      setLawyers(data);
    };
    foo();
  }, []);
  return (
    <Stack>
      <Typography
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textDecorationLine: "underline",
          color: "#9c4f6c",
        }}
      >
        All Lawyers
      </Typography>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-around"}
        sx={{ gap: 5, flexWrap: "wrap", padding: 10 }}
      >
        {lawyers?.length ? (
          lawyers?.map((e, i) => (
            // <FaqAccordion
            //   data={e}
            //   viewOnly={true}
            //   // onEdit={() => {
            //   //   handleOpen();
            //   //   setEditId(e?.id);
            //   // }}
            //   // onDelete={() => deleteFunc(e.id)}
            // />
            <Stack
              // onClick={() => navigation(`/ViewLawyer/${e?.id}`)}
              sx={{
                padding: 2,
                // backgroundColor: "lightgray",
                border: "1px solid lightgray",
                borderRadius: 5,
                // width: "150px",
                height: "150px",
                boxShadow: 1,
                cursor: "pointer",
                ":hover": {
                  boxShadow: 5,
                },
                gap: 2,
                flexDirection:'column',
                justifyContent:"space-between",
                alignItems:'center'
              }}
            >
              <Stack alignItems={"center"}>

                <Typography style={{
                  wordWrap: "break-word",
                }} variant="p" fontSize={18} textTransform={"capitalize"} fontWeight={"bold"} textAlign={"start"}>
                  {e?.firstName + " " + e?.lastName}
                </Typography>
                {/* <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography    style={{
                wordWrap: "break-word",
              }} color={"black"} fontWeight={"bold"} fontSize={14}>
                  Email: 
                </Typography>
                <Typography    style={{
                wordWrap: "break-word",
              }} variant="p"  fontSize={14}  color={"gray"} textAlign={"start"}>
                  {e?.email}
                </Typography>
              </Stack> */}
                <Stack flexDirection={"row"} alignItems={"center"} paddingTop={2}>
                  <Typography style={{
                    wordWrap: "break-word",
                  }} color={"black"} fontWeight={"bold"} fontSize={14}>
                    Field:
                  </Typography>
                  <Typography style={{
                    wordWrap: "break-word",
                  }} variant="p" fontSize={14} color={"gray"} textAlign={"start"}>
                    {e?.field}
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <Button
                  style={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                    gap: 2,
                    backgroundColor: "#9c4f6c",
                    color: "white",
                    padding: '5px'
                  }}

                >
                  <Typography>Book appointment</Typography>
                </Button>
              </Stack>
            </Stack>
          ))
        ) : (
          <Typography>No lawyers found!</Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default ViewLawyer;
