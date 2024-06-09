import { useState } from "react";
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
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { setAuth, auth } = useAuth();
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
      console.log(loginType);
      const authEndpoint = {
        client: "/api/clientAuth/login",
        firm: "/api/firmAuth/login",
        lawyer: "/api/lawyerAuth/login",
      }[loginType];

      try {
        const response = await axios.post(
          authEndpoint,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const userData = {
          client: {
            name: response.data.client?.clientFirstName || "",
            email: response.data.client?.clientEmail || "",
            clientID: response.data.client?.clientID || "",
            accessToken: response.data.accessToken || "",
            role: "client",
          },
          firm: {
            name: response.data.firm?.firmName || "",
            email: response.data.firm?.firmEmail || "",
            firmCouncilId: response.data.firm?.firmCouncilId || "",
            accessToken: response.data.accessToken || "",
            role: "firm",
          },
          lawyer: {
            name: response.data.lawyer?.firstName || "",
            email: response.data.lawyer?.email || "",
            lawyerCouncilId: response.data.lawyer?.lawyerCouncilId || "",
            firmCouncilId: response.data.lawyer?.firmCouncilId || "",
            accessToken: response.data.accessToken || "",
            role: "lawyer",
          },
        }[loginType];

        setAuth(userData);

        if (response.status === 200) {
          navigate(`/${loginType}`);
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
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage, {
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
          console.log(error);
          toast.error("Internal Server Error", {
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
                <FormControlLabel
                  value="lawyer"
                  control={<Radio />}
                  label="Lawyer"
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
              {/* <Grid item xs>
                <Link href="" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
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
