
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase imports
import { ref, onValue, push, set, update } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
// styles imports
import styled from 'styled-components';
// form components imports
import { Formik, Form } from 'formik';
import InputField from '../../components/Forms/InputField';
import * as Yup from 'yup';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


/**
 * Styled Components 
 */

 const SetionWrapper = styled.div`
 display: flex;
 flex-direction: column;
 margin: 2em 8em;
`

const MainWrapper = styled.div`
    width: 100%;
    margin: 2em 0;
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

const Section = styled.div`
    background-color: white;
    border-radius: 0.75em;
    padding: 3em;
    margin-bottom: 3em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.5em;

    @media (max-width: 768px) {
        padding: 1em;
        grid-template-columns: 1fr;
        gap: 0.5em
    }
`

const SectionTitle = styled.h1`
    font-size: 1.05em;
    font-weight: 600;
    margin: 0em 0em 2.5em;
    grid-column: 1 / 3;
    @media (max-width: 768px) {
        grid-column: 1;
    }
`

const CustomButton = styled.button`
    width: 10em;
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

const AddDepartment = () => {

    /**
     * Use States
     */

    const [departments, setDepartments] = useState([{
        department: '',
        name: '',
        manager_id: ''
    }]);
    const [companyEmployees, setCompanyEmployees] = useState([{
        value: '',
        label: '',
    }]);
    const [error, setError] = useState(false);
    const [errorDetails, setErrorDetails] = useState({
        title: 'error',
        description: 'Oops! Something went wrong, try again later.',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    
    // to navigate to 'Departments View'
    const navigate = useNavigate();

    /**
     * Use Effects
     */
    
    useEffect(() => {
        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === auth.currentUser.uid) {
                    const department = {
                        department: id,
                        name: data[id]['name'],
                        manager_id: data[id]['manager']
                    };
                    departments.push(department)
                }
            }
            setDepartments(departments);
        });
        return () => {
            setDepartments([]);
            setCompanyEmployees([]);
        }
    }, []);

    // Fetch employees of the logged-in company
    useEffect(() => {
        
        const departmentsKeys = [];

        for (let i in departments)
            departmentsKeys.push(departments[i]['department'])

        onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employees = [];
            for (let id in data) {
                if (departmentsKeys.includes(data[id]['department']) && data[id]['deleted'] === 'false' ) {
                    const employee = {
                        value: id,
                        label: data[id]['name'],
                    };
                    employees.push(employee)
                }
            }
            setCompanyEmployees(employees);
        });
    }, [departments]);

    /**
     * Close snack bar function
     */
     const closeSnackbar = () => {
        setOpenSnackbar(false);
    };

    /**
     * Form's Initial Values
     */
     const initialValues = {
        depName: '',
        manager: ''
    };

    /**
     * Form's validation patterns
     */
    const validationSchema =
     Yup.object({
        depName: Yup.string().required('Department Name is required'),
        manager: Yup.object().required('Department Manager is required')
    });

     // Check if department exists
    const departmentExists = (department_name) => {
        for(let i in departments){
            if(departments[i].name.toLowerCase().trim() === department_name.toLowerCase().trim()){
                setErrorDetails({
                    title: 'Invalid Department',
                    description: 'Department exists within the company'
                });
                return true;
            }
        }
    }

    // Check if selected employee already manages another department
    const managerExists = (manager_uid) => {
        console.log(manager_uid)
        for(let i in departments){
            console.log(departments[i].manager)
            if(departments[i].manager_id === manager_uid){
                setErrorDetails({
                    title: 'Manager Exists',
                    description: 'The selected employee already manages another department'
                });
                return true;
            }
        }
    }
    
     /**
     * Add department function - triggered when the form is submitted
     * @params department
     */
    const addDepartment = (department) => {

        if(departmentExists(department.depName)){
            setError(true);
            setOpenSnackbar(true);
            return;
        }
        if(managerExists(department.manager.value)){
            setError(true);
            setOpenSnackbar(true);
            return;
        }

       // push department to DB 
       var dep = push(ref(database));
       set(ref(database, 'Department/'+ dep.key),{
        company_id: auth.currentUser.uid,
        dep_id: dep.key,
        name : department.depName,
        manager: department.manager.value, 
       })

       // Update manager department
       update(ref(database, 'Employee/'+ department.manager.value),{
        department: dep.key, 
        })
       setError(false);
       setOpenSnackbar(true);
       // navigate to departments view
       setTimeout(()=> {
        navigate("/admin/departments");
       }, 3000);
    }

    return (
        <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            addDepartment(values);
        }}
        >
       
            {({ handleChange, setFieldValue, handleBlur, errors, touched }) => (
                <Form>
                <SetionWrapper>
                <MainWrapper>
                    <MainTitle>Add Department</MainTitle>
                    <Subtitle>Add Department Information</Subtitle>
                </MainWrapper>
                <Section>
                    <SectionTitle> Department Information </SectionTitle>
                    <InputField
                    name='depName'
                    id='depName'
                    label='Department Name'
                    />

                    <Autocomplete
                    name= "manager"
                    id="manager"
                    onChange={(e, value) => {
                        console.log(value)
                        setFieldValue("manager", value !== null ? value : initialValues.manager)}
                    }
                    options={companyEmployees}
                    onBlur={handleBlur}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => 
                    <TextField {...params}
                        name= "manager"
                        label= "Manager"
                        size= "small"
                        error={Boolean(touched.manager && errors.manager)}
                        helperText={touched.manager && errors.manager}
                        variant= 'outlined'
                          />}
                    />
                </Section>
                <CustomButton type='submit' >Submit</CustomButton>
            </SetionWrapper>
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
                            Department has been added successfully
                        </Alert>
                    </Snackbar>)}
            </Form>
            )} 
                
        </Formik>
    );
}
export default AddDepartment;
