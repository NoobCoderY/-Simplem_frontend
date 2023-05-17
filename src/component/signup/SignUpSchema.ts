import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(4).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please min 10 length password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password must match"),
});