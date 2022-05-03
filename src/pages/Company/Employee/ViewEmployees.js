import { useState, useEffect } from 'react';

import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../../utilities/firebase';
import { MdAccountCircle, MdSearch } from "react-icons/md";
import '../../../Styles/EmployeeCard.css'
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { Subtitle, Title } from '../Dashboard';
import { Header, MainWrapper } from '../Employee/AddLayout';
import { Alert, AlertTitle, Snackbar } from '@mui/material';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { functions } from '../../../utilities/firebase';

import { httpsCallable } from 'firebase/functions';




/**
 * Send Email Cloud Function 
 */
const DeleteEmployee = httpsCallable(functions, 'DeleteEmployee');


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
    width: 10em;
    height: 3em;
    font-size: 1em;
    font-weight: 500;
    text-align :center;
    color: white;
    border-radius: 0.5em;
    border: none;
    background: linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%);
    margin-left: auto;

`

const Subtitle1 = styled.p`
    font-size: 1em;
    color: #A3A1A1;
    text-align:center;
    padding-top:0.5em;
    
`
// const MainWrapper = styled.div`
//     width: 100%;
//     margin: 2em 0;
// `

const ViewEmployees = () => {



  const [employees, setEmployees] = useState([]);
  const [searchterm, setsearchterm] = useState("");
  const [load, setload] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState({
    id: '',
    tokens: '',
    name: '',
    position: '',
    department: '',
    departmentID: '',
    nationalID: '',
    phoneNumber: '',
    birthdate: null,
    address: '',
    gender: '',
    email: '',
    employeeID: '',
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const input = {
    backgroundColor: "white",


    width: "80%",

    padding: "5px 5px 5px 10px", /* Add some padding */
    border: "1px solid #ddd", /* Add a grey border */
    marginBottom: "12px",
    marginLeft: "5%",/* Add some space below the input */
    borderRadius: "12px"

  }
  const Buttonc = {
    background: "linear-gradient(90deg, #56BBEB 0%, #58AAF3 100% ) ",
    color: "white",
    width: "120px",
    padding: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginBottom: "0.5em",
    borderRadius: "12px",
    border: " 1px solid white",
    cursor: "pointer",
  };
  const AddButton = styled.button`
    background-color: rgba(60,180,255,0.25);
    color: #3CB4FF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0.6em 1.5em;
    border-radius: 0.75em;
    font-weight: 500;
`

  const [errorDetails] = useState({
    title: 'error',
    description: 'Oops! This employee is manager for one of the departments .',
  });
  const [error, setError] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [setIsLoading] = useState(false);
  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const navigate = useNavigate()
  useEffect(() => {


    onValue(ref(database, 'Employee'), (snapshot) => {
      setEmployees([])
      const data = snapshot.val();
      var employsarray = [];
      for (let id in data) {

        const employee = {
          id: id,
          tokens: data[id]['image_token'],
          name: data[id]['name'],
          position: data[id]['position'],
          department: data[id]['department'],
          departmentID: data[id]['department'],
          nationalID: data[id]['national_id'],
          phoneNumber: data[id]['phone_number'],
          birthdate: data[id]['birthdate'],
          address: data[id]['address'],
          gender: data[id]['gender'],
          email: data[id]['email'],
          employeeID: data[id]['employee_id'],
          deleted: data[id]['deleted'],





        };
        onValue(ref(database, 'Department'), (snapshot) => {
          const data = snapshot.val();

          for (let id in data) {

            if (id === employee.department) {
              const namedeb = {


                namedep: data[id]['name'],
                comid: data[id]['company_id']

              };

              if (namedeb.comid === auth.currentUser.uid) {
                employee.department = namedeb.namedep
                employsarray.push(employee)
                if (employee.deleted === 'false') {
                  setEmployees(employees => [...employees, employee])
                }
              }
            }



          }


        });


      }

      //setEmployees(employsarray)

      setload(false)
    }

    );

  }, []);



  const emp = () => {

    navigate("/admin/employees/add")
  }

  const toEdit = (index) => {
    navigate('/admin/employees/edit', {
      state: {
        id: index.id,
        tokens: index.tokens,
        name: index.name,
        position: index.position,
        department: index.department,
        departmentID: index.departmentID,
        nationalID: index.nationalID,
        phoneNumber: index.phoneNumber,
        birthdate: index.birthdate,
        address: index.address,
        gender: index.gender,
        email: index.email,
        employeeID: index.employeeID,
      }
    });
  }
  const toView = (index) => {
    navigate('/admin/employees/view', {
      state: {
        id: index.id,
        tokens: index.tokens,
        name: index.name,
        position: index.position,
        department: index.department,
        nationalID: index.nationalID,
        phoneNumber: index.phoneNumber,
        birthdate: index.birthdate,
        address: index.address,
        gender: index.gender,
        email: index.email,
        employeeID: index.employeeID,
      }
    });
  }
  const Delete = (index) => {
    setIndex(index)
    setOpen(true);

  }



  const handleClosedelete = () => {

    //  remove (ref(database, 'Employee/'+index.id))


    setOpen(false);
    if (ManagerExists(index)) {
      setError(true);
      setIsLoading(false);
      setOpenSnackbar(true);
      return
    }
    else {
      DeleteEmployee({

        uid: index.id

      })
      console.log('this to dele')


    }
  };
  const handleClosecancel = () => {

    setOpen(false);
  };
  


  const ManagerExists = (index1) => {


    var Ismanager = false
    onValue(ref(database, 'Department'), (snapshot) => {
      const data = snapshot.val();

      for (let id in data) {
        //Fetch employees of a given company
        if (data[id]['manager'] === index1.id) {
          console.log("false")
          Ismanager = true
        }





      }
    });
    return Ismanager
  }
  return (

    <SetionsWrapper>
      <div className="container">
        <div className="row">
         
            <Header>
                <MainWrapper>
                    <Title>Employees</Title>
                    <Subtitle>Here is the list of employee’s that work at the Company</Subtitle>
                </MainWrapper>
                <AddButton  onClick={emp}>  Add employee</AddButton>
            </Header>
          

        </div></div>
      {error ?
        <Snackbar
          autoHideDuration={6000}
          open={openSnackbar}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={closeSnackbar} severity='error' variant='filled'>
            <AlertTitle>{errorDetails.title}</AlertTitle>
            {errorDetails.description}
          </Alert>
        </Snackbar> : null}

      <div className="container">




        <div className="input-group" style={input}>
          <i className="fa fa-envelope icon"><MdSearch size="20px" style={{ marginBottom: "0.1em", marginRight: "0.1em" }} /></i>
          <input className="inputsearch" type="text" placeholder="Search for names or employeeID or position" onChange={(event) => { setsearchterm(event.target.value) }} />

        </div>

        <div className="row">
      
{employees.length ? null:<Subtitle1>There is no employee</Subtitle1> } 

          {load === false && employees.filter((emp) => {

            if (searchterm === "") {
              
              return emp
            } else if (emp.name.toLowerCase().includes(searchterm.toLowerCase())) {

              return emp
            }
            else if (emp.employeeID.toLowerCase().includes(searchterm.toLowerCase())) {

              return emp
            }
            else if (emp.position.toLowerCase().includes(searchterm.toLowerCase())) {

              return emp
            }
            return null;
          }


          ).map((emp, Index) => {

            return (
              <Grid item xs={4} style={{ paddingBottom: "1em" }} key={Index} >

                <div className="flip-card" tabIndex="0">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">

                      <Card sx={{ maxWidth: 250, minHeight: 260 }}>
                        <CardActionArea>

                          <CardContent>
                            {emp.tokens === "null" ? <MdAccountCircle

                              color='lightgray' style={{ padding: "0.5em", marginLeft: "0em", width: "150px", height: "130px" }} /> : <img src={emp.tokens} style={{ width: "130px", height: "130px", marginBottom: "0.5em", margin: "1em", overflow: "hidden", borderRadius: "50%" }} alt="logo" />}




                            <Typography gutterBottom variant="body1" component="div" textAlign="center" fontWeight="bold">
                              {emp.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                              {emp.department} Department
                            </Typography>

                            <Typography variant="body2" color="#56BBEB" textAlign="center">
                              {emp.position}
                            </Typography>

                          </CardContent>
                        </CardActionArea>
                      </Card>

                    </div>
                    <div className="flip-card-back">
                      <div>
                        <button style={Buttonc} onClick={() => { toView(emp) }} className="hoverButten">   View  </button></div>
                      <div>   <button style={Buttonc} onClick={() => { toEdit(emp) }}>  Edit  </button></div>
                      <div>   <button style={Buttonc} onClick={() => { Delete(emp) }}>  Delete  </button></div>



                    </div>
                  </div>

                </div>
              </ Grid >

            )
          })
          }
        
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          // onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete thin employee ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosecancel}>
              Cancel
            </Button>
            <Button onClick={handleClosedelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </SetionsWrapper>

  )
};

export default ViewEmployees;