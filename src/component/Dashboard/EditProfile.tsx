import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { TextField, styled } from "@mui/material";
import { useFormik } from "formik";
import { EditProfileSchema } from "./EditProfileSchema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "../../Redux/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";

type user = {
  name: string;
  email: string;
  password: string;
};

const EditProfile = () => {
  const User = useAppSelector((state) => state.User)
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const notify = (message: string) => toast(message);
 
  const { id } = useParams<Record<string, string | undefined>>();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      const add_data = async () => {
        await axios
          .post("", {
            query: `  mutation UserUpdate(
          $_id: String
          $name: String!
          $email: String!
          $password: String!
        ) {
          UserUpdate(_id: $_id, name: $name, email: $email, password: $password) {
            _id
            name
            email
          }
        }`,
            variables: {
              _id: id,
              name: values.name,
              email: values.email,
              password: values.password,
            },
          })
          .then((data) => {
            if (Object.keys(data.data).includes("errors")) {
              notify(data.data.errors[0].message);
            } else {
              if (User._id === data.data.data.UserUpdate._id) {
                dispatch(addUser(data.data.data.UserUpdate));
              }
              notify("successfully updated");
              setTimeout(() => {
                Navigate("/profile");
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
        <div className={"signin signin_wrapper"}>
          <form onSubmit={formik.handleSubmit}>
            <h3>Edit Form</h3>
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
              <div className="error_msg">{formik.errors.name}</div>
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
            <button type="submit">Confirm</button>
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

export default EditProfile;
