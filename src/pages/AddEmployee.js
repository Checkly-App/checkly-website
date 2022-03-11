import { React, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import SelectField from '../components/Forms/SelectField';
import RadioButtons from '../components/Forms/RadioButtons';
import { set, ref, onValue } from 'firebase/database';
import { database, auth } from '../utilities/firebase';
import DateField from '../components/Forms/DateField';
import { format } from 'date-fns';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styled, { keyframes } from 'styled-components'


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

const AddEmployee = () => {
    const [departments, setDepartments] = useState([{
        department: '',
        name: ''
    }]);

    useEffect(() => {
        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === 'com1') { // TODO: - company's id
                    const department = {
                        department: 'dep_' + data[id]['dep_id'],
                        name: data[id]['name']
                    };
                    departments.push(department)
                }
            }
            console.log(departments)
            setDepartments(departments);
        });
    }, []);

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

    const validationSchema =
        Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            nationalID: Yup.string().matches(/^(?<=\s|^)\d+(?=\s|$)/, "consists of numbers only").min(10, 'must be 10 digits').max(10, 'must be 10 digits').required('National ID is required'),
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string().matches(/^[0](\/?[0-9])*\/?$/, "Invalid phone format ").min(10, 'must be 10 digits').max(10, 'must be 10 digits').required('Phone Number is required'),
            birthdate: Yup.date().nullable().required('Birthdate is required').typeError("Date format must be: dd/MM/yyyy"),
            department: Yup.string().required('Department is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            employeeID: Yup.string().required('Employee ID is required'),
            position: Yup.string().required('Position is required')
        });


    const addEmployee = (employee) => {
        createUserWithEmailAndPassword(auth, employee.email, '123456').then((result) => {
            set(ref(database, 'test/' + result.user.uid), {
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
        }).catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(error);
            return;
        });
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
            <Form>
                <SetionsWrapper>
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
                    <Button type='submit'>  Add an employee </Button>
                </SetionsWrapper>
            </Form>
        </Formik>
    );
};



export default AddEmployee;


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