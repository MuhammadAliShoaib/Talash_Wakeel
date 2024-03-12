import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirmsFromData } from "../config/firebase/FirebaseMethods";

const ClientHome = () => {
  const navigation = useNavigate();
  const [firms, setFirms] = useState([]);
  useEffect(() => {
    const foo = async () => {
      const data = await getFirmsFromData();
      setFirms(data);
    };
    foo();
  }, []);
  console.log("firms", firms);
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
        All Firms
      </Typography>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-around"}
        sx={{ gap: 5, flexWrap: "wrap", padding: 10 }}
      >
        {firms?.map((e) => (
          <Stack
            onClick={() => navigation(`/ViewLawyer/${e?.id}`)}
            sx={{
              padding: 2,
              backgroundColor: "rgb(156 79 108 / 10%)",
              border: "1px solid lightgray",
              borderRadius: 5,
              // width: "150px",
              height: "150px",
              boxShadow: 1,
              cursor: "pointer",
              ":hover": {
                boxShadow: 5,
              },
            }}
          >
            <Stack style={{alignItems:'center'}}>
              <img src={e?.logoImg} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10 }} />
              <Typography
                variant="p"
                fontSize={18}
                style={{
                  wordWrap: "break-word",
                }}
                textTransform={"capitalize"}
                fontWeight={"bold"}
                textAlign={"start"}
              >
                {e?.firstName + " " + e?.lastName}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography style={{
                wordWrap: "break-word",
              }} color={"black"} fontWeight={"bold"} fontSize={14}>
                Email:
              </Typography>
              <Typography style={{
                wordWrap: "break-word",
              }} variant="p" fontSize={14} color={"gray"} textAlign={"start"}>
                {e?.email}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography style={{
                wordWrap: "break-word",
              }} color={"black"} fontWeight={"bold"} fontSize={14}>
                Phone number:
              </Typography>
              <Typography style={{
                wordWrap: "break-word",
              }} variant="p" fontSize={14} color={"gray"} textAlign={"start"}>
                {e?.phoneNumber}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography style={{
                wordWrap: "break-word",
              }} color={"black"} fontWeight={"bold"} fontSize={14}>
                City:
              </Typography>
              <Typography style={{
                wordWrap: "break-word",
              }} variant="p" fontSize={14} color={"gray"} textAlign={"start"}>
                {e?.city}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ClientHome;
