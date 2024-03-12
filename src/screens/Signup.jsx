import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SMInput from "../components/SMInput";
import { useFormik } from "formik";
import Image from "../assets/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { signupValidation } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { signup_async } from "../store/services/authService";
import { asyncStatus } from "../utils/asyncStatus";
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { createUser } from "../config/firebase/FirebaseMethods";
import AuthContainer from "../components/common/AuthContainer/AuthContainer";
import AuthInput from "../components/common/AuthInput/AuthInput";
import CustomButton from "../components/common/Button/Button";
import { inputLabel, primaryColour } from "../utils/colorTheme";
import { user_type_constant } from "../utils/constants";
import FileUpload from "../components/FileUploadInput/FileUpload";
// import UserContext from '../../config/contextAPI/userContext';

function Signup() {
  // const context = useContext(UserContext);
  const { signup_status, signup_error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const initialValues = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  // };
  // const [data, setData] = useState({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  // })
  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //     useFormik({
  //         initialValues: initialValues,
  //         validationSchema: signupValidation,
  //         onSubmit: values => {
  //             console.log("requested", values)
  //             createUser(values,dispatch)
  //         },
  //     });
  // console.log("values", values);

  const [signUpData, setSignUpData] = useState({
    userType: user_type_constant.CLIENT,
  });

  const InputHandler = (e, forRadio = false, forSelect = false) => {
    setSignUpData((prev) => {
      if (forRadio) {
        return { ...prev, userType: e.target.value };
      } else if (forSelect) {
        return { ...prev, city: e.target.value };
      } else {
        return { ...prev, [e.target.id]: e.target.value };
      }
    });
  };

  const submitHandler = () => {
    createUser(signUpData, dispatch);
    // dispatch(signup_async(signUpData))
  };
  // const handleSubmit = () => {
  //     createUser(data, dispatch)
  // }
  // const handleChange = (e) => {
  //     const { value, name } = e.target
  //     setData((prev)=>{ return {...prev, [name]: value} })
  // }
  // console.log(data)
  const navigate = useNavigate();
  const loading = signup_status === asyncStatus.LOADING;

  const CLIENT_LABEL = <span style={{ fontWeight: "bold" }}>Client</span>;
  const FIRM_LABEL = <span style={{ fontWeight: "bold" }}>Firm</span>;

  const [imgData, setImgData] = useState("");
  const [localImg, setlocalImg] = useState("");
  const fileHandler = (e) => {
    //GET IMAGE LOCALLY
    setImgData(e.target.files[0]);
    setSignUpData({ ...signUpData, logoImg: e.target.files[0] });
    if (e.target.files[0]) {
      setlocalImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      {/* <div className="signup">
                <div className="signupBox">
                    <div className="signupDetails">
                        <h1>Signup</h1>
                        <form  >
                            <div>
                                <SMInput autoComplete="off" type="text" name="firstName" value={values.firstName} onBlur={handleBlur} onChange={handleChange} icon={<PersonIcon />} placeholder="Enter First Name" />
                                {errors.firstName && touched.firstName ? (
                                    <span className='red'>{errors.firstName}</span>
                                ) : null}
                            </div>
                            <div>
                                <SMInput autoComplete="off" type="text" name="lastName" value={values.lastName} onBlur={handleBlur} onChange={handleChange} icon={<PersonIcon />} placeholder="Enter Last Name" />
                                {errors.lastName && touched.lastName ? (
                                    <span className='red'>{errors.lastName}</span>
                                ) : null}
                            </div>
                            <div>
                                <SMInput autoComplete="off" type="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} icon={<EmailIcon />} placeholder="Enter email" />
                                {errors.email && touched.email ? (
                                    <span className='red'>{errors.email}</span>
                                ) : null}
                            </div>
                            <div>
                                <SMInput autoComplete="off" type="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} icon={<LockIcon />} placeholder="Enter password" />
                                {errors.password && touched.password  || signup_status===asyncStatus.ERROR? (
                                    <span className='red'>{signup_error?signup_error:errors.password}</span>
                                ) : null}
                            </div>

                            <div>
                                <button type='submit' className='register' disabled={signup_status===asyncStatus.LOADING} onClick={handleSubmit} >{signup_status===asyncStatus.LOADING?<CircularProgress color='inherit' size={20}/>:"Register"}</button>
                            </div>
                        </form>
                    </div>
                
                    <div className="signupImage">
                        <img src={Image} width={300} height={300} />
                        <span>Already registered?<Link to="/login">Login</Link></span>
                    </div>
                </div>
            </div> */}
      <Container>
        <AuthContainer>
          <Stack maxWidth={600} mx={"auto"}>
            <Stack>
              <Typography variant="h2" className="heading">
                Sign Up
              </Typography>
            </Stack>

            <Stack>
              <Stack mt={1}>
                <Typography>
                  Get started by choosing your user type and creating an
                  account.
                </Typography>
              </Stack>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{
                  fontWeight: "bold",
                }}
                onChange={(e) => InputHandler(e, true)}
              >
                <FormControlLabel
                  value={user_type_constant.CLIENT}
                  control={
                    <Radio
                      sx={{
                        color: primaryColour,
                        "&.Mui-checked": {
                          color: primaryColour,
                        },
                      }}
                    />
                  }
                  labelPlacement="end"
                  label={CLIENT_LABEL}
                />
                <FormControlLabel
                  labelPlacement="end"
                  value={user_type_constant.FIRM}
                  control={
                    <Radio
                      sx={{
                        color: primaryColour,
                        "&.Mui-checked": {
                          color: primaryColour,
                        },
                        fontWeight: "bold",
                      }}
                    />
                  }
                  color={primaryColour}
                  label={FIRM_LABEL}
                  sx={{ fontWeight: "bold" }}
                />
              </RadioGroup>
            </Stack>
            {/* Firms

Name
Contact
Email
Password
ID number
City bhi rakhna hai


User

Name
Contact
Email
Password 
City ager possible ho toh */}
            {signUpData?.userType === user_type_constant.CLIENT ? (
              <Grid container rowGap={2} mt={2}>
                <Grid item xs={6} pr={2}>
                  <AuthInput
                    onChange={InputHandler}
                    id="firstName"
                    label={"First Name"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AuthInput
                    id={"lastName"}
                    onChange={InputHandler}
                    label={"Last Name"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthInput
                    id={"email"}
                    onChange={InputHandler}
                    label={"Email Address"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthInput
                    type={"number"}
                    id={"phoneNumber"}
                    onChange={InputHandler}
                    label={"Contact No"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontSize={17} color={inputLabel}>
                    Select City
                  </Typography>
                  <Select
                    sx={{ fontSize: 14, height: "40px", borderRadius: 2 }}
                    onChange={(e) => InputHandler(e, false, true)}
                    id="city"
                    fullWidth
                  >
                    <MenuItem value={"Karachi"}>Karachi</MenuItem>
                    <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <AuthInput
                    label={"Password"}
                    showPasswordLabel
                    forPassword
                    showPassHiddenIcon
                    id={"password"}
                    onChange={InputHandler}
                  />
                  {signup_status === asyncStatus.ERROR ? (
                    <span className="red">
                      {signup_error ? signup_error : ""}
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    disable={loading}
                    onClick={submitHandler}
                    style={{ width: "100%", fontSize: 17, fontWeight: "bold" }}
                  >
                    {!loading ? (
                      "Submit"
                    ) : (
                      <CircularProgress size={20} color="inherit" />
                    )}
                  </CustomButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontSize={12} textAlign={"center"}>
                    Already have an Account ?{" "}
                    <span
                      className="span-link"
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            ) : signUpData?.userType === user_type_constant.FIRM ? (
              <Grid container rowGap={2} mt={2}>
                <Grid item xs={6} pr={2}>
                  <AuthInput
                    onChange={InputHandler}
                    id="firstName"
                    label={"Firm First Name"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AuthInput
                    id={"lastName"}
                    onChange={InputHandler}
                    label={"Firm Last Name"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthInput
                    id={"email"}
                    onChange={InputHandler}
                    label={"Email Address"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthInput
                    type={"number"}
                    id={"phoneNumber"}
                    onChange={InputHandler}
                    label={"Contact No"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthInput
                    type={"number"}
                    id={"Bar Council ID"}
                    onChange={InputHandler}
                    label={"Bar Council ID"}
                  />
                </Grid>
                <Grid item xs={12}>
                  {localImg && (
                    <Box>
                      <img
                        src={localImg}
                        width={"100px"}
                        height={"100px"}
                        style={{ objectFit: "contain" }}
                        alt="productImg"
                      />
                    </Box>
                  )}
                  <FileUpload
                    onChange={fileHandler}
                    sx={{
                      backgroundImage: `linear-gradient( 92.88deg,
                #455eb5 9.16%,
                #5643cc 43.89%,
                #673fd7 64.72%);`,
                    }}
                  >
                    {localImg ? "Change Firm Image" : "Add Firm Image"}
                  </FileUpload>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontSize={17} color={inputLabel}>
                    Select City
                  </Typography>
                  <Select
                    sx={{ fontSize: 14, height: "40px", borderRadius: 2 }}
                    onChange={(e) => InputHandler(e, false, true)}
                    id="city"
                    fullWidth
                  >
                    <MenuItem value={"Karachi"}>Karachi</MenuItem>
                    <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <AuthInput
                    label={"Password"}
                    showPasswordLabel
                    forPassword
                    showPassHiddenIcon
                    id={"password"}
                    onChange={InputHandler}
                  />
                  {signup_status === asyncStatus.ERROR ? (
                    <span className="red">
                      {signup_error ? signup_error : ""}
                    </span>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    disable={loading}
                    onClick={submitHandler}
                    style={{ width: "100%", fontSize: 17, fontWeight: "bold" }}
                  >
                    {!loading ? (
                      "Submit"
                    ) : (
                      <CircularProgress size={20} color="inherit" />
                    )}
                  </CustomButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontSize={12} textAlign={"center"}>
                    Already have an Account ?{" "}
                    <span
                      className="span-link"
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
          </Stack>
        </AuthContainer>
      </Container>
    </>
  );
}

export default Signup;
