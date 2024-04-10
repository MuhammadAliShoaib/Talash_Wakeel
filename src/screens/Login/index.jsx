import { useState, useContext } from "react";
import { AuthContext } from "../../config/context/AuthProvider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthContainer from "../../components/AuthContainer";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utility/validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [loginType, setLoginType] = useState("client");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    setLoginType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      if (loginType === "client") {
        try {
          const response = await axios.post(
            "/api/clientAuth/login",
            {
              email: values.email,
              password: values.password,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          console.log(response.data);
          const name = response.data.client.clientFirstName;
          const email = response.data.client.clientEmail;
          const accessToken = response.data.accessToken;
          setAuth({ name, email, accessToken });
          if (!response) {
            throw new Error("Error Occured");
          }

          if (response.status === 200) {
            navigate("/client");
            toast.success(`Login Successful`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else if (error.response && error.response.status === 404) {
            toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.error(`Internal Server Error`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
      } else {
        try {
          const response = await axios.post(
            "/api/firmAuth/login",
            {
              email: values.email,
              password: values.password,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          console.log(response.data);
          const name = response.data.firm.firmName;
          const email = response.data.firm.firmEmail;
          const accessToken = response.data.accessToken;
          setAuth({ name, email, accessToken });

          if (!response) {
            throw new Error("Error Occured");
          }

          if (response.status === 200) {
            navigate("/firm");
            toast.success(`Login Successful`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else if (error.response && error.response.status === 404) {
            toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.error(`Internal Server Error`, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
      }
    },
  });

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
            Sign in
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <FormControl>
              <RadioGroup
                row
                name="loginType"
                value={loginType}
                onChange={handleLogin}
              >
                <FormControlLabel
                  value="client"
                  control={<Radio />}
                  label="Client"
                />
                <FormControlLabel
                  value="firm"
                  control={<Radio />}
                  label="Firm"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <Box component={"span"} sx={{ display: "inline", color: "red" }}>
                {formik.errors.email}
              </Box>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <Box component={"span"} sx={{ display: "inline", color: "red" }}>
                {formik.errors.password}
              </Box>
            ) : null}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </AuthContainer>
  );
}
