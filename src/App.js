import logo from './assets/images/logo.svg';
import './App.css';
import React from 'react';
import {useFormik} from 'formik';
import * as Yup from "yup"
import {database} from './firebase';
import './Form.css';

function App() {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      size: "",
      location: "",
      industry: "",
      prefrence: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .required("Required")
      .email("invalid email"),
      name: Yup.string()
      .required("Required"),
      size: Yup.string()
      .required("Required"),
      location: Yup.string()
      .required("Required"),
      industry: Yup.string()
      .required("Required")
    }),
    onSubmit: values =>{
    let ref1 = database.ref().child('CompanyMock').push()
    ref1.set(values)
    }
  })
  return (
    <div className = "form-box">>
    
        <form  className = "form-box" onSubmit={formik.handleSubmit}>
            {/* name input */}
            <label> Name </label>
            <input type="text" 
            onChange={formik.handleChange} 
            value={formik.values.name}
            id='name' name='name'
            onBlur={formik.handleBlur}
            placeholder="name" />
            {/* validation */}
            {formik.errors.name && formik.touched.name ? <p> {formik.errors.name} </p> : null }
            {/* email input */}
            <label>E-mail</label>
            <input type="text" 
            onChange={formik.handleChange} 
            value={formik.values.email}
            id='email' name='email'
            onBlur={formik.handleBlur}
            placeholder="email" />
            {/* validation */}
            {formik.errors.email && formik.touched.email ? <p> {formik.errors.email} </p> : null }
            {/* location input */}
            <label> Location </label>
            <select
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
           <option value="" label="Select alocation" />
           <option value="riyadh" label="Riyadh" />
           <option value="aljawf" label="Aljawf" />
           <option value="tabuk" label="Tabuk" />
           <option value="hail" label="Hail" />
           <option value="makkah" label="Makkah" />
           <option value="qasim" label="Qasim" />
           <option value="asir" label="Asir" />
           <option value="najran" label="Najran" />
           <option value="eastern province" label="Eastern Province" />
           <option value="jizan" label="Jizan" />
           <option value="bahah" label="Bahah" />
           <option value="madinah" label="Madinah" />
           <option value="northern borders" label="Northern Borders" />
           </select>
           {/* validation */}
           {formik.errors.location && formik.touched.location ? <p> {formik.errors.location} </p> : null }
            {/* size input */}
            <label> size </label>
            <select
            name="size"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
           <option value="" label="Select a size" />
           <option value="1-10" label="1-10" />
           <option value="11-50" label="11-50" />
           <option value="51-200" label="51-200" />
           <option value="201-1000" label="201-1000" />
           <option value="1001-10000" label="1001-10000" />
           </select>
           {/* validation */}
           {formik.errors.size && formik.touched.size ? <p> {formik.errors.size} </p> : null }
           {/* industry input */}
            <label> industry </label>
            <select
            name="industry"
            value={formik.values.industry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
           <option value="" label="Select industry" />
           <option value="Biochemicals" label="Biochemicals" />
           <option value="Construction" label="Construction" />
           <option value="Investments" label="Investments" />
           <option value="Logistics" label="Logistics" />
           <option value="Travel agency" label="Travel agency" />
           <option value="Real estate" label="Real estate" />
           <option value="Utilities " label="Utilities" />
           <option value="Electricity and energy" label="Electricity and energy" />
           <option value="Education" label="Education" />
           <option value="Marketing agency" label="Marketing agency" />
           <option value="Information Technology" label="Information technology" />
           <option value="Consultation" label="Consultation" />
           <option value="Accounting" label="Accounting" />
           </select>
           {/* validation */}
           {formik.errors.industry && formik.touched.industry ? <p> {formik.errors.industry} </p> : null }

            <label> Preferred Attendance Recording Strategy </label>
            <label htmlFor= "QR code">QR code</label>
            <input type="radio" 
            onChange={formik.handleChange} 
            value= "QR code"
            id="QR code"
            name='prefrence' />
            <label htmlFor= "Location Based">Location Based</label>
            <input type="radio" 
            onChange={formik.handleChange} 
            value="Location Based"
            id="Location Based"
            name='prefrence' />
            <label htmlFor= "Both">Both</label>
            <input type="radio" 
            onChange={formik.handleChange} 
            value="Both"
            id="Both"
            name='prefrence' />
           
            <button type="submit"> Register </button>
        </form>
    </div>
  );
}

export default App;
