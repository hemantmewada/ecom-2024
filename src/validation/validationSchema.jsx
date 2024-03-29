import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be atleast 3 character")
    .max(255, "Name should be less than 255 character")
    .required("Name is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string()
    .min(6, "password should be atleast 6 character")
    .max(255, "password should be less than 255 character")
    .required("password is required."),
  phone: Yup.string()
    .length(10, "Phone number should be exact of 10 digits")
    .required("phone is required."),
  address: Yup.string()
    .min(10, "address should be atleast 10 character")
    .max(255, "address should be less than 255 character")
    .required("address is required."),
  role: Yup.string().required("role is required."),
});
const signinSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string()
    .min(6, "password should be atleast 6 character")
    .max(255, "Name should be less than 255 character")
    .required("password is required."),
});
const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
});
const otpVerificationSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  otp: Yup.string()
    .required("OTP is required.")
    .length(6, "OTP should be exact of 6 digit."),
});
const resetPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  otp: Yup.string()
    .required("OTP is required.")
    .length(6, "OTP should be exact of 6 digit."),
  newPassword: Yup.string()
    .min(6, "new password should be atleast 6 character")
    .max(255, "new password should be less than 255 character")
    .required("new password is required."),
  confirmPassword: Yup.string()
    .min(6, "confirm password should be atleast 6 character")
    .max(255, "confirm password should be less than 255 character")
    .required("confirm password is required.")
    .oneOf([Yup.ref("newPassword"), null], "password must match."),
});
const addEditCategorySchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be atleast 3 character")
    .max(255, "Name should be less than 255 character")
    .required("Name is required."),
});
const addProductCategorySchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be atleast 3 character")
    .max(255, "Name should be less than 255 character")
    .required("Name is required."),
  description: Yup.string()
    .required("Description is required.")
    .trim()
    .min(3, "Description can't be less than 3 characters."),
  // .max(255, "Description can't be greater than 255 characters."),
  price: Yup.string()
    .required("Price is required.")
    .min(1, "price can't be empty."),
  category: Yup.string().required("Category is required."),
  quantity: Yup.string()
    .required("quantity is required")
    .trim()
    .min(1, "quantity can't be empty."),
  // image: Yup.string().required("Product image is required."),
});

const updateProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name should be atleast 3 character")
    .max(255, "Name should be less than 255 character")
    .required("Name is required."),
  phone: Yup.string()
    .length(10, "Phone number should be exact of 10 digits")
    .required("phone is required."),
  address: Yup.string()
    .min(10, "address should be atleast 10 character")
    .max(255, "address should be less than 255 character")
    .required("address is required."),
});
export {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  otpVerificationSchema,
  resetPasswordSchema,
  addEditCategorySchema,
  addProductCategorySchema,
  updateProfileSchema,
};
