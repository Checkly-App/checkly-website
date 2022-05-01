import { React, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/Forms/InputField';
import { MdOutlineAlternateEmail, MdHttps } from "react-icons/md";
import { auth } from '../../utilities/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utilities/firebase';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components';
import HeaderSecondary from '../../components/Header/HeaderSecondary';
import { ReactComponent as LineShape } from '../../assets/images/LineShapeC.svg';
import { ReactComponent as SemiCircle } from '../../assets/images/SemiCircleD.svg';
import { HiOutlineMenuAlt2, HiX } from 'react-icons/hi';
import { Icon } from '../Home';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50vw;
    height: 100vh;
    background: radial-gradient(121.95% 137.23% at 50.01% 100%, #1675FE 16.8%, #5388F5 43.17%, #2AB2EF 88.7%, #25D0D0 100%);

    @media (max-width: 768px) {
    width: 100vw;
    height: 30vh;    
    }
`
const ThankYou = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 30vw;

    @media (max-width: 768px) {
    width: 90vw;
    }

    @media (width: 768px) {
        width: 98vw;
    }
`
const Title = styled.h1`
    font-weight: 500;
    font-size: 4em;
    color: white;

    @media (max-width: 768px) {
        font-size: 10vw;
    }

    @media (width: 768px) {
        font-size: 3em;
    }
`

const Quote = styled.div`
    margin-left: 2em;
    display: flex;
    flex-direction: row;
    font-weight: 400;
    font-size: 1em;
    line-height: 2em;
    color: #C0EAFD;
    text-align: justify;

    @media (max-width: 768px) {
        font-size: 3vw;
    }

    @media (width: 768px) {
        font-size: 0.8em;
    }
`
const EmDash = styled.p`
    padding-right: 1em;
`
const Line = styled(LineShape)`
    position: absolute;
    height: 100vh;
    right: 40%;

    @media (max-width: 768px) {
       display:none;
    }
`
const Circle = styled(SemiCircle)`
    position: absolute;
    height: 20vw;
    width: auto;
    right: 0;
    bottom: 15px;
`
const Left = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 50vw;

    @media (max-width: 768px) {
        width: 100vw;
        height: 70vh;    
    }
`
const Section = styled(Form)`
    width: 30vw;

     @media (max-width: 768px) {
        width: 60vw;
    }
`
const SectionTitle = styled.h1`
    font-size: 2em;
    font-weight: 500;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5em;
    }
`
const Description = styled.p`
    font-weight: 300;
    text-align: center;
    color: #A3A3A1;
    padding: 0 2.5em;
    margin-bottom: 2em;

    @media (max-width: 768px) {
        margin-bottom: 0.25em;
        font-size: 0.75em;
        padding: 0;
    }
`
// const Button = styled.button`
//     height: 2.75em;
//     width: 100%;
//     font-size: 1em;
//     font-weight: 500;
//     text-align :center;
//     color: rgba(255,255,255,0.9);
//     border-radius: 0.75em;
//     border: none;
//     background: linear-gradient(170deg, #56BBEB 0%, #58AAF3 100%);
//     margin-top: 1em;

//     @media (max-width: 768px) {
//         margin-bottom: 1em;
//     }
// `
// const Progress = styled(CircularProgress)`
//      height: 2.75em;
// `



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
  const [open, setOpen] = useState(false); // controls toggling the menu in mobiles

  // Function to set open from child components
  const updateOpen = (val) => setOpen(val);

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
    return cheak

  }

  const validationSchema =
    Yup.object({
      Password: Yup.string().required('Password  is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
    });


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
    paddingTop: "2%",
    // paddingLeft:"17em",
    textAlign: "right",
    textDecoration: "none",
  };

  return (
    <>
      <Icon onClick={() => setOpen(!open)}>
        {open ? <HiX /> : <HiOutlineMenuAlt2 />}
      </Icon>
      <HeaderSecondary open={open} updateOpen={updateOpen} />
      <Wrapper>
        <Left>

          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {

              if (isCompany(values.email)) {
                signInWithEmailAndPassword(auth, values.email, values.Password)
                  .then(() => {

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


                    setCount("InValid Email /Password")
                    setOpenSnackbar(true);

                  });
              }
              else {
                setCount("InValid Email /Password")
                setOpenSnackbar(true);

              }
            }}>

            <Section>
              <SectionTitle>Welcome To Checkly</SectionTitle>
              <Description>login to checkly to unlock its capabilities.</Description>

              <InputField

                name='email'
                icon={<MdOutlineAlternateEmail color='gray' />}
                id='email'
                label='Email'

              />



              <InputField
                name='Password'
                icon={<MdHttps color='gray' />}
                id='Password'
                label='Password'
                type="password"
              />




              <button style={Button} type='submit'>  Login to your account </button>



              <button style={Button1} onClick={() => navigate("/reset")}>  Forgot password? </button>

            </Section>


          </Formik >
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
          {/* <button style={Button1} onClick={() => navigate("/reset")}>  Forgot password? </button>
           */}
        </Left>
        <Line />
        <Circle />
        <Right >
          <ThankYou>
            <Title>Adavnce </Title>
            <Title>Rapidly </Title>
            {/* <Subtitle>Rapidly</Subtitle> */}
            <Quote>
              <EmDash> &mdash; </EmDash>
              <p>“The ideal conditions for making things are created when machines, facilities, and people work together to add value without generating any waste.”
              </p>
            </Quote>
          </ThankYou>
        </Right>
      </Wrapper>
    </>



  )

};
export default Login;


