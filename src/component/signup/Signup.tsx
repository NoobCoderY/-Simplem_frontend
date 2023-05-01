import React from 'react'
import { useFormik } from 'formik';
import { signUpSchema } from './SignUpSchema';
import { TextField ,InputAdornment, IconButton } from '@mui/material';

const Signup = () => {
    const formik = useFormik({
        initialValues: {
            name:"",
          email: "",
          password: "",
          confirm_password:""
        },
        validationSchema: signUpSchema,
    
        onSubmit: (values) => {
          console.log(values);
          
        },
      });
  return (
    <div><div className="container">
    <div className={ "signin signin_wrapper"} style={{margin:"100px"}}>
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

          <TextField
            name="confirm_password"
            type="confirm_password"
            placeholder="confirm_password"
            className="textField"
          
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password ? (
            <div className="error_msg">{formik.errors.confirm_password}</div>
          ) : null}

         

          <button type="submit">SignUp</button>
        </form>
     
    </div>
  </div></div>
  )
}

export default Signup