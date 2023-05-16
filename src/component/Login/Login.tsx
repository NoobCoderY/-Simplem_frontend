import { useFormik } from "formik";
import { LoginSchema } from "./LoginSchema";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../../Redux/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";

const Login = () => {
  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const notify = (err: string) => {
    toast(err);
  };
 
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const add_data = async () => {
        const data = await axios
          .post(
            "http://localhost:8000/graphql",
            {
              query: ` mutation loginUser(
                $email: String!
                $password: String!
              ) {
                loginUser(email: $email, password: $password) {
                  _id,
                  name,
                  email,
                }
              }`,
              variables: {
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
              dispatch(addUser(data.data.data.loginUser));
              console.log(data.data.data.loginUser);
              
              notify("successfully logged in");
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
            <h4 style={{ textAlign: "center" }}>Login Form</h4>
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
              <div className="error_msg">{formik.errors.email}</div>
            ) : null}
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              className="textField"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error_msg">{formik.errors.password}</div>
            ) : null}
            <button type="submit">Login</button>
            <h3>
              {" "}
              Not a member?{" "}
              <span className="login">
                <Link to="/signup">SignUp</Link>
              </span>
            </h3>
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

export default Login;
