import React, { useEffect, useState } from "react";
import { Button, Grid, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "./styles.css";
import { AddDocumentModal } from "../Modal/AddDocumentModal";
import Header from "../Header";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// const docs = [
//   {
//     title: "CNIC",
//     imageUrl:
//       "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg",
//   },
//   {
//     title: "CNIC",
//     imageUrl:
//       "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg",
//   },
//   {
//     title: "CNIC",
//     imageUrl:
//       "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg",
//   },
// ];

export const AddDocuments = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [documents, setDocuments] = useState([]);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    (async () => {
      if (auth.role === "client") {
        try {
          const res = await axiosPrivate.get("/client/getDocuments", {
            params: { ownerId: auth?.clientID },
          });

          if (!res) {
            throw new Error("Something went wrong!");
          }
          console.log(res.data);
          setDocuments(res.data.documents);
          console.log("DOCS......", documents);
        } catch (error) {
          console.log("Error: ", error);
        }
      } else if (auth.role === "lawyer") {
        try {
          const res = await axiosPrivate.get("/lawyer/getDocuments", {
            params: { ownerId: auth?.lawyerCouncilId },
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
  }, [flag]);

  return (
    <div>
      <Header title="Documents" />
      <Container maxWidth="false" disableGutters sx={{ padding: "10px" }}>
        <AddDocumentModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          flag={flag}
          setFlag={setFlag}
        />
        <Grid container spacing={2} sx={{ my: 0 }}>
          <Grid item xs={12} md={2}></Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          ></Grid>
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
              Add Document
            </Button>
          </Grid>
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
