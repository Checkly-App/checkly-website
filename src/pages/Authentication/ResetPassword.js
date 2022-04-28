import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { auth } from '../../utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { React, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utilities/firebase';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import styled from 'styled-components';
import HeaderSecondary from '../../components/Header/HeaderSecondary';
import { ReactComponent as LineShape } from '../../assets/images/LineShapeC.svg';
import { ReactComponent as SemiCircle } from '../../assets/images/SemiCircleD.svg';
import { HiOutlineMenuAlt2, HiX } from 'react-icons/hi';
import { Icon } from '../Home';
import 'bootstrap/dist/js/bootstrap.bundle.min';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>



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

const ResetPaaword = () => {

  // const navigate = useNavigate()
  const [count, setCount] = useState(null);
  const [issend, setIssend] = useState(null);
  const [iserror, setiserror] = useState(null);
  const [open, setOpen] = useState(false); // controls toggling the menu in mobiles

  // Function to set open from child components
  const updateOpen = (val) => setOpen(val);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };
  const initialValues = {

    email: '',

  };

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
                sendPasswordResetEmail(auth, values.email)
                  .then(() => {

                    setCount(null)
                    setIssend("Check your inbox for a reset message")
                    setiserror(false)
                    setOpenSnackbar(true);

                  })
                  .catch(() => {

                    setCount("Please enter a valid email")
                    setiserror(true)

                    setOpenSnackbar(true);



                  });
              } else {
                setCount("Please enter a valid email")
                setiserror(true)

                setOpenSnackbar(true);

              }

            }}>


            <Section>
              <SectionTitle>Reset Your Password</SectionTitle>
              <Description>Enter your E-mail to receive your password replacement E-mail.</Description>




              <InputField

                name='email'
                icon={<MdOutlineAlternateEmail color='gray' />}
                id='email'
                label='Email'

              />




              <button style={Button} type='submit'> Reset Your Password </button>















            </Section>


          </Formik >

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


    //     <div className="container-fluid " id='height'>
    //       <div className="row" id='height' >
    //         <nav className="navbar navbar-expand-lg navbar-light" style={{ position: "absolute" }}>
    //           <div className="container-fluid justify-content-center">
    //             <img src={Logo} alt="logo" style={{ width: "30px", height: "30px" }} /> <a style={{ fontWeight: "500", paddingLeft: "4px" }}>  Checkly</a>
    //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //               <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ marginLeft: "12em" }}>
    //               <ul className="navbar-nav m-auto">
    //                 <li className="nav-item">
    //                   <a className="nav-link active blue" aria-current="page" href="#" style={{ color: "#2CB1EF", padding: "1em 2em" }}>Home</a>
    //                 </li>
    //                 <li className="nav-item">
    //                   <a className="nav-link white" href="#" style={{ color: "white", padding: "1em 2em" }}>About</a>
    //                 </li>
    //                 <li className="nav-item">
    //                   <a className="nav-link white" href="#" style={{ color: "white", padding: "1em 2em" }}>Services</a>
    //                 </li>
    //                 <li className="nav-item">
    //                   <a className="nav-link white" href="#" style={{ color: "white", padding: "1em 2em" }}>Contact</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </nav>


    //         <div className="col-md-6 red" style={mystyle1}>
    //           {/* <div class="container" style={mystyle1}> */}
    //           {/* {issend ? <div class="alert alert-success" role="alert">
    //             {issend}
    //           </div> : null} */}

    //           <h2 tyle={{ paddingTop: "12%" }}>Reset Your Password</h2>

    //           <p style={subTitle}>Enter your E-mail to receive your password replacement E-mail</p>

    //           {/* {count ? <p class=" alert-danger" role="alert">
    //             {count}</p> : null} */}
    //           <Formik
    //             initialValues={{ ...initialValues }}
    //             validationSchema={validationSchema}
    //             onSubmit={(values) => {
    //               const v = isCompany(values.email)
    //               if (isCompany(values.email)) {
    //                 sendPasswordResetEmail(auth, values.email)
    //                   .then(() => {

    //                     setCount(null)
    //                     setIssend("Check your inbox for a reset message")
    //                     setiserror(false)
    //                     setOpenSnackbar(true);

    //                   })
    //                   .catch((error) => {

    //                     setCount("Please enter a valid email")
    //                     setiserror(true)

    //                     setOpenSnackbar(true);


    //                     // ..
    //                   });
    //               } else {
    //                 setCount("Please enter a valid email")
    //                 setiserror(true)

    //                 setOpenSnackbar(true);

    //               }

    //             }}>

    //             <Form>
    //               {iserror ?
    //                 (<Snackbar
    //                   autoHideDuration={6000}
    //                   open={openSnackbar}
    //                   onClose={closeSnackbar}
    //                   anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
    //                   <Alert onClose={closeSnackbar} severity='error' variant='filled'>
    //                     <AlertTitle>Error</AlertTitle>
    //                     {count}
    //                   </Alert>
    //                 </Snackbar>) :
    //                 (<Snackbar
    //                   open={openSnackbar}
    //                   autoHideDuration={6000}
    //                   onClose={closeSnackbar}
    //                   anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
    //                   <Alert severity='success' variant='filled'>
    //                     <AlertTitle>Success!</AlertTitle>
    //                     {issend}
    //                   </Alert>
    //                 </Snackbar>)}
    //               <Grid item xs={12}>
    //                 <InputField

    //                   name='email'
    //                   icon={<MdOutlineAlternateEmail color='gray' />}
    //                   id='email'
    //                   label='Email'

    //                 />
    //               </Grid>


    //               <Grid item xs={12}>
    //                 <button style={Button} type='submit'> Reset Your Password </button>
    //               </Grid>





    //             </Form>


    //           </Formik >

    //         </div>
    //         <div className="col-md-6 blue" style={mystyle}>
    //           {/* <img src={UILogin}  alt="logo" style={overlay}/>  */}


    //           <img src={Loginpic} alt="logo" style={overlay} />

    //           {/* <h1 style={{fontSize:"50px"}}>Adavnce <br/>Rapidly</h1>
    //     <p style={{fontSize:"10px" , paddingLeft:"5%"}}>“The ideal conditions for making things are created when machines, facilities, and people work together to add value without generating any waste.”
    // -Kiichiro Toyoda, founder of Toyota Motor Corporation, strongly believed in this philosoph</p>  */}

    //         </div>
    //       </div>

    //     </div>



  )

};
export default ResetPaaword;


