import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SMInput from '../components/SMInput.js';
import { useState } from 'react';
import { useFormik } from 'formik';

import Image from "../assets/signup.png"
import { Link, useNavigate } from 'react-router-dom';
import { loginValidation, signupValidation } from '../utils/validation.js';
import { useDispatch, useSelector } from 'react-redux';
import { asyncStatus } from '../utils/asyncStatus.js';
import { CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { loginUser } from '../config/firebase/FirebaseMethods.js';
import AuthContainer from '../components/common/AuthContainer/AuthContainer.js';
import AuthInput from '../components/common/AuthInput/AuthInput.js';
import CustomButton from '../components/common/Button/Button.js';

function Login() {
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        password: '',
    };
    const { login_status, login_error } = useSelector(state => state.auth)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: loginValidation,
            onSubmit: values => {
                console.log("aa", values);
                loginUser(values, dispatch)
            },
        });
    const [loginData, setLoginData] = useState({})

    const InputHandler = (e, forRadio) => {
        setLoginData((prev) => {
            // if (forPhone) {
            //   return { ...prev, contact_number: e }
            // }
            if (forRadio) {
                return { ...prev, user_type: e.target.value }
            } else {
                return { ...prev, [e.target.id]: e.target.value }
            }
        })
    }
    const submitHandler = () => {
        //   dispatch(login_async(loginData))

        loginUser(loginData, dispatch)
    }
    const navigate = useNavigate()
const loading = login_status===asyncStatus.LOADING
    return (
        <>
            {/* <div className="signup">
                <div className="signupBox">
                    <div className="loginDetails">
                        <h1>Login</h1>
                        <form>
                            <div>
                                <SMInput autoComplete="off" type="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} icon={<EmailIcon />} placeholder="Enter email" />
                                {errors.email && touched.email ? (
                                    <span className='red'>{errors.email}</span>
                                ) : null}
                            </div>
                            <div>
                                <SMInput autoComplete="off" type="password" name="password" value={values.password} onBlur={handleBlur} onChange={handleChange} icon={<LockIcon />} placeholder="Enter password" />
                                { login_status===asyncStatus.ERROR? (
                                    <span className='red'>{login_error?login_error:""}</span>
                                ) : null}
                            </div>

                            <div>
                                <button type='submit' className='register' disabled={login_status === asyncStatus.LOADING} onClick={handleSubmit} >{login_status === asyncStatus.LOADING ? <CircularProgress color='inherit' size={20} /> : "Login"}</button>
                            </div>
                        </form>
                    </div>
                    <div className="signupImage">
                        <img src={Image} width={300} height={300} />
                        <span>Create an account <Link to="/signup">Signup</Link></span>
                    </div>
                </div>
            </div> */}
            <Container>
                <AuthContainer>
                    <Stack maxWidth={600} mx={"auto"} rowGap={"30px"}>
                        <Stack>
                            <Typography variant="h2" className="heading">
                                Login
                            </Typography>
                        </Stack>
                        {/*  USER-TYPE RADIO BUTTONS
          <Stack>
            <Stack mt={1}>
              <Typography>
                Select your user type to access your account.
              </Typography>
            </Stack>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                fontWeight: "bold",
              }}
              // onChange={InputHandler}
            >
              <FormControlLabel
                value={user_type_constant.BUYER}
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
                label={BUYER_LABEL}
              />
              <FormControlLabel
                labelPlacement="end"
                value={user_type_constant.SELLER}
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
                label={SELLER_LABEL}
                sx={{ fontWeight: "bold" }}
              />
              <FormControlLabel
                labelPlacement="end"
                value={user_type_constant.BUSINESS_PARTNER}
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
                label={SELLER_PARTNER_LABEL}
                sx={{ fontWeight: "bold" }}
              />
            </RadioGroup>
          </Stack> */}

                        <Grid container rowGap={2} mt={2}>
                            <Grid item xs={12}>
                                <AuthInput
                                    id={"email"}
                                    onChange={InputHandler}
                                    label={"Please enter"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <AuthInput
                                    showPasswordLabel
                                    forPassword
                                    showPassHiddenIcon
                                    id={"password"}
                                    onChange={InputHandler}
                                    label={"Password"}
                                />
                              
                            </Grid>

                            <Grid item xs={12}>
                                {/* <CustomButton
                                    style={{ width: "100%", fontSize: 17, fontWeight: "bold" }}
                                    onClick={submitHandler}
                                >
                                    Login
                                </CustomButton> */}
                                <CustomButton
                                    disable={loading}
                                    onClick={submitHandler}
                                    style={{ width: "100%", fontSize: 17, fontWeight: "bold" }}
                                >
                                    {!loading ? "Login" : <CircularProgress size={20} color='inherit' />}
                                </CustomButton>
                            </Grid>
                            <Grid item xs={12}>
                                {login_status === asyncStatus.ERROR ? (
                                    <span className='red'>{login_error ? login_error : ""}</span>
                                ) : null}
                                <Typography fontSize={12} textAlign={"center"}>
                                    Don't have an Account ?{" "}
                                    <span
                                        onClick={() => navigate("/signup")}
                                        className="span-link">
                                        SignUp
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </AuthContainer>
            </Container>
        </>
    )
}

export default Login;