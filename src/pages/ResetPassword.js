import { React, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Forms/InputField';
import { MdOutlineAlternateEmail,MdHttps } from "react-icons/md";
import { Container, Grid } from '@mui/material';
import {auth}  from '../utilities/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { padding, textAlign } from '@mui/system';
import Reset from './AddEmployee'
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import UILogin from '../assets/images/UILogin.png';
import Loginpic from '../assets/images/Loginpic.png';
import Logo from '../assets/images/logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>

  
   const ResetPaaword = () => {
  
     const navigate = useNavigate()
     const [count, setCount] = useState(null);
            
    const initialValues = {

        email: '',
      
    };
  


    const validationSchema =
        Yup.object({
           
           
            email: Yup.string().email('Invalid email').required('Email is required'),
          
        });
        const mystyle = {
          //   color: "white",
            
          //  // background: linear-gradient( rgba(255,0,0,0), rgba(255,0,0,1)),
          //  padding:'9%',
          //   paddingLeft: "10%",
          //   paddingRight: "10%",
           
            fontFamily: "Arial",
            background:  "linear-gradient(#56BBEB, #58AAF3)",
             height: "100vh" , 
              margin: "auto" ,
              paddingTop: "8%",
              paddingLeft:"5%",
    paddingRight:"5%"
          
          };
          const mystyle1 = {
            // padding: "10%",
            //  paddingTop: "15%",
            
          //  padding : 0
         //  hight :"100%" ,
           maxHeight :"100vh",
           textAlign :"center",
           margin: "auto",
    //Padding: "50em 50px",
    paddingLeft:"5%",
    paddingRight:"5%"
          };
          const subTitle = {
           color :"gray",
           textAlign :"center" ,
           padding : "10px" ,
           paddingLeft : "0px" ,
           paddingTop : "0px" ,
           paddingRight : "0px" ,
          };
          const Button = {
            background: "linear-gradient(#56BBEB, #58AAF3)",
      color: "white",
      width:"100%",
      maxHeight :"100vh",
      padding: "10px",
      paddingLeft: "30px" ,
      paddingRight: "30px" ,
      borderRadius: "5px",
     border : "none",
      cursor: "pointer",
    };
    const Button1 = {
      background: "none",
    color: "#2CB1EF",
    border : "none",
    cursor: "pointer",
    };
    const overlay = {
     //  position: "absolute", 
       width:"80%",
     
    // //  //top:"50"
    // // left:"0",
     //  paddingTop:"5em" ,
    //   paddingLeft:"5%" ,
     //margin: " auto" ,
     // Padding: "50em 55px",
      
    }
return (
 
<div class="container-fluid " id='height'>
    <div class="row" id='height' >
    <nav class="navbar navbar-expand-lg navbar-light" style={{position: "absolute"}}>
				<div class="container-fluid justify-content-center">
        <img src={Logo}  alt="logo" style={{width:"30px",height:"30px"}}/> <a style={{ fontWeight:"500",paddingLeft:"4px"}}>  Checkly</a>
				  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				  </button>
				  <div class="collapse navbar-collapse" id="navbarNavDropdown" style={{marginLeft: "12em"}}>
					<ul class="navbar-nav m-auto">
					  <li class="nav-item">
						<a class="nav-link active blue" aria-current="page" href="#" style={{color:"#2CB1EF" ,padding:"1em 2em" }}>Home</a>
					  </li>
					  <li class="nav-item">
						<a class="nav-link white" href="#" style={{color:"white" ,padding:"1em 2em"}}>About</a>
					  </li>
					  <li class="nav-item">
						<a class="nav-link white" href="#" style={{color:"white" ,padding:"1em 2em"}}>Services</a>
					  </li>
					  <li class="nav-item">
						<a class="nav-link white" href="#" style={{color:"white" ,padding:"1em 2em"}}>Contact</a>
					  </li>
					</ul>
				  </div>
				</div>
			  </nav>
      
   
    <div class="col-md-6 red" style={ mystyle1}>
      {/* <div class="container" style={mystyle1}> */}
         
     
          <h2 tyle={{ paddingTop: "12%"}}>Reset Your Password</h2>
        
          <p style={subTitle}>Enter your E-mail to receive your password replacement E-mail</p>
        
          <p  style={{color :"red"}} role="alert">
 {count}
</p>
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              sendPasswordResetEmail(auth, values.email)
              .then(() => {
                alert(JSON.stringify("Great! Check your inbox for a reset message", null, 2));
                setCount(null) 
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setCount("Please enter valid email") 
                // ..
              });
               
              
            }}>
           
                <Form>
                    
                        <Grid item xs={12}>
                            <InputField
                               
                                name='email'
                                icon={<MdOutlineAlternateEmail color='gray' />}
                                id='email'
                                label='Email'
                               
                            />
                         </Grid>
                       

                        <Grid item xs={12}>
                            <button  style={Button} type='submit'> Reset Your Password </button>
                        </Grid>
                        
                        
                       
                        
                   
                </Form>
                

        </Formik >
      
  </div> 
  <div class="col-md-6 blue" style={mystyle}>
  {/* <img src={UILogin}  alt="logo" style={overlay}/>  */}


<img src={Loginpic}  alt="logo" style={overlay}/>
 
    {/* <h1 style={{fontSize:"50px"}}>Adavnce <br/>Rapidly</h1>
    <p style={{fontSize:"10px" , paddingLeft:"5%"}}>“The ideal conditions for making things are created when machines, facilities, and people work together to add value without generating any waste.”
-Kiichiro Toyoda, founder of Toyota Motor Corporation, strongly believed in this philosoph</p>  */}
  
  </div>
</div>

</div> 
 


)

   } ;
export default ResetPaaword;

