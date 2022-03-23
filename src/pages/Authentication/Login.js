import { React, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/Forms/InputField';
import { MdOutlineAlternateEmail, MdHttps } from "react-icons/md";
import { Grid } from '@mui/material';
import { auth } from '../../utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Loginpic from '../../assets/images/Loginpic.png';
import Logo from '../../assets/images/logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utilities/firebase';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { getAuth, onAuthStateChanged } from "firebase/auth";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>


const Login = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    const ac = new AbortController();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        const index = userAuth?.email.indexOf("@")
        const subst = userAuth?.email.substring(index)
        if (subst === "@checkly.org") {
          navigate("/checkly")
        }
        else {
          navigate("/admin/dashboard")
        }
      } else {
        navigate("/login")
      }
      ac.abort()
    })
    return unsubscribe
  }, [navigate])

  const initialValues = {
    Password: '',
    email: '',
  };


  const emailValid = (email) => {

    const index = email.indexOf("@")
    const subst = email.substring(index)

    if (subst === "@checkly.org") {
      return true
    }
    else {
      return false
    }
  }
  const isCompany = (email) => {
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

  }

  const validationSchema =
    Yup.object({
      Password: Yup.string().required('Password  is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
    });

  const mystyle = {
    fontFamily: "Arial",
    background: "linear-gradient(#56BBEB, #58AAF3)",
    height: "100vh",
    margin: "auto",
    paddingTop: "8%",
    paddingLeft: "5%",
    paddingRight: "5%"
  };
  const mystyle1 = {
    maxHeight: "100vh",
    textAlign: "center",
    margin: "auto",
    paddingLeft: "6%",
    paddingRight: "6%"
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
  const Button1 = {
    background: "none",
    color: "#2CB1EF",
    border: "none",
    cursor: "pointer",
  };
  const overlay = {
    //  position: "absolute", 
    width: "80%",

    // //  //top:"50"
    // // left:"0",
    //  paddingTop:"5em" ,
    //   paddingLeft:"5%" ,
    //margin: " auto" ,
    // Padding: "50em 55px",

  }
  return (
    <div className="container-fluid ">
      <div className="row"  >
        <nav className="navbar navbar-expand-lg navbar-light" style={{ position: "absolute" }}>
          <div className="container-fluid justify-content-center">
            <img src={Logo} alt="logo" style={{ width: "30px", height: "30px" }} /> <a style={{ fontWeight: "500", paddingLeft: "4px" }}>  Checkly</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ marginLeft: "12em" }}>
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <a className="nav-link active blue" aria-current="page" href="#" style={{ color: "Black", padding: "1em 2em" }}>Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link white" href="#" style={{ color: "white", padding: "1em 2em" }}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link white" href="#" style={{ color: "white", padding: "1em 2em" }}>Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link white" href="#" style={{ color: "white", padding: "1em 2em" }}>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="col-md-6 red" style={mystyle1}>
          <h2 style={{ paddingTop: "12%" }}>Welcome To Checkly</h2>
          <p style={subTitle}>login to checkly to unlock its capabilities</p>
          {/* 
          {count ? <p class=" alert-danger" role="alert">
            {count}</p> : null} */}

          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const v = isCompany(values.email)
              console.log(v)
              if (isCompany(values.email)) {
                signInWithEmailAndPassword(auth, values.email, values.Password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    setCount(null)
                    if (emailValid(values.email)) {
                      window.history.replaceState(null, null, "/checkly")
                      navigate("/checkly")
                    }
                    else {
                      window.history.replaceState(null, null, "/admin/dashboard")
                      navigate("/admin/dashboard")
                    }
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    setCount("InValid Email /Password")
                    setOpenSnackbar(true);

                  });
              }
              else {
                setCount("InValid Email /Password")
                setOpenSnackbar(true);

              }
            }}>

            <Form>
              <Snackbar
                autoHideDuration={6000}
                open={openSnackbar}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <Alert onClose={closeSnackbar} severity='error' variant='filled'>
                  <AlertTitle>Error</AlertTitle>
                  {count}
                </Alert>
              </Snackbar>
              <Grid item xs={12}>
                <InputField

                  name='email'
                  icon={<MdOutlineAlternateEmail color='gray' />}
                  id='email'
                  label='Email'

                />
              </Grid>
              <Grid item xs={12}>

                <InputField
                  name='Password'
                  icon={<MdHttps color='gray' />}
                  id='Password'
                  label='Password'
                  type="password"
                />

              </Grid>

              <Grid item xs={12}>
                <button style={Button} type='submit'>  Login to your account </button>
              </Grid>





            </Form>


          </Formik >
          <Grid item xs={12}>
            <button style={Button1} onClick={() => navigate("/reset")}>  Forgot password? </button>
          </Grid>

        </div>
        {/* </div> */}
        <div className="col-md-6 blue" style={mystyle}
        >
          {/* <img src={UILogin}  alt="logo" style={overlay}/>  */}
          {/* <div class="container" style={mystyle}> */}
          {/* <img src=".../public/logo512.png" alt="Italian Trulli" /> */}

          <img src={Loginpic} alt="logo" style={overlay} />

          {/* <h1 style={{fontSize:"50px"}}>Adavnce <br/>Rapidly</h1> */}
          {/*  <p style={{fontSize:"10px" , paddingLeft:"5%"}}>“The ideal conditions for making things are created when machines, facilities, and people work together to add value without generating any waste.”
-Kiichiro Toyoda, founder of Toyota Motor Corporation, strongly believed in this philosoph</p>  */}

        </div>
      </div>

    </div>



  )

};
export default Login;


