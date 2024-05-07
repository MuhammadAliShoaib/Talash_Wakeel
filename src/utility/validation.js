import * as Yup from "yup";

export const firmSignupValidationSchema = Yup.object({
  firmName: Yup.string().required("Firm name is required"),
  firmBarCouncilId: Yup.number().min(7).required("Council ID is required"),
  firmEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firmPhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be a valid phone number")
    .min(11, "Phone number must be at least 11 digits")
    .required("Phone number is required"),
  firmCity: Yup.string().required("City is required"),
  firmPassword: Yup.string().min(5).required("Password is required"),
});

export const createLawyerValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  lawyerBarCouncilId: Yup.number().min(7).required("Council ID is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  type: Yup.string().required("Type is required"),
  password: Yup.string().min(5).required("Password is required"),
});

export const clientSignupValidationSchema = Yup.object().shape({
  clientFirstName: Yup.string().required("First name is required"),
  clientLastName: Yup.string().required("Last name is required"),
  clientEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  clientPassword: Yup.string().min(5).required("Password is required"),
  clientCity: Yup.string().required("City is required"),
  clientPhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be a valid phone number")
    .min(11, "Phone number must be at least 11 digits")
    .required("Phone number is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string()
    .min(5, "Password is Invalid")
    .required("Password is required"),
});
