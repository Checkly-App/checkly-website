import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Grid } from '@mui/material';
import { auth } from '../../utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Loginpic from '../../assets/images/Loginpic.png';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utilities/firebase';
import { Alert, AlertTitle,  Snackbar } from '@mui/material';

import Logo from '../../assets/images/logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>


const ResetPaaword = () => {

  // const navigate = useNavigate()
  const [count, setCount] = useState(null);
  const [issend, setIssend] = useState(null);
  const [iserror, setiserror] = useState(null);
  //  const navigate = useNavigate()

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
};
  const initialValues = {

    email: '',

  };

  const isCompany = (email) => {
    console.log(email)
    var cheak = true
    onValue(ref(database, 'Employee'), (snapshot) => {
      const data = snapshot.val();

      for (let id in data) {
        if (data[id]['email'] === email) { // TODO: - 
          cheak = false


        }


      }


    });

    console.log(cheak)
    return cheak
    // console.log(isValid)
    // console.log(count1)
  }

  const validationSchema =
    Yup.object({


      email: Yup.string().email('Invalid email').required('Email is required'),

    });
  const mystyle = {
   
    height: "100vh",
  // maxHeight:"100vh",
   fontFamily: "Arial",
   background: "linear-gradient(#56BBEB, #58AAF3)",
   textAlign: "center",
    margin: "auto",
  //  paddingTop: "10%",
   // paddingLeft: "5%",
   // paddingRight: "5%"
  };
  const mystyle1 = {
    // padding: "10%",
    //  paddingTop: "15%",

    //  padding : 0
    //  hight :"100%" ,
    maxHeight: "100vh",
    textAlign: "center",
    margin: "auto",
    //Padding: "50em 50px",
    paddingLeft: "8%",
    paddingRight: "7%"
  };
  const subTitle = {
    color: "gray",
    textAlign: "center",
    padding: "10px",
    paddingLeft: "0px",
    paddingTop: "0px",
    paddingRight: "0px",
  };
  const Button = {
    background: "linear-gradient(#56BBEB, #58AAF3)",
    color: "white",
    width: "100%",
    maxHeight: "100vh",
    padding: "10px",
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const overlay = {
    //  position: "absolute", 
    width: "80%",
  
    marginTop:"3em",
        // //  //top:"50"
        // // left:"0",
          paddingTop:"2%" ,
    // //  //top:"50"
    // // left:"0",
    //  paddingTop:"5em" ,
    //   paddingLeft:"5%" ,
    //margin: " auto" ,
    // Padding: "50em 55px",

  }
  return (

    <div className="container-fluid " id='height'>
      <div className="row" id='height' >
        <nav className="navbar navbar-expand-lg navbar-light" style={{ position: "absolute" }}>
          <div className="container-fluid">
          <div style={{paddingTop:"1%"}}> <img src={Logo} alt="logo" style={{ width: "35px", height: "35px" }} /> <a style={{ fontWeight: "500",fontSize:"20px"}}>  Checkly</a>
          
          </div> 
          
            <div >
              
              <ul className="navbar-nav" >
               
                <li className="nav-item" style={{paddingTop:'0.6em', padding: "0.3em 0em",float:"right"}}>
                  <a  href="/login" className="nav-link white" style={{ color: "white", padding: "0.3em 1.5em" ,borderRadius: '10px',border:'white 1px solid'}}>Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="col-md-6 red" style={mystyle1}>
        

          <h2 tyle={{ paddingTop: "12%" }}>Reset Your Password</h2>

          <p style={subTitle}>Enter your E-mail to receive your password replacement E-mail</p>

          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const v = isCompany(values.email)
              console.log(v)
              if (isCompany(values.email)) {
                sendPasswordResetEmail(auth, values.email)
                  .then(() => {

                    setCount(null)
                    setIssend("Check your inbox for a reset message")
                    setiserror(false)
                    setOpenSnackbar(true);

                  })
                  .catch((error) => {
                   console.log(error)
                    setCount("Please enter a valid email")
                    setiserror(true)

                    setOpenSnackbar(true);


                    // ..
                  });
              } else {
                setCount("Please enter a valid email")
                setiserror(true)

                setOpenSnackbar(true);

              }

            }}>

            <Form>
            {iserror ?
                    (<Snackbar
                        autoHideDuration={6000}
                        open={openSnackbar}
                        onClose={closeSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                        <Alert onClose={closeSnackbar} severity='error' variant='filled'>
                            <AlertTitle>Error</AlertTitle>
                            {count}
                        </Alert>
                    </Snackbar>) :
                    (<Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                        <Alert severity='success' variant='filled'>
                            <AlertTitle>Success!</AlertTitle>
                           {issend}
                        </Alert>
                    </Snackbar>)}
              <Grid item xs={12}>
                <InputField

                  name='email'
                  icon={<MdOutlineAlternateEmail color='gray' />}
                  id='email'
                  label='Email'

                />
              </Grid>


              <Grid item xs={12}>
                <button style={Button} type='submit'> Reset Your Password </button>
              </Grid>





            </Form>


          </Formik >

        </div>
        <div className="col-md-6 blue" style={mystyle}>
        


        
          <img src={Loginpic} alt="logo" style={overlay} />
         
        

        </div>
      </div>

    </div>



  )

};
export default ResetPaaword;


