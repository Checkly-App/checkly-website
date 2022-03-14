import logo from './assets/images/logo.svg';
import './App.css';
import { React, useState, useEffect } from 'react';
import { Formik, Form, useFormik } from 'formik';
import InputField from './components/Forms/InputField';
import SelectField from './components/Forms/SelectField';
import RadioButtons from './components/Forms/RadioButtons';
import styled, { keyframes } from 'styled-components'
import * as Yup from "yup"
import {database} from './firebase';
import { createTheme, ThemeProvider } from '@mui/material/styles'


const theme = createTheme({
  palette: {
    primary: {
      main: '#2CB1EF'
    },
    grey: {
      main: '#A3A1A1',
      secondary: '#A3A1A1',
      disabled: '#A3A1A1',
      hint: '#A3A1A1'
    },
    error: {
      main: '#F65786'
    }
  }
});


const Section = styled.div`
    background-color: white;
    border-radius: 0.75em;
    padding: 3em;
    margin-bottom: 3em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5em;
    row-gap: 0.75em;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
  }
`

const SectionTitle = styled.h1`
    font-size: 1em;
    font-weight: 600;
    margin: 1em 0em 1em 0em;
    grid-column: 1 / 3;
    @media (max-width: 768px) {
           grid-column: 1;
  }
`
const SetionsWrapper = styled.div`
    margin: 5em;
`
const Button = styled.button`
    width: 15em;
    height: 3em;
    font-size: 1em;
    font-weight: 500;
    text-align :center;
    color: rgba(255,255,255,0.9);
    border-radius: 0.5em;
    border: none;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
`
const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas: 'bar main';
  justify-items: stretch;
  justify-content: center;
`
const SideBar = styled.div`
  grid-area: bar;
  display: flex;
  align-items: center;
  background-color: white;
`
const Content = styled.div`
  grid-area: main;
  display: subgrid;
  align-items: center;
  background-color: #F5F5F5;
`
    const initialValues = {
      email: "",
      name: "",
      size: "",
      location: "",
      industry: "",
      prefrence: ""
    };

      const validationSchema =
        Yup.object({
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
        });

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
    
      <ThemeProvider theme={theme}>
      <AppContainer className="App">
        <SideBar> Sidebar Content</SideBar>
        <Content>
        <SetionsWrapper>
    
        <form  className = "form-box" onSubmit={formik.handleSubmit}>
         <Section>
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

              <Button type='submit'>  Add an employee </Button>
          </Section>

          <Section>
          {/* photo */}
          <input
          type="file"
          accept="image/*"
          id="contained-button-file"
          />
          {/* employees */}
          <input
          type="file"
          accept="image/*"
          id="contained-button-file"
          />
          {/* geofence */}
          <input
          type="file"
          accept="image/*"
          id="contained-button-file"
          />
          {/* departments */}
          <input
          type="file"
          accept="image/*"
          id="contained-button-file"
          />
          </Section> 
           
            
        </form>
        
     </SetionsWrapper>
        </Content>
      </AppContainer >
    </ThemeProvider>
  );
}

export default App;
