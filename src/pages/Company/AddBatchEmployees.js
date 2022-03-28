
import { React, useState, useEffect, useCallback } from 'react';
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

const AddBatchEmployees = () => {

    /**
     * Use States
     */
    
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const [errorDetails, setErrorDetails] = useState({
        title: 'error',
        description: 'Oops! Something went wrong, try again later.',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Close snack bar function
     */
     const closeSnackbar = () => {
        setOpenSnackbar(false);
    };

    /**
     * Validations
     */

    // to be added

    /**
    *  On Drop Function
    *  Called whenever files are dropped in the dropzone.
    *  Takes an array of accepted files and log the files to the console
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
        maxFiles:1,
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
        Papa.parse(file,{
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

        // if (employeeExists(employee)) {
        //     setError(true);
        //     setIsLoading(false);
        //     setOpenSnackbar(true);
        //     return;
        // }

        // const password = uuidv4().slice(0, 8);
        
        // TEMP password
        const password = "123456"

        parsedCsvData.forEach((employee) => {
            createUserWithEmailAndPassword(authSignup, employee.email, password).then((result) => {
                signOut(authSignup)
                // sendEmail({
                //     email: employee.email,
                //     name: employee.fullName,
                //     password: password,
                // })
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
                        image_token: "null"
                    });
                    // setError(false);
                    setIsLoading(false);
                    setOpenSnackbar(true);
                }).catch((error) => {
                    setErrorDetails({
                        title: 'An Error Occured',
                        description: { error }
                    });
                    // setError(true);
                    setIsLoading(false);
                    setOpenSnackbar(true);
                    return;
                });
            }).catch(() => {
                setErrorDetails({
                    title: 'An Error Occured',
                    description: 'The email exists within Checkly'
                });
                // setError(true);
                setIsLoading(false);
                setOpenSnackbar(true);
                return;
            });
        })
    }

    return(
        <SetionsWrapper>
                <MainWrapper>
                    <MainTitle>Add Employee</MainTitle>
                    <Subtitle>Start by adding an individual employee or a batch of employees</Subtitle>
                </MainWrapper>   
            
                <Section>
                    <SectionTitle>Upload Employees CSV File</SectionTitle>
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
                            <p style={{textAlign: 'center'}}>Drag 'n' drop a file here, or click to select a file <br/>
                                <em>(Only 1 file can be dropped or selected)</em>
                            </p>
                            )}
                        </div>
                        <h1 className='file'>Uploaded File</h1>
                        <ul>{files}</ul>
                </Section>
                {isLoading ? <Progress /> : <Button onClick={addEmployees}>  Upload </Button>}
        </SetionsWrapper>
        
       
    );
};

export default AddBatchEmployees;