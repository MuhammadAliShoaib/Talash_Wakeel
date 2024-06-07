import React, { useState } from "react";
import Header from "../../../components/Header";
import { Button, Grid, Container, Typography } from "@mui/material";
import { AddDocumentModal } from "../../../components/Modal/AddDocumentModal";

import "./styles.css"
import { AddDocuments } from "../../../components/AddDocument";


const docs = [
  {
    title: 'CNIC',
    imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg"
  },
  {
    title: 'CNIC',
    imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg"
  },
  {
    title: 'CNIC',
    imageUrl: "https://res.cloudinary.com/dg8syp8h6/image/upload/v1716020742/cld-sample.jpg"
  },
]


export const ClientDocuments = () => {


  return (
    <AddDocuments />
  )
};
