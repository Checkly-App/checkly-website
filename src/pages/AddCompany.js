import { React, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/Forms/InputField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import SelectField from "../components/Forms/SelectField";
import RadioButtons from "../components/Forms/RadioButtons";
import RadioGroup from '@mui/material/RadioGroup';
import { set, ref, onValue } from "firebase/database";
import { database, auth, storage } from "../utilities/firebase";
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
import logo from '../assets/images/logo.svg';


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

const SButton = styled.button`
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
    key: "Riyadh",
    name: "Riyadh",
    },
    {
    key: "Northern Borders",
    name: "Northern Borders",
    },
    {
    key: "Makkah",
    name: "Makkah",
    },
    {
    key: "Madinah",
    name: "Madinah",
    },
    {
    key: "Eastern Province",
    name: "Eastern Province",
    },
    {
    key: "Jizan",
    name:"Jizan",
    },
    {
    key: "Jawf",
    name: "Jawf",
    },
    {
    key: "Hail",
    name: "Hail",
    },
    {
    key: "Qasim",
    name: "Qasim",
    },
    {
    key: "Najran",
    name: "Najran",
    },
    {
    key: "Tabuk",
    name: "Tabuk",
    },
    {
    key: "Asir",
    name: "Asir",
    },
    {
    key: "Bahah",
    name: "Bahah",
    },
  ];

  const industries = [
    {
    key: "Accountancy, banking and finance",
    name: "Accountancy, banking and finance",
    },
    {
    key: "Business, consulting and management",
    name: "Business, consulting and management",
    },
    {
    key: "Engineering and manufacturing",
    name: "Engineering and manufacturing",
    },
    {
    key: "Healthcare",
    name: "Healthcare",
    },
    {
    key: "Information Technology",
    name: "Information Technology",
    },
    {
    key: "Law",
    name:"Law",
    },
    {
    key: "Marketing, advertising and PR",
    name: "Marketing, advertising and PR",
    },
    {
    key: "Transport and logistics",
    name: "Transport and logistics",
    },
    {
    key: "Education",
    name: "Education",
    },
    {
    key: "Retail",
    name: "Retail",
    },
    {
    key: "Public services and administration",
    name: "Public services and administration",
    },
    {
    key: "Recruitment and HR",
    name: "Recruitment and HR",
    },
    {
    key: "Leisure, sport and tourism",
    name: "Leisure, sport and tourism",
    },
  ];

  const sizes = [
    {
    key: "1-10 Employees",
    name: "1-10 Employees",
    },
    {
    key: "11-50 Employees",
    name: "11-50 Employees",
    },
    {
    key: "51-200 Employees",
    name: "51-200 Employees",
    },
    {
    key: "201-500 Employees",
    name: "201-500 Employees",
    },
    {
    key: "501-1000 Employees",
    name: "501-1000 Employees",
    },
    {
    key: "1001-5000 Employees",
    name:"1001-5000 Employees",
    },
    {
    key: "5001-10,000 Employees",
    name: "5001-10,000 Employees",
    },
    {
    key: "+10,000 Employees",
    name: "+10,000 Employees",
    },
  ];

  const ages = [
    {
    key: "Less than a year",
    name: "Less than a year",
    },
    {
    key: "1-2 Years",
    name: "1-2 Years",
    },
    {
    key: "2-5 Years",
    name: "2-5 Years",
    },
    {
    key: "5-10 Years",
    name: "5-10 Years",
    },
    {
    key: "+10 Years",
    name: "+10 Years",
    },
  ];

  const preferences = [
    {
    key: "QR-Code",
    name: "QR-Code",
    },
    {
    key: "Location-Based",
    name: "Location-Based",
    },
    {
    key: "Both",
    name: "Both",
    },
  ];

  



const AddCompany = () => {
  const [departments, setDepartments] = useState([
    {
      department: "",
      name: "",
    },
  ]);
 
const Input = styled('input')({
    display: 'none',
  });


//   radio button config

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

  //upload 
  const [image , setImage] = useState('');
        const upload = ()=>{
         if(image == null)
         return;
    storage.ref(`/Companies/${image.name}`).put(image)
     .on("state_changed" , alert("success") , alert);
}


  const initialValues = {
    name: "",
    email: "",
    location: "",
    size: "",
    industry: "",
    preference: "",
    age: "",
    policy: "Fixed",
    Flexible: "",
    Fixed: "",
    //add radio button
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    size: Yup.string().required("Size is required"),
    industry: Yup.string().required("Industry is required"),
    preference: Yup.string().required("Preference is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.string().required("Company's age is required"),
    Flexible: Yup.string().required("Working hours are required"),
    Fixed: Yup.string().required("CWorking hours are required"),
  });

  const addCompany = (company) => {

        set(ref(database, "test/" + "11"), {
          name: company.name,
          email: company.email,
          location: company.location,
          industry: company.industry,
          email: company.email,
          age: company.age,
          policy: company.policy,
          preference: company.preference,
          Flexible: company.Flexible,
          Flexible: company.Fixed,
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
        // addEmployee(values);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <SetionsWrapper>
          <MainSections>

            <Section2>
              <Divider>
                <Avatar
                  alt="R"
                  src= {logo}
                  sx={{ width: 56, height: 56 }}
                />
              </Divider>
            </Section2>

            <Section>

            <InputField 
                name="name" 
                id="name" 
                label="Name"
            />

            <InputField
                name="email"
                id="email"
                label="Email"
            />

            <SelectField
                name="location"
                id="location"
                label="Location"
                options= {locations}
             />

            <SelectField
                name="industry"
                id="industry"
                label="Industry"
                options={industries}
            />

            <SelectField
                name="size"
                id="size"
                label="Size"
                options={sizes}
            />

            <SelectField
                name="age"
                id="age"
                label="Years since establishment"
                options={ages}
            />

            <SelectField
                name="preference"
                id="preference"
                label="Attendance Recording Strategy"
                options={preferences}
            />
 
              
            </Section>

            <Section>
              
                <FormControl>
                    <FormLabel> Company's Attendance Policy </FormLabel>
                    <RadioGroup
                        row
                        name="policy"
                        value={value}
                        onChange={handleRadioChange}
                    >
                    <FormControlLabel value="Fixed" control={<Radio />} label="Fixed Hours" />
                    <FormControlLabel value="Flexible" control={<Radio />} label="Flexible Hours" />
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                    <InputField sx={{ display: FlexibleDisplay }} name="Flexible" id="Flexible" label="Hours" />
                    <InputField sx={{ display: FixedDisplay }} name="Fixed" id="Fixed"label="Hours" />
              </FormControl>
            

            </Section>
          </MainSections>

          {/* the Sidebar Section */}
          <SidebarSection>
            <Stack direction="column" justify="center" spacing={5}>

            
            <Box m={2} pt={15} textAlign='center'>
            <label htmlFor="contained-button-file">
             <Input accept="image/*" id="contained-button-file" multiple type="file" />
             <Button variant="contained" component="span" color="grey" margin={5} variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "150px",
                minWidth: "170px",
                minHeight: "150px",
                border: 'dashed',
                fontSize: '13px'
                }}>
                <input type="file" style={{display: 'none'}} onChange={(e)=>{setImage(e.target.files[0])}} />
                    <Stack direction="column" spacing={5} alignItems="center" > 
                    <InsertPhotoOutlinedIcon sx={{ fontSize: 60 }} /> Upload logo </Stack> 
                </Button>
             </label>
            </Box>
            
            
            <Box textAlign='center'>
            <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span" variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "80px",
                minWidth: "170px",
                minHeight: "80px",
                border: 'dashed',
                fontSize: '11px'
                }}>
            
            <Stack direction="column" spacing={5} alignItems="center" > 
            <UploadFileRoundedIcon/> Upload departments </Stack> 
            </Button>
            </label>
            </Box>



            <Box textAlign='center'>
            <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span" variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "80px",
                minWidth: "170px",
                minHeight: "80px",
                border: 'dashed',
                fontSize: '11px'
                }}>
            
            <Stack direction="column" spacing={5} alignItems="center" > 
            <UploadFileRoundedIcon/> Upload Employees </Stack> 
            </Button>
            </label>
            </Box>


            <Box textAlign='center'>
            <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span" variant="outlined" style={{
                maxWidth: "170px",
                maxHeight: "80px",
                minWidth: "170px",
                minHeight: "80px",
                border: 'dashed',
                fontSize: '11px'
                }}>
            
            <Stack direction="column" spacing={5} alignItems="center" > 
            <UploadFileRoundedIcon/> Upload Geofence Info </Stack> 
            </Button>
            </label>
            </Box>
               
            </Stack>


          </SidebarSection>
        </SetionsWrapper>
      </Form>
    </Formik>
  );
};

export default AddCompany;