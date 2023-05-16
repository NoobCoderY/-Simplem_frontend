import React, { useEffect, useState } from "react";
import { useParams} from "react-router";
import { GET_USER_LIST_WITH_PASSWORD } from "../../Graphql/Queires";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import { TextField,styled} from "@mui/material";
import { useFormik } from "formik";
import { EditProfileSchema } from "./EditProfileSchema";
import axios from "axios";
import { Update_User } from "../../Graphql/Mutation";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "../../Redux/UserSlice";
import { useAppDispatch,useAppSelector } from "../../Redux/Store";

type user = {
  name: string;
  email: string;
  password: string;
};
const EditProfile = () => {

  const User = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const Navigate=useNavigate()
  
  const StyledTextField = styled(TextField)({
    '& fieldset': { border: '1px solid #B6B6B4' },
    '& .MuiOutlinedInput-root': {
      height: '42.51px',
      '& fieldset': {
        borderColor: '#B6B6B4',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #B6B6B4',
      }
    },
  })
  const notify = () => toast("Successfully Updated");
  const [userData, setuserData] = useState({
    name: "",
    email: " ",
    password: "",
  });
  const { id } = useParams<Record<string, string | undefined>>();
  useEffect(() => {
    axios({
      url: "http://localhost:8000/graphql",
      method: "POST",
      data: {
        query: ` query 
            {
              UserDetails(_id:"${id}"){
                  name,
                  email,
                  password
                }
              }`,
      },
    }).then((result: any) => {
      setuserData(result.data.data.UserDetails[0]);
    });
  }, []);

  const [userUpdate, { error, data }] = useMutation(Update_User);

  const formik = useFormik({
    initialValues: {
      name: userData?.name,
      email: userData?.email,
      password: userData?.password,
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      const add_data = async () => {
        const data = await userUpdate({
          variables: {
            _id: id,
            name: values.name,
            email: values.email,
            password: values.password,
          },
        }).then((data)=>{
          console.log(data.data.userUpdate)
          if(User._id===data.data.userUpdate._id)
          {
                   dispatch(addUser(data.data.userUpdate)) 
          }
          notify();
          setTimeout(()=>{
            Navigate("/profile")
          },1000)
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
