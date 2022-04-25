import { React, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import styled from 'styled-components';
import { Alert, AlertTitle, CircularProgress, Snackbar } from '@mui/material';
import emailjs from '@emailjs/browser';
import HeaderSecondary from '../components/Header/HeaderSecondary';
import { ReactComponent as LineShape } from '../assets/images/LineShapeC.svg';
import { ReactComponent as SemiCircle } from '../assets/images/SemiCircleD.svg';
import { HiOutlineMenuAlt2, HiX } from 'react-icons/hi';
import { Icon } from './Home';

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
const Subtitle = styled.h1`
    font-weight: 400;
    font-size: 3em;
    color: white;

    @media (max-width: 768px) {
        font-size: 5vw;
    }

    @media (width: 768px) {
        font-size: 2em;
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
const Button = styled.button`
    height: 2.75em;
    width: 100%;
    font-size: 1em;
    font-weight: 500;
    text-align :center;
    color: rgba(255,255,255,0.9);
    border-radius: 0.75em;
    border: none;
    background: linear-gradient(170deg, #56BBEB 0%, #58AAF3 100%);
    margin-top: 1em;

    @media (max-width: 768px) {
        margin-bottom: 1em;
    }
`
const Progress = styled(CircularProgress)`
     height: 2.75em;
`

const Contact = () => {
    const [error, setError] = useState(false);
    const [errorDetails, setErrorDetails] = useState({
        title: 'error',
        description: 'Oops! Something went wrong, try again later.',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false); // controls toggling the menu in mobiles

    // Function to set open from child components
    const updateOpen = (val) => setOpen(val);
    /**
     * Form's Initial Values
     */
    const initialValues = {
        company: '',
        email: '',
        message: '',
    };

    /**
     * Form's validation patterns
     */
    const validationSchema =
        Yup.object({
            company: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            message: Yup.string().required('Full Name is required'),
        });

    const closeSnackbar = () => {
        setOpenSnackbar(false);
    };

    const sendEmail = (values) => {
        setIsLoading(true);

        emailjs.send('service_zuk03mc', 'template_k7bo86s', values, 'AZOFkjsyS0h81fZ0G')
            .then((result) => {
                setOpenSnackbar(true)
            }, (error) => {
                setError(true);
                setErrorDetails({
                    title: 'Could not send message',
                    description: 'Your message was not sent. Please send us an email at checkly.services@gmail.com',
                });
            });

        setIsLoading(false);
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
                        onSubmit={(values) => sendEmail(values)}>
                        <Section>
                            <SectionTitle>Contact us</SectionTitle>
                            <Description>For any business inquries, service requests and qestions enter your information below.</Description>
                            <InputField
                                name='company'
                                id='company'
                                label='Company'
                                margin='dense' />
                            <InputField
                                name='email'
                                icon={<MdOutlineAlternateEmail color='#D7D7D7' size={24} />}
                                id='email'
                                label='Email'
                                margin='dense'
                            />
                            <InputField
                                name='message'
                                id='message'
                                label='Message'
                                multiline
                                minRows={4}
                                maxRows={4}
                                margin='dense'
                            />
                            {isLoading ? <Progress /> : <Button type='submit'>  Submit </Button>}
                        </Section>
                    </Formik>
                    {error ?
                        (<Snackbar
                            autoHideDuration={6000}
                            open={openSnackbar}
                            onClose={closeSnackbar}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                            <Alert onClose={closeSnackbar} severity='error' variant='filled'>
                                <AlertTitle>{errorDetails.title}</AlertTitle>
                                {errorDetails.description}
                            </Alert>
                        </Snackbar>) :
                        (<Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={closeSnackbar}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                            <Alert severity='success' variant='filled'>
                                <AlertTitle>Email message was sent!</AlertTitle>
                                An Email message was sent, you will recive a reply shortly!
                            </Alert>
                        </Snackbar>)}
                </Left>
                <Line />
                <Circle />
                <Right >
                    <ThankYou>
                        <Title>Thank you, </Title>
                        <Subtitle>for your interest in us</Subtitle>
                        <Quote>
                            <EmDash> &mdash; </EmDash>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.     Faucibus urna dictum magna volutpat morbi. Volutpat tincidunt fermentum sit lobortis imperdiet egestas tellus tempus. Pretium tellus etiam porttitor massa rhoncus.</p>
                        </Quote>
                    </ThankYou>
                </Right>
            </Wrapper>
        </>

    );
};

export default Contact;