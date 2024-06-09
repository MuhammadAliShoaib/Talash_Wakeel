import React, { useEffect, useState } from "react";
import { Button, Grid, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "./styles.css";
import { AddDocumentModal } from "../Modal/AddDocumentModal";
import Header from "../Header";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

export const ViewDocuments = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [documents, setDocuments] = useState([]);
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    (async () => {
      if (auth.role === "lawyer") {
        try {
          const res = await axiosPrivate.get("/lawyer/getDocuments", {
            params: { ownerId: id },
          });

          if (!res) {
            throw new Error("Something went wrong!");
          }

          setDocuments(res.data.documents);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })();
  }, []);

  return (
    <div>
      <Header title="Client Documents" />
      <Container maxWidth="false" disableGutters sx={{ padding: "10px" }}>
        <Grid container spacing={2} sx={{ my: 0 }}>
          <Grid item xs={12} md={2}></Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          ></Grid>
        </Grid>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {documents?.map((document, index) => {
            return (
              <div key={index} class="documentContainer">
                <h4>{document.title}</h4>
                <img
                  src={document.docURL}
                  style={{ width: "90%", height: "90%" }}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
