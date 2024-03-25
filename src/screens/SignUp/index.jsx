import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthContainer from "../../components/AuthContainer";
import FirmSignup from "./firmSignup";
import ClientSignup from "./clientSignup";
import { useFormik } from "formik";
import { clientSignupValidationSchema, firmSignupValidationSchema } from "../../utils/validation";
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [formType, setFormType] = useState("client");

  // To validate client form
  const clientFormik = useFormik({
    initialValues: {
      clientFirstName: "",
      clientLastName: "",
      clientEmail: "",
      clientPhoneNumber: "",
      clientCity: "",
      clientPassword: "",
    },
    validationSchema: clientSignupValidationSchema,
    onSubmit: async (values) => {
      try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(values.clientPassword, salt);
      const response = await axios.post('/api/client/register', {
        clientFirstName: values.clientFirstName,
        clientLastName: values.clientLastName,
        clientEmail: values.clientEmail,
        clientPhoneNumber: values.clientPhoneNumber,
        clientCity: values.clientCity,
        clientPassword: hashedPassword,
      })
      if(!response) {
        throw new Error('Something Went Wrong')
      }
      toast.success(`${response.data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      } catch (error) {
       console.log('Error Occured: ', error) 
      }
    }
  })
  
  // To validate firm form
  const firmFormik = useFormik({
    initialValues: {
      firmName: "",
      barCouncilId : 0,
      firmEmail: "",
      firmPhoneNumber: "",
      firmCity: "",
      firmPassword: ""
    },
    validationSchema: firmSignupValidationSchema,
    onSubmit: async (values) => {
      try {
      const unix = +new Date();
      const firmID = [values.firmName, unix].join('-');
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(values.firmPassword, salt);

      console.log(values.firmName)
      const response = await axios.post('/api/firm/createFirm', {
        firmID: firmID,
        firmName: values.firmName,
        barCouncilId : values.barCouncilId,
        firmEmail: values.firmEmail,
        firmPhoneNumber: values.firmPhoneNumber,
        firmCity: values.firmCity,
        firmPassword: hashedPassword,
      })
      if(!response) {
        throw new Error('Something Went Wrong')
      }
      toast.success(`${response.data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      } catch (error) {
       console.log('Error Occured: ', error) 
      }
    }
  })
  


  return (
    <AuthContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grid item xs={12} mt={'8px'}>
            <Button variant="outlined" value={formType} onClick={() => {
                if(formType === 'client') {
                    setFormType('firm');
                } else {
                    setFormType('client');
                }
            }} >
                {formType === 'client' ? 'Switch to Firm' : 'Switch to Client'}
            </Button>
          </Grid>
          <Box>
          {formType === 'client' ? <ClientSignup clientFormik={clientFormik} /> : <FirmSignup firmFormik={firmFormik} /> }
          </Box>
        </Box>
      </Container>
    </AuthContainer>
  );
}