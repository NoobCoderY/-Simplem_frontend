import { useFormik } from "formik";
import { signUpSchema } from "./SignUpSchema";
import { TextField, InputAdornment, IconButton, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { addUser } from "../../Redux/UserSlice";
import { useAppDispatch,useAppSelector } from "../../Redux/Store";

const Signup = () => {
  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [registerUser, { error, data }] = useMutation(register_User);
  const notify = (message: string) => toast(message);
  // const StyledTextField = styled(TextField)({
  //   "& fieldset": { border: "1px solid #B6B6B4" },
  //   "& .MuiOutlinedInput-root": {
  //     height: "42.51px",
  //     "& fieldset": {
  //       borderColor: "#B6B6B4",
  //     },
  //     "&.Mui-focused fieldset": {
  //       border: "1px solid #B6B6B4",
  //     },
  //   },
  // });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const add_data = async () => {
        await axios
          .post(
            "http://localhost:8000/graphql",
            {
              query: ` mutation registerUser($name: String!, $email: String!, $password: String!) {
          registerUser(name: $name, email: $email, password: $password) {
            _id
            name
            email
          }
        }`,
              variables: {
                name: values.name,
                email: values.email,
                password: values.password,
              },
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((data) => {
            if (Object.keys(data.data).includes("errors")) {
              notify(data.data.errors[0].message);
            } else {
              dispatch(addUser(data.data.data.registerUser));
              notify("successfully signed up");
              setTimeout(() => {
                navigate("/profile");
              }, 1000);
            }
          });
      };
      add_data();
    },
  });

  return (
    <div>
      <div className="container">
        <div className={"signin signin_wrapper"} >
          <form onSubmit={formik.handleSubmit}>
            <h3>SignUp Form</h3>
            <TextField
              name="name"
              type="text"
              placeholder="Name"
              className="textField"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error_msg">*{formik.errors.name}</div>
            ) : null}
            <TextField
              name="email"
              type="text"
              placeholder="Email"
              className="textField"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error_msg">*{formik.errors.email}</div>
            ) : null}

            <TextField
              name="password"
              type="text"
              placeholder="Password"
              className="textField"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error_msg">*{formik.errors.password}</div>
            ) : null}
            <TextField
              name="confirm_password"
              type="text"
              placeholder="confirm_password"
              className="textField"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div className="error_msg">*{formik.errors.confirm_password}</div>
            ) : null}
            <button type="submit">SignUp</button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3001}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Signup;
