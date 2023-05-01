import React from 'react';
import { useFormik } from 'formik';
import { LoginSchema } from './LoginSchema';
// import { Person, Lock } from "@material-ui/icons";
import { TextField ,InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: LoginSchema,
    
        onSubmit: (values) => {
          console.log(values);
          
        },
      });
  return (
    <div>

<div className="container">
      <div className={ "signin signin_wrapper"} style={{margin:"100px"}}>
          <form onSubmit={formik.handleSubmit}>
            <h4>Login Form</h4>
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
            <h3> Not a member? <span className="login"><Link to="/signup">SignUp</Link></span></h3>
          </form>
       
      </div>
    </div>
    </div>
  );
}

export default Login;