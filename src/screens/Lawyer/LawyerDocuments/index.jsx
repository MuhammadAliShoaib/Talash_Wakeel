import React, { useState } from "react";
import Header from "../../../components/Header";
import { Button, Grid, Container, Typography } from "@mui/material";
import { AddDocumentModal } from "../../../components/Modal/AddDocumentModal";

import "./styles.css";
import { AddDocuments } from "../../../components/AddDocument";

export const LawyerDocuments = () => {
  return <AddDocuments />;
};
