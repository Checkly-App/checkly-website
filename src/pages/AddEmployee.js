import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Container, Grid } from '@mui/material';
import SelectField from '../components/Forms/SelectField';
import RadioButtons from '../components/Forms/RadioButtons';
import { set, ref } from 'firebase/database';
import { database } from '../utilities/firebase';

const AddEmployee = () => {
    const departments = {
        dep1: 'Enterprise Architecture',
        dep2: 'Cyber Security',
        dep3: 'Human Resources'
    };

    const initialValues = {
        fullName: '',
        nationalID: '',
        phoneNumber: '',
        birthdate: '',
        address: '',
        gender: 'Female',
        email: '',
        employeeID: '',
        department: '',
        position: ''
    };

    /*
    phoneNumber: Yup.number().min(10).max(10).matches(/[^[0]+[0-9]*$]/),
    Full name -> (required)
    National Id -> 10 length and integer only (required)
    Phone Number -> 10 length and integer only (required)
    Date -> 18 or above - in a range (required)
    Address -> whatever
    Email -> email with @ and domain (required)
    Employee Id -> 10 length and integer only (required)
    Department -> From firebase (required)
    Position -> String (required)
*/


    const validationSchema =
        Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            nationalID: Yup.string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "consists of numbers only").min(10, 'must be 10 digits').max(10, 'must be 10 digits').required('National ID is required'),
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "consists of numbers only").min(10, 'must be 10 digits').max(10, 'must be 10 digits').required('Phone Number is required'),
            birthdate: Yup.string().required('Birthdate is required'),
            department: Yup.string().required('Department is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            employeeID: Yup.string().required('Employee ID is required'),
            position: Yup.string().required('Position is required')
        });

    const addEmployee = (employee) => {
        set(ref(database, 'test/' + employee.nationalID), {
            name: employee.fullName,
            national_id: employee.nationalID,
            phone_number: employee.phoneNumber,
            birthdate: employee.birthdate,
            address: employee.address,
            gender: employee.gender,
            email: employee.email,
            employee_id: employee.employeeID,
            department: employee.department,
            position: employee.position,
            change_image: 0,
            image_token: "null"
        }).catch(alert);
    }

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                addEmployee(values);
                alert(JSON.stringify(values, null, 2));
            }}>
            <Container fixed>
                <Form>
                    <Grid container spacing={3} >
                        <Grid item xs={6}>
                            <InputField
                                name='fullName'
                                id='fullName'
                                label='Full Name'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='nationalID'
                                id='nationalID'
                                label='National ID'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='phoneNumber'
                                id='phoneNumber'
                                label='Phone Number'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='birthdate'
                                id='birthdate'
                                label='Birthdate'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='address'
                                id='address'
                                label='Address'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RadioButtons
                                name='gender'
                                id='gender'
                                label='Gender'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='email'
                                icon={<MdOutlineAlternateEmail color='gray' />}
                                id='email'
                                label='Email'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='employeeID'
                                id='employeeID'
                                label='Employee ID'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectField
                                name='department'
                                id='department'
                                label='Department'
                                options={departments}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                name='position'
                                id='position'
                                label='Position'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button type='submit'>  Add an employee </button>
                        </Grid>
                    </Grid>
                </Form>
            </Container>

        </Formik >
    );
};



export default AddEmployee;