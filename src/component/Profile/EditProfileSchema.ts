import * as Yup from "yup";
export const EditProfileSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(4).required("Please min 10 length password"),
});