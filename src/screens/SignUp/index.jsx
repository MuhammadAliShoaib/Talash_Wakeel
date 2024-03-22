import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthContainer from "../../components/AuthContainer";
import { cities } from "../../utils/data";
import { MenuItem, Radio, RadioGroup} from "@mui/material";
import FirmSignup from "./firmSignup";
import ClientSignup from "./clientSignup";
import { useFormik } from "formik";
import { clientValidationSchema } from "../../utils/validation";

export default function SignUp() {
  const [formType, setFormType] = useState("client");

const clientFormik = useFormik({
  initialValues: {
    clientFirstName: "",
    clientLastName: "",
    clientPhoneNumber: "",
    clientEmail: "",
    clientPassword: "",
    clientCity: "",
  },
  validationSchema:{clientValidationSchema},
  onSubmit: async (values) => {
    console.log(values)
  }
})

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          {formType === 'client' ? <ClientSignup submit={clientFormik.handleSubmit} /> : <FirmSignup submit={handleSubmit} /> }
          </Box>
        </Box>
      </Container>
    </AuthContainer>
  );
}