
import { React, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Firebase imports
import { set, ref, onValue } from 'firebase/database';
import { database, auth, functions, authSignup } from '../../utilities/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
// to generate password
import { v4 as uuidv4 } from 'uuid';
// parsing csv
import Papa from 'papaparse';
// components import
import { useDropzone } from 'react-dropzone';
import { Alert, AlertTitle, CircularProgress, Snackbar } from '@mui/material';
import Table from '../../components/Forms/TableExample';
// styles imports
import '../../Styles/Dropzone.css';
import styled from 'styled-components';

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

`
const SectionTitle = styled.h1`
 font-size: 1.05em;
 font-weight: 600;
 margin: 0em 0em 1em;
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
const Subtitle = styled.h1`
    font-size: 1em;
    font-weight: 300;
`
const Note = styled.p`
    font-size: 0.85em;
    color: #A3A1A1;
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
const FilterButton1 = styled.button`
    width: 10em;
    height: 3em;
    font-size: 0.7em;
    font-weight: 500;
    text-align :center;
    color: rgba(255,255,255,0.9);
    border-radius: 5em;
    border: none;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
    margin-left: auto;
    margin-bottom: 2em;
    margin-right: 0.5em;
    &:hover {
        background: #2CB1EF;
      }
`
const FilterButton2 = styled.button`
    width: 10em;
    height: 3em;
    font-size: 0.7em;
    font-weight: 500;
    text-align :center;
    color: rgba(255,255,255,0.9);
    border-radius: 5em;
    border: none;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
    opacity: 0.5;
    margin-left: auto;
    margin-bottom: 2em;
`
const ButtonsContainer = styled.div`
    margin-left: auto;
`
const Progress = styled(CircularProgress)`
    margin-left: auto;
`

const AddBatchEmployees = () => {

    /**
     * Use States
     */

    const [parsedCsvData, setParsedCsvData] = useState([]);
    const [error, setError] = useState(false);
    const [errorDetails, setErrorDetails] = useState({
        title: 'error',
        description: 'Oops! Something went wrong, try again later.',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [companyDepartments, setCompanyDepartments] = useState([{
        department: '',
        name: ''
    }]);
    const [companyEmployees, setCompanyEmployees] = useState([{
        national_id: '',
        phone_number: '',
        employee_id: '',
        department: '',
        email: '',
    }]);

    // to navigate to 'Add Individual'
    const navigate = useNavigate();

    /**
     * Use ِEffects
     */

    // Fetch departments of the logged-in company
    useEffect(() => {

        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === auth.currentUser.uid) {
                    const department = {
                        department: id,
                        name: data[id]['name']
                    };
                    departments.push(department)
                }
            }
            setCompanyDepartments(departments);
        });
        return () => {
            setErrorDetails({});
            setCompanyDepartments([]);
            setCompanyEmployees([]);
        }
    }, []);

    // Fetch employees of the logged-in company
    useEffect(() => {
        const departmentsKeys = [];

        for (let i in companyDepartments)
            departmentsKeys.push(companyDepartments[i]['department'])

        onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employees = [];
            for (let id in data) {
                if (departmentsKeys.includes(data[id]['department'])) {  
                    const employee = {
                        national_id: data[id]['national_id'],
                        phone_number: data[id]['phone_number'],
                        employee_id: data[id]['employee_id'],
                        department: data[id]['department'],
                        email: data[id]['email'],
                    };
                    employees.push(employee)
                }
            }
            setCompanyEmployees(employees);
        });
    }, [companyDepartments])

    /**
     * Close snack bar function
     */

    const closeSnackbar = () => {
        setOpenSnackbar(false);
    };

    /**
     * Validations
     */

    const employeeExists = (employee) => {
        for (let i in parsedCsvData) {
            for (let j in companyEmployees) {
                if (parsedCsvData[i].national_id === companyEmployees[j].national_id) {
                    setErrorDetails({
                        title: 'Employee Exists',
                        description: 'Some of the added employees have the same National ID of another employee'
                    });
                    return true;
                }
                if (parsedCsvData[i].phone_number === companyEmployees[j].phone_number) {
                    setErrorDetails({
                        title: 'Employee Exists',
                        description: 'Some of the added employees have the same phone number of another employee'
                    });
                    return true;
                }
                if (parsedCsvData[i].employee_id === companyEmployees[j].employee_id) {
                    setErrorDetails({
                        title: 'Employee Exists',
                        description: 'Some of the added employees have the same Employee ID of another employee'
                    });
                    return true;
                }
                if (parsedCsvData[i].email === companyEmployees[j].email) {
                    setErrorDetails({
                        title: 'Employee Exists',
                        description: 'Some of the added employees have the same email of another employee'
                    });
                    return true;
                }
            }
        }
        return false;
    };

    const parseEmployeesDepartments = () => {

        // Loop through each employee and check if the department exists
        let departmentExists = parsedCsvData.every(emp => {
            if (checkEmployeeDepartment(emp)) {
                return true;
            }
            return false;
        })
        if (departmentExists === false) {
            setErrorDetails({
                title: 'Invalid Department',
                description: 'Some of the added employees have a department the does not exist'
            });
            return false;
        }
        return true;
    }

    // check if the employee department exists
    const checkEmployeeDepartment = (employee) => {
        for (let i in companyDepartments) {
            if (companyDepartments[i].name.toLowerCase() === employee.department.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    /**
    *  This function transforms the department name 
    *  to the department key for each employee
    *  Ex: 'Human Resources' -> 'dep1'
    */
    const transformEmployeeDepartment = () => {
        for (let i in parsedCsvData) {
            for (let j in companyDepartments) {
                if (companyDepartments[j].name.toLowerCase() === parsedCsvData[i].department.toLowerCase()) {
                    parsedCsvData[i].department = companyDepartments[j].department;
                }
            }
        }
    }

    // check if the uploaded file columns matches the example
    const misMatchedColumnHeaders = () => {
        let isHeaderPresent = parsedCsvData.every(el => {
            if (el.hasOwnProperty('employee_id') && el.hasOwnProperty('name') && el.hasOwnProperty('email')
                && el.hasOwnProperty('national_id') && el.hasOwnProperty('phone_number') && el.hasOwnProperty('birthdate')
                && el.hasOwnProperty('address') && el.hasOwnProperty('gender') && el.hasOwnProperty('department') && el.hasOwnProperty('position'))
                return false;
            else
                return true;
        })
        if (isHeaderPresent === true) {
            setErrorDetails({
                title: 'Cloumns Mismatch',
                description: 'The file\'s columns does not match the specified column headers'
            });
            return isHeaderPresent;
        }
    }
    // Check the formatting of the email, national id, phone number, and birthdate
    const checkFormatting = () => {

        let emailRegex = /^\S+@\S+\.\S+$/;
        let nationalIDRegex = /^(?<=\s|^)\d+(?=\s|$)/;
        let phoneRegex = /^[0]{1}[5]{1}([0-9])*$/;
        let birthdateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

        for (let i in parsedCsvData) {

            if (!emailRegex.test(parsedCsvData[i].email)) {
                setErrorDetails({
                    title: 'Invalid Email',
                    description: 'Some of the added employees have invalid emails'
                });
                return true;
            }

            if (!nationalIDRegex.test(parsedCsvData[i].national_id) || parsedCsvData[i].national_id.length !== 10) {
                setErrorDetails({
                    title: 'Invalid National ID',
                    description: 'Some of the added employees have invalid National IDs'
                });
                return true;
            }

            if (!phoneRegex.test(parsedCsvData[i].phone_number) || parsedCsvData[i].phone_number.length !== 10) {
                setErrorDetails({
                    title: 'Invalid Phone Number',
                    description: 'Some of the added employees have invalid phone numbers'
                });
                return true;
            }

            if (!birthdateRegex.test(parsedCsvData[i].birthdate)) {
                setErrorDetails({
                    title: 'Invalid Birthdate',
                    description: 'Some of the added employees have invalid birthdates'
                });
                return true;
            }
        }
    }

    /**
    *  On Drop Function
    *  Called whenever a file is dropped in the dropzone.
    *  Takes an array of accepted files
    */
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length) {
            parseFile(acceptedFiles[0]);
        }
    }, []);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: 'text/csv',
        maxFiles: 1,
    });

    // Display file name and size
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    /**
    *  parseFile Function
    *  @params file
    *  Called whenever a file is dropped into the dropzone
    *  'complete' function is executed when the parsing is complete
    */
    const parseFile = file => {
        Papa.parse(file, {
            header: true,
            complete: results => {
                setParsedCsvData(results.data)
                // console.log(results.data)
            },
        });
    };

    /**
     * Add employees function - triggered when the file is submitted
     */
    const addEmployees = () => {

        setIsLoading(true);

        // CASE: No file was submitted
        if (!parsedCsvData.length) {
            setErrorDetails({
                title: 'No file was submitted',
                description: 'You did not upload any file'
            });
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            setParsedCsvData([]);
            return;
        }

        // CASE: Column names does not match the example
        if (misMatchedColumnHeaders()) {
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            setParsedCsvData([]);
            return;
        }

        // CASE: One of departments does not exist, or has not been added yet
        if (!parseEmployeesDepartments()) {
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            setParsedCsvData([]);
            return;
        }

        transformEmployeeDepartment()

        // CASE: One of the added employees have a the same Employee ID or National ID or Phone Number or Email
        if (employeeExists()) {
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            setParsedCsvData([]);
            return;
        }

        // CASE: One of the added employees have invalid email or National ID or Phone Number or Birthdate
        if (checkFormatting()) {
            setError(true);
            setIsLoading(false);
            setOpenSnackbar(true);
            setParsedCsvData([]);
            return;
        }

        const password = uuidv4().slice(0, 8);

        parsedCsvData.forEach((employee) => {
            createUserWithEmailAndPassword(authSignup, employee.email, password).then((result) => {
                signOut(authSignup);
                sendEmail({
                    email: employee.email,
                    name: employee.fullName,
                    password: password,
                })
                .then(() => {
                    set(ref(database, 'Employee/' + result.user.uid), {
                        name: employee.name,
                        national_id: employee.national_id,
                        phone_number: employee.phone_number,
                        birthdate: employee.birthdate,
                        address: employee.address,
                        gender: employee.gender,
                        email: employee.email,
                        employee_id: employee.employee_id,
                        department: employee.department,
                        position: employee.position,
                        change_image: 0,
                        image_token: "null",
                        status: "-"
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
                    console.log(error);
                    return;
                });
            }).catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setErrorDetails({
                        title: 'An Error Occured',
                        description: 'The email exists within Checkly'
                    });
                    setError(true);
                    setOpenSnackbar(true);
                }
                setIsLoading(false);
                console.log(error);
                return;
            });
        })
        setParsedCsvData([]);
    }

    return (
        <SetionsWrapper>
            <MainWrapper>
                <MainTitle>Add Employee</MainTitle>
                <Subtitle>Start by adding an individual employee or a batch of employees</Subtitle>
            </MainWrapper>
            <ButtonsContainer>
                <FilterButton1 onClick={() => navigate("/admin/employees/")} >Add Individual</FilterButton1>
                <FilterButton2 disabled={true}>Add Batch</FilterButton2>
            </ButtonsContainer>
            <Section>
                <SectionTitle>Upload Employees CSV File</SectionTitle>
                <Note>In order to ensure successful addition, please follow the example below in the way column headers are written as well as the cells data types.</Note>
                <Table></Table>
                <div
                    {...getRootProps({
                        className: `dropzone 
                            ${isDragAccept && 'dropzoneAccept'} 
                            ${isDragReject && 'dropzoneReject'}`,
                    })}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p style={{ textAlign: 'center' }}>Drag 'n' drop a file here, or click to select a file <br />
                            <em>(Only 1 file can be dropped or selected)</em>
                        </p>
                    )}
                </div>
                {parsedCsvData.length ?
                    (<div>
                        <h1 className='file'>Uploaded File</h1>
                        <ul>{files}</ul>
                    </div>) :
                    <div></div>
                }

            </Section>
            {isLoading ? <Progress /> : <CustomButton onClick={addEmployees}> Submit </CustomButton>}
            {error ?
                (<Snackbar
                    autoHideDuration={8000}
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
                        An Email message was sent to each employee with their credentials!
                    </Alert>
                </Snackbar>)}
        </SetionsWrapper>
    );
};

export default AddBatchEmployees;