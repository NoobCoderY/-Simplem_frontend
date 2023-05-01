import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phoneNo: Yup.number().min(10).required("Please enter your phone no"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password must match"),
});