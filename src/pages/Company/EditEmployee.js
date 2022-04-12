import { React, useState, useEffect } from 'react';
import { getAuth, updateEmail, updateUser } from "firebase/auth";
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/Forms/InputField';
import { MdOutlineAlternateEmail } from "react-icons/md";
import SelectField from '../../components/Forms/SelectField';
import RadioButtons from '../../components/Forms/RadioButtons';
import { ref, onValue, update } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';

import DateField from '../../components/Forms/DateField';
import styled from 'styled-components';
import { Alert, AlertTitle, CircularProgress, Snackbar } from '@mui/material';
import { functions } from '../../utilities/firebase';

import { httpsCallable } from 'firebase/functions';



/**
 * Send Email Cloud Function 
 */
const updateUserEmail = httpsCallable(functions, 'updateUserEmail');



/**
 * Send Email Cloud Function 
 */

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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 2em 8em;
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
    margin-left: auto;

`
const Progress = styled(CircularProgress)`
    margin-left: auto;
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
const EditEmployessInformaton = () => {

    const location = useLocation();
    const [error, setError] = useState(false);
    const date = location.state.birthdate
    const date1 = date.substring(3, 5) + '/' + date.substring(0, 2) + '/' + date.substring(6)

    const [datebirth] = useState(date1);

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


        console.log(auth.currentUser.uid)
        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === auth.currentUser.uid) {
                    const department = {
                        department: 'dep' + data[id]['dep_id'],
                        name: data[id]['name']
                    };
                    departments.push(department)
                }
            }
            setDepartments(departments);
        });
        return () => {
            setErrorDetails({});
            setDepartments([]);
            setEmployees([]);
        }
    }, []);

    useEffect(() => {
        const departmentsKeys = [];

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
        var emp = {}
        onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();

            for (let id in data) {
                if (location.state.id === id) {  //Fetch employees of a given company
                    const employee = {
                        nationalID: data[id]['national_id'],
                        phoneNumber: data[id]['phone_number'],
                        employeeID: data[id]['employee_id'],
                        department: data[id]['department'],
                    }
                    emp = employee
                        ;
                }
            }
        });
        console.log(emp.nationalID)
        for (let i in employees) {
            if (emp.nationalID === employees[i].nationalID) {
                console.log("d")
            }

            else if (employee.nationalID === employees[i].nationalID) {
                setErrorDetails({
                    title: 'Employee Exists',
                    description: 'Another employee with the same national id exists'
                });
                return true;
            }
            if (emp.phoneNumber === employees[i].phoneNumber) {
                console.log("d")
            }
            else if (employee.phoneNumber === employees[i].phoneNumber) {
                setErrorDetails({
                    title: 'Employee Exists',
                    description: 'Another employee with the same phone number exists'
                });
                return true;
            }
            if (emp.employeeID === employees[i].employeeID) {
                console.log("d")
            }
            else if (employee.employeeID === employees[i].employeeID) {
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
        fullName: location.state.name,
        nationalID: location.state.nationalID,
        phoneNumber: location.state.phoneNumber,
        birthdate: datebirth,
        address: location.state.address,
        gender: location.state.gender,
        email: location.state.email,
        employeeID: location.state.employeeID,
        department: location.state.departmentID,
        position: location.state.position

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

    const EditEmployee = (employee) => {
        setIsLoading(true);

        if (employeeExists(employee)) {
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            return;
        }
        //         const auth = getAuth();
        //         console.log(auth)
        //         getAuth()
        //   .updateUser(location.state.id, {
        //     email: 'modifiedUser@example.com',

        //   })
        //   .then((userRecord) => {
        //     // See the UserRecord reference doc for the contents of userRecord.
        //     console.log('Successfully updated user', userRecord.toJSON());
        //   })
        //   .catch((error) => {
        //     console.log('Error updating user:', error);
        //   });
        // if (location.state.email !== employee.email){
        //     console.log(location.state.id)
        // updateEmail(location.state.id, employee.email).then(() => {
        //     console.log('Email updated!!')

        //   }).catch((error) => {
        //     console.log(error)
        //     // setErrorDetails({
        //     //                 title: 'An Error Occured',
        //     //                 description: { error }
        //     //             });
        //     //             setError(true);
        //     //             setIsLoading(false);
        //     //             setOpenSnackbar(true);
        //                 return;
        //   });}
        if (location.state.email !== employee.email) {
            updateUserEmail({
                email: employee.email,
                uid: location.state.id,

            }).then(() => {
                update(ref(database, 'Employee/' + location.state.id), {
                    email: employee.email,
                }
                )
            });
        }
        if (datebirth !== employee.birthdate) {
            update(ref(database, 'Employee/' + location.state.id), {

                birthdate: format(employee.birthdate, 'dd/MM/yyyy')
            });
        }
        update(ref(database, 'Employee/' + location.state.id), {
            name: employee.fullName,
            national_id: employee.nationalID,
            phone_number: employee.phoneNumber,

            address: employee.address,
            gender: employee.gender,
            employee_id: employee.employeeID,
            department: employee.department,
            position: employee.position,
        });
        setError(false);
        setIsLoading(false);
        setOpenSnackbar(true);
        return;
        // createUserWithEmailAndPassword(authSignup, employee.email, password).then((result) => {
        //     signOut(authSignup);
        //     sendEmail({
        //         email: employee.email,
        //         name: employee.fullName,
        //         password: password,
        //     }).then(() => {
        //         set(ref(database, 'Employee/' + result.user.uid), {
        //             name: employee.fullName,
        //             national_id: employee.nationalID,
        //             phone_number: employee.phoneNumber,
        //             birthdate: format(employee.birthdate, 'dd/MM/yyyy'),
        //             address: employee.address,
        //             gender: employee.gender,
        //             email: employee.email,
        //             employee_id: employee.employeeID,
        //             department: employee.department,
        //             position: employee.position,
        //             change_image: 0,
        //             image_token: "null"
        //         });
        //         setError(false);
        //         setIsLoading(false);
        //         setOpenSnackbar(true);
        //     }).catch((error) => {
        //         setErrorDetails({
        //             title: 'An Error Occured',
        //             description: { error }
        //         });
        //         setError(true);
        //         setIsLoading(false);
        //         setOpenSnackbar(true);
        //         return;
        //     });
        // }).catch(() => {
        //     setErrorDetails({
        //         title: 'An Error Occured',
        //         description: 'The email exists within Checkly'
        //     });
        //     setError(true);
        //     setIsLoading(false);
        //     setOpenSnackbar(true);
        //     return;
        // });


    }

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                EditEmployee(values);
                console.log(values)
            }}>
            <Form>
                <SetionsWrapper>
                    <MainWrapper>
                        <MainTitle>Edit Employee information</MainTitle>
                        <Subtitle>Edit the information of {location.state.name}</Subtitle>
                    </MainWrapper>
                    <Section>
                        <SectionTitle>Personal Information</SectionTitle>
                        <InputField
                            name='fullName'
                            id='fullName'
                            label='Full Name' />
                        <InputField
                            name='nationalID'
                            id='nationalID'
                            label='National ID' />
                        <InputField
                            name='phoneNumber'
                            id='phoneNumber'
                            label='Phone Number' />
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
                            nameg={location.state.gender}
                            id='gender'
                            label='Gender' />
                    </Section>
                    <Section>
                        <SectionTitle>Work Information</SectionTitle>
                        <InputField
                            name='email'
                            icon={<MdOutlineAlternateEmail color='#D7D7D7' size={24} />}
                            id='email'
                            label='Email' />
                        <InputField
                            name='employeeID'
                            id='employeeID'
                            label='Employee ID' />
                        <SelectField
                            name='department'
                            id='department'
                            label='Department'
                            options={departments}
                            nameID={location.state.departmentID}
                        // value = "dep2" 
                        />
                        <InputField
                            name='position'
                            id='position'
                            label='Position' />
                    </Section>
                    {isLoading ? <Progress /> : <Button type='submit'>  Update the information </Button>}
                </SetionsWrapper>
                {error ?
                    (<Snackbar
                        autoHideDuration={6000}
                        open={openSnackbar}
                        onClose={closeSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={closeSnackbar} severity='error' variant='filled'>
                            <AlertTitle>{errorDetails.title}</AlertTitle>
                            {errorDetails.description}
                        </Alert>
                    </Snackbar>) :
                    (<Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                        <Alert severity='success' variant='filled'>
                            <AlertTitle>Success!</AlertTitle>
                            Update information successfully !
                        </Alert>
                    </Snackbar>)}
            </Form>
        </Formik>
    );
};

export default EditEmployessInformaton;
