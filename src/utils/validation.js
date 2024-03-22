import * as Yup from "yup";


export const firmSignupValidationSchema = Yup.object({
    firmName: Yup.string().required("Firm name is required"),
    firmEmail: Yup.string().email("Invalid email address").required("Email is required"),
    firmPhoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be a valid phone number")
        .min(11, "Phone number must be at least 11 digits")
        .required("Phone number is required"),
    firmAddress: Yup.string().required("Firm address is required"),
    firmCity: Yup.string().required("City is required"),
    firmPassword: Yup.string().required("Password is required"),
});

export const clientValidationSchema = Yup.object().shape({
    clientFirstName: Yup.string().required("First name is required"),
    clientLastName: Yup.string().required("Last name is required"),
    clientEmail: Yup.string().email("Invalid email address").required("Email is required"),
    clientPassword: Yup.string().required("Password is required"),
    clientCity: Yup.string().required("City is required"),
    clientPhoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be a valid phone number")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
});

// export const signupValidation = Yup.object({
//     firstName : Yup.string().min(3).max(25).required("Please enter your First name"),
//     lastName : Yup.string().min(3).max(25).required("Please enter your Last Name"),
//     email : Yup.string().email().required("Please enter your Email"),
//     password : Yup.string().min(6).required()

// })
export const loginValidation = Yup.object({
    email : Yup.string().email().required("Please enter your Email"),
    password : Yup.string().min(6).required()

})