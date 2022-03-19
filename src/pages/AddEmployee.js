import { React, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import SelectField from '../components/Forms/SelectField';
import RadioButtons from '../components/Forms/RadioButtons';
import { set, ref, onValue } from 'firebase/database';
import { database, auth, functions } from '../utilities/firebase';
import DateField from '../components/Forms/DateField';
import { format } from 'date-fns';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import { httpsCallable } from 'firebase/functions';
import { Alert, AlertTitle, CircularProgress, Snackbar } from '@mui/material';

/**
 * Send Email Cloud Function 
 */
const sendEmail = httpsCallable(functions, 'sendEmail');

/**
 * Styled Components 
 */
const Section = styled.div`
    background-color: white;
    border-radius: 0.75em;
    padding: 3em;
    margin-bottom: 3em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.5em;
    row-gap: 0.75em;
    @media (max-width: 768px) {
        padding: 1em;
        grid-template-columns: 1fr;
        gap: 0.5em

  }
`
const SectionTitle = styled.h1`
    font-size: 1.05em;
    font-weight: 600;
    margin: 1em 0em 2em;
    grid-column: 1 / 3;
    @media (max-width: 768px) {
           grid-column: 1;
  }
`
const SetionsWrapper = styled.div`
    margin: 4em 8em;
     @media (max-width: 768px) {
            margin: 2em 3em;
  }
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
const MainTitle = styled.h1`
    font-size: 2em;
    font-weight: 500;
    color: #2CB1EF;
    margin: 0.25em 0;
`
const Subtitle = styled.p`
    font-size: 0.75em;
    color: #A3A1A1;
`
const MainWrapper = styled.div`
    width: 100%;
    margin: 2em 0;
`

const AddEmployee = () => {
    /**
     * Use States
     */
    const [error, setError] = useState(false);
    const [errorDetails, setErrorDetails] = useState({
        title: 'error',
        description: 'Oops! Something went wrong, try again later.',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [departments, setDepartments] = useState([{
        department: '',
        name: ''
    }]);
    const [employees, setEmployees] = useState([{
        nationalID: '',
        phoneNumber: '',
        employeeID: '',
        department: '',
    }]);

    /**
     * Use Effect to fecth all of the company's departments
     */
    useEffect(() => {
        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === 'com3') { // TODO: - company's id
                    const department = {
                        department: 'dep' + data[id]['dep_id'],
                        name: data[id]['name']
                    };
                    departments.push(department)
                }
            }
            setDepartments(departments);
        });
    }, []);

    useEffect(() => {
        const departmentsKeys = []
        for (let i in departments)
            departmentsKeys.push(departments[i]['department'])

        onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employees = [];
            for (let id in data) {
                if (departmentsKeys.includes(data[id]['department'])) {  //Fetch employees of a given company
                    const employee = {
                        nationalID: data[id]['national_id'],
                        phoneNumber: data[id]['phone_number'],
                        employeeID: data[id]['employee_id'],
                        department: data[id]['department'],
                    };
                    employees.push(employee)
                }
            }
            setEmployees(employees);
        });
    }, [departments])



    const employeeExists = (employee) => {
        for (let i in employees) {
            if (employee.nationalID === employees[i].nationalID) {
                setErrorDetails({
                    title: 'Employee Exists',
                    description: 'Another employee with the same national id exists'
                });
                return true;
            }
            if (employee.phoneNumber === employees[i].phoneNumber) {
                setErrorDetails({
                    title: 'Employee Exists',
                    description: 'Another employee with the same phone number exists'
                });
                return true;
            }
            if (employee.employeeID === employees[i].employeeID) {
                setErrorDetails({
                    title: 'Employee Exists',
                    description: 'Another employee with the same employee id exists'
                });
                return true;
            }

        }
        return false;
    };

    /**
     * Form's Initial Values
     */
    const initialValues = {
        fullName: '',
        nationalID: '',
        phoneNumber: '',
        birthdate: null,
        address: '',
        gender: 'Female',
        email: '',
        employeeID: '',
        department: '',
        position: ''
    };
    /**
     * Form's validation patterns
     */
    const validationSchema =
        Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            nationalID: Yup.string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "National ID should consist of numbers only").min(10, 'Must be 10 digits').max(10, 'Must be 10 digits').required('National ID is required'),
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string().matches(/^[0]{1}[5]{1}([0-9])*$/, "Invalid phone format must start with 05").min(10, 'Must be 10 digits').max(10, 'Must be 10 digits').required('Phone Number is required'),
            birthdate: Yup.date().nullable().max(new Date('01/01/2005'), "Maximum date is 01/01/2005").min(new Date('01/01/1920'), "Minimum date is 01/01/1920").required('Birthdate is required').typeError("Date format must be: dd/MM/yyyy"),
            department: Yup.string().required('Department is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            employeeID: Yup.string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "Employee ID should consist of numbers only").min(10, 'Must be 10 digits').max(10, 'Must be 10 digits').required('Employee ID is required'),
            position: Yup.string().required('Position is required')
        });

    /**
     * Close sack bar function
     */
    const closeSnackbar = () => {
        setOpenSnackbar(false);
    };
    /**
     * Add employee function - triggered when the form is submitted
     * @params employee - JSON Object containing employee's information
     */
    const addEmployee = (employee) => {
        setIsLoading(true);

        if (employeeExists(employee)) {
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            return;
        }

        const password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9); //might be vulnerable to brute-force attacks

        createUserWithEmailAndPassword(auth, employee.email, password).then((result) => {
            sendEmail({
                email: employee.email,
                name: employee.fullName,
                password: password,
            }).then(() => {
                set(ref(database, 'Employee/' + result.user.uid), {
                    name: employee.fullName,
                    national_id: employee.nationalID,
                    phone_number: employee.phoneNumber,
                    birthdate: format(employee.birthdate, 'dd/MM/yyyy'),
                    address: employee.address,
                    gender: employee.gender,
                    email: employee.email,
                    employee_id: employee.employeeID,
                    department: employee.department,
                    position: employee.position,
                    change_image: 0,
                    image_token: "null"
                });
                setError(false);
                setIsLoading(false);
                setOpenSnackbar(true);
            }).catch((error) => {
                setErrorDetails({
                    title: 'An Error Occured',
                    description: { error }
                });
                setError(true);
                setIsLoading(false);
                setOpenSnackbar(true);
                return;
            });
        }).catch((error) => {
            setErrorDetails({
                title: 'An Error Occured',
                description: 'The email exists within Checkly'
            });
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            return;
        });
    }

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                addEmployee(values);
            }}>
            <Form>
                <SetionsWrapper>
                    <MainWrapper>
                        <MainTitle>Add Employee</MainTitle>
                        <Subtitle>Start by adding an individual employee or a batch of employees</Subtitle>
                    </MainWrapper>
                    <Section>
                        <SectionTitle>Personal Information</SectionTitle>
                        <InputField
                            name='fullName'
                            id='fullName'
                            label='Full Name'
                        />
                        <InputField
                            name='nationalID'
                            id='nationalID'
                            label='National ID'
                        />
                        <InputField
                            name='phoneNumber'
                            id='phoneNumber'
                            label='Phone Number'
                        />
                        <DateField
                            name='birthdate'
                            id='birthdate'
                            label='Birthdate'
                        />
                        <InputField
                            name='address'
                            id='address'
                            label='Address'
                        />
                        <RadioButtons
                            name='gender'
                            id='gender'
                            label='Gender'
                        />
                    </Section>
                    <Section>
                        <SectionTitle>Work Information</SectionTitle>
                        <InputField
                            name='email'
                            icon={<MdOutlineAlternateEmail color='#D7D7D7' size={24} />}
                            id='email'
                            label='Email'
                        />
                        <InputField
                            name='employeeID'
                            id='employeeID'
                            label='Employee ID'
                        />
                        <SelectField
                            name='department'
                            id='department'
                            label='Department'
                            options={departments}
                        />
                        <InputField
                            name='position'
                            id='position'
                            label='Position'
                        />
                    </Section>
                    {isLoading ?
                        <CircularProgress /> : <Button type='submit'>  Add an employee </Button>}
                </SetionsWrapper>
                {error ? (<Snackbar
                    autoHideDuration={6000}
                    open={openSnackbar}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={closeSnackbar} severity='error' variant='filled'>
                        <AlertTitle>{errorDetails.title}</AlertTitle>
                        {errorDetails.description}
                    </Alert>
                </Snackbar>)
                    :
                    (<Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                        <Alert severity='success' variant='filled'>
                            <AlertTitle>Success!</AlertTitle>
                            An Email message was sent to the employee with their credentials!
                        </Alert>
                    </Snackbar>)}
            </Form>
        </Formik>
    );
};

export default AddEmployee;
