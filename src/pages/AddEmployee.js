import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Grid, Typography } from '@material-ui/core';
import SelectField from '../components/Forms/SelectField';
import DateField from '../components/Forms/DateField';

// import { useState } from "react";

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

const AddEmployee = props => {
    const departments = {
        dep1: 'Enterprise Architecture',
        dep2: 'Cyber Security',
        dep3: 'Human Resources'
    };

    const initialValues = {
        fullName: '',
        nationalID: '',
        phoneNumber: '',
        date: '',
        address: '',
        email: '',
        employeeId: '',
        department: '',
        position: ''
    };

    const validationSchema =
        Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            nationalID: Yup.string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "consists of numbers only").min(10, 'must be 10 digits').max(10, 'must be 10 digits').required('National ID is required'),
            phoneNumber: Yup.number().min(10).max(10).required(),
            department: Yup.string().required(),
            email: Yup.string().email('Invalid email').required()
        });

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}>
            <Form>
                <Grid container spacing={3}>
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
                            name='email'
                            icon={<MdOutlineAlternateEmail color='gray' />}
                            id='email'
                            label='Email'
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
                        <DateField
                            name='birthdate'
                            id='birthdate'
                            label='Birthdate'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <button type='submit'>
                            hello
                        </button>
                    </Grid>
                </Grid>
            </Form>
        </Formik >
    );
};



export default AddEmployee;