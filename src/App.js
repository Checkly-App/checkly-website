import logo from './assets/images/logo.svg';
import './App.css';
import React from 'react'
import { registerForm } from './registerForm'
import {useFormik} from 'formik'
import * as Yup from "yup"

function App() {
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .required("Required")
      .email("invalid email")
    }),
    onSubmit: (values) =>{
        alert(JSON.stringify(values,null,2))
    }
  })
  return (
    <div className="App">
    <h1> Register </h1>
        <form  onSubmit={formik.handleSubmit}>
            <label htmlfor="email"> Email Adrdess </label>
            <input type="text" 
            onChange={formik.handleChange} 
            value={formik.values.email}
            id='email' name='email'
            onBlur={formik.handleBlur}
            placeholder="email" />

            {formik.errors.email && formik.touched.email ? <p> {formik.errors.email} </p> : null }
           

            <button type="submit"> Register </button>
        </form>
    </div>
  );
}

export default App;
