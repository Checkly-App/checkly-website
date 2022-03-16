import { React, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/Forms/InputField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import SelectField from "../components/Forms/SelectField";
import RadioButtons from "../components/Forms/RadioButtons";
import RadioGroup from '@mui/material/RadioGroup';
import { set, ref, onValue } from "firebase/database";
import { database, auth } from "../utilities/firebase";
import DateField from "../components/Forms/DateField";
import { format } from "date-fns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled, { keyframes } from "styled-components";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';


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
`;

const Section2 = styled.div`
  background-color: white;
  border-radius: 0.75em;
  padding: 3em;
  margin-bottom: 3em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: block;
`;
const MainSections = styled.div`
  width: 85%;
`;

// The Sidebar Section
const SidebarSection = styled.div`
  width: 15em;
  background-color: white;
  border-radius: 0.75em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0 3em 3em 3em;
  
`;

const SectionTitle = styled.h1`
  font-size: 1em;
  font-weight: 600;
  margin: 1em 0em 1em 0em;
  grid-column: 1 / 3;
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const SetionsWrapper = styled.div`
  margin: 5em;
  display: flex;
`;

const checklyButton = styled.button`
  width: 15em;
  height: 3em;
  font-size: 1em;
  font-weight: 500;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 0.5em;
  border: none;
  background: linear-gradient(90deg, #56bbeb 0%, #58aaf3 100%);
`;



const locations = [
    {
    label: "Riyadh",
    value: "Riyadh",
    },
    {
    label: "Northern Borders",
    value: "Northern Borders",
    },
    {
    label: "Makkah",
    value: "Makkah",
    },
    {
    label: "Madinah",
    value: "Madinah",
    },
    {
    label: "Eastern Province",
    value: "Eastern Province",
    },
    {
    label: "Jizan",
    value:"Jizan",
    },
    {
    label: "Jawf",
    value: "Jawf",
    },
    {
    label: "Hail",
    value: "Hail",
    },
    {
    label: "Qasim",
    value: "Qasim",
    },
    {
    label: "Najran",
    value: "Najran",
    },
    {
    label: "Tabuk",
    value: "Tabuk",
    },
    {
    label: "Asir",
    value: "Asir",
    },
    {
    label: "Bahah",
    value: "Bahah",
    },
  ];



const AddCompany = () => {
  const [departments, setDepartments] = useState([
    {
      department: "",
      name: "",
    },
  ]);



//   radio button

var name = "none";


  const [value, setValue] = useState('Fixed');
  const [helperText, setHelperText] = useState('Please enter working hours, e.g. 8-4');
  const [FlexibleDisplay, SetFlexibleDisplay] = useState('none');
  const [FixedDisplay, SetFixedDisplay] = useState('inline');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === 'Flexible') {
        setHelperText('Please enter minimum working hours');
        SetFixedDisplay('none');
        SetFlexibleDisplay('inline');
 
    } else if (event.target.value === 'Fixed') {
        setHelperText('Please enter working hours, e.g. 8-4');
        SetFlexibleDisplay('none');
        SetFixedDisplay('inline');
    }
  };

  useEffect(() => {
    onValue(ref(database, "Department"), (snapshot) => {
      const data = snapshot.val();
      var departments = [];
      for (let id in data) {
        if (data[id]["company_id"] === "com1") {
          // TODO: - company's id
          const department = {
            department: "dep_" + data[id]["dep_id"],
            name: data[id]["name"],
          };
          departments.push(department);
        }
      }
      console.log(departments);
      setDepartments(departments);
    });
  }, []);

  const initialValues = {
    name: "",
    email: "",
    locations: "",
    size: "",
    industry: "",
    preference: "",
    age: "",
    //add radio button
    department: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    locations: Yup.string().required("Location is required"),
    size: Yup.string().required("Size is required"),
    industry: Yup.string().required("Industry is required"),
    preference: Yup.string().required("Preference is required"),
    department: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.string().required("Date of establishment is required"),
    position: Yup.string().required("Position is required"),
  });

  const addEmployee = (employee) => {
    createUserWithEmailAndPassword(auth, employee.email, "123456")
      .then((result) => {
        set(ref(database, "test/" + result.user.uid), {
          name: employee.fullName,
          national_id: employee.nationalID,
          phone_number: employee.phoneNumber,
          birthdate: format(employee.birthdate, "dd/MM/yyyy"),
          address: employee.address,
          gender: employee.gender,
          email: employee.email,
          employee_id: employee.employeeID,
          department: employee.department,
          position: employee.position,
          change_image: 0,
          image_token: "null",
        });
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
        return;
      });
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        addEmployee(values);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <SetionsWrapper>
          <MainSections>
            <Section2>
              <Divider>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 56, height: 56 }}
                />
              </Divider>
            </Section2>
            <Section>
              <InputField name="name" id="name" label="Name" />
              <InputField
                name="email"
                id="email"
                label="Email"
              />
              <SelectField
                name="locations"
                id="locations"
                label="Location"
                options= {locations}
              />
              {/* industry */}
              <SelectField
                name="department"
                id="department"
                label="Department"
                options={departments}
              />
              <SelectField
                name="size"
                id="size"
                label="Size"
                options={departments}
              />
             <SelectField
                name="age"
                id="age"
                label="Years since establishment"
                options={departments}
              />
            <SelectField
                name="preference"
                id="preference"
                label="Attendance Recording Strategy"
                options={departments}
              />
 
              
            </Section>

            <Section2>
              
            <FormControl>
            <FormLabel id="radio-buttons-group">Company's Attendance Policy</FormLabel>
             <RadioGroup
                name="policy"
                value={value}
                onChange={handleRadioChange}
            >
                    <FormControlLabel value="Fixed" control={<Radio />} label="Fixed" />
                    <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
             </RadioGroup>
             <FormHelperText>{helperText}</FormHelperText>
             <InputField sx={{ display: FlexibleDisplay }} name="Flexible" id="Flexible" label="Flexible" />
             <InputField sx={{ display: FixedDisplay }} name="Fixed" id="Fixed"label="Fixed" />
              </FormControl>
 
              {/* <Button type="submit"> Add Company </Button> */}
            </Section2>
          </MainSections>
          {/* the Sidebar Section */}
          <SidebarSection>
            <Stack direction="column" justify="center" spacing={5}>
            <Box m={2} pt={15} textAlign='center'>
              <Button color="grey" margin={5} variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "150px",
                minWidth: "170px",
                minHeight: "150px",
                border: 'dashed',
                fontSize: '13px'
                }}><Stack direction="column" spacing={5} alignItems="center" > <InsertPhotoOutlinedIcon sx={{ fontSize: 60 }} /> Upload logo</Stack> </Button>
            </Box>
            <Box textAlign='center'>
              <Button variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "80px",
                minWidth: "170px",
                minHeight: "80px",
                border: 'dashed',
                fontSize: '11px'
                }}><Stack direction="column" spacing={5} alignItems="center" > <UploadFileRoundedIcon/>Upload departments</Stack> </Button>
                
            </Box>
            <Box textAlign='center'>
              <Button variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "80px",
                minWidth: "170px",
                minHeight: "80px",
                border: 'dashed',
                fontSize: '11px'
                }}><Stack direction="column" spacing={5} alignItems="center" > <UploadFileRoundedIcon/>Upload geofence info</Stack> </Button>
            </Box>
            <Box textAlign='center'>
              <Button variant="outlined" style={{
                maxWidth: "170px",
                border: 'dashed',
                maxHeight: "80px",
                minWidth: "170px",
                minHeight: "80px",
                fontSize: '11px'
                }}> <Stack direction="column" spacing={5} alignItems="center" > <UploadFileRoundedIcon/>Upload Employees</Stack> </Button>
            </Box>
            </Stack>
          </SidebarSection>
        </SetionsWrapper>
      </Form>
    </Formik>
  );
};

export default AddCompany;