import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be atleast 3 character")
    .max(255, "Name should be less than 255 character")
    .required("Name is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string()
    .min(6, "password should be atleast 6 character")
    .max(255, "Name should be less than 255 character")
    .required("password is required."),
  phone: Yup.string()
    .length(10, "Phone number should be exact of 10 digits")
    .required("phone is required."),
  address: Yup.string()
    .min(10, "password should be atleast 10 character")
    .max(255, "Name should be less than 255 character")
    .required("address is required."),
  role: Yup.string().required("role is required."),
});

export { signupSchema };
