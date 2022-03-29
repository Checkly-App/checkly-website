import { React, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/Forms/InputField";
import PolicyRadioButtons from "../components/Forms/PrefrenceRadioButtons";
import GeneralSelectField from "../components/Forms/GeneralSelectField";
import { ref as ref_database, set } from "firebase/database";
import { database, auth, storage } from "../utilities/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled, { keyframes } from "styled-components";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import logo from "../assets/images/logo.svg";
import { ref, uploadBytesResumable } from "firebase/storage";
import { Alert, AlertTitle, Snackbar } from '@mui/material'; 

// Main COntainer
const SectionsWrapper = styled.div`
  margin: 5em 5em 5em 7em;
  display: flex;
  // justify-content: center;
  // width: 100%;
`;

//Main Sections container
const MainSections = styled.div``;

const Section = styled.div`
  background-color: white;
  border-radius: 0.75em;
  padding: 3em;
  margin-bottom: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5em;
  row-gap: 0.75em;
  width: 40em;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ButtonCircle2 = styled.button`
  background-color: white;
  height: 85px;
  width: 85px;
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 27px;
  border: 5px solid white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 15px;
`;

const Section2 = styled.div`
  background-color: white;
  border-radius: 0.75em;
  padding: 0.5em;
  margin-bottom: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: block;
`;

const Section3 = styled.div`
  background-color: white;
  border-radius: 0.75em;
  padding: 2em;
  margin-bottom: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Sidebar Sections Wrapper
const SidebarSectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
// The Sidebar Sections
const SidebarSection1 = styled.div`
  width: 15em;
  background-color: white;
  border-radius: 0.75em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0 3em 3em 3em;
  padding: 1em;
  display: flex;
  flex-diretcion: column;
  justify-content: center;
  align-items: center;
`;
const SidebarSection2 = styled.div`
  width: 15em;
  background-color: white;
  border-radius: 0.75em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0 3em 1em 3em;
  padding: 1em;
  height: 70%;
  display: flex;
  flex-diretcion: column;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h1`
  font-size: 1.5em;
  font-weight: 500;
  margin: 0em 0em 1em 0em;
  text-align: center;
`;

const SButton = styled.button`
  width: 15em;
  cursor: pointer;
  height: 3em;
  font-size: 1em;
  font-weight: 500;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 0.5em;
  border: none;
  background: linear-gradient(90deg, #56bbeb 0%, #58aaf3 100%);
  margin: 0em 0em 0em 12em;
  margin-left: 10em
  margin-right: 0em
`;

const Input = styled("input")({
  display: "none",
});

//Arrays

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
    name: "Jizan",
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
    name: "Law",
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
    name: "1001-5000 Employees",
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

const AddCompany = () => {

  var random_id = Math.ceil(Math.random() * (9999 - 1000) + 100);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const initialValues = {
    name: "",
    abbreviation: "",
    email: "",
    location: "",
    size: "",
    industry: "",
    age: "",
    Policy: "",
    hours: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    abbreviation: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    size: Yup.string().required("Size is required"),
    industry: Yup.string().required("Industry is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.string().required("Company's age is required"),
    hours: Yup.string().required("Working hours are required"),
  });

  const addCompany = (company) => {
  
    createUserWithEmailAndPassword(auth, company.email, "123456")
      .then((result) => {
        set(ref_database(database, "Company/" + result.user.uid), {
          name: company.name,
          com_id: random_id,
          geo_id: Math.ceil(Math.random() * (9999 - 1000) + 100),
          abbreviation: company.abbreviation,
          email: company.email,
          location: company.location,
          size: (company.size).substring(0, (company.size).indexOf(' ')),
          industry: company.industry,
          age: (company.age).substring(0, (company.age).indexOf(' ')),
          policy: company.Policy,
          working_hours: company.hours,
        });
        set(ref_database(database, "Department/" + company.abbreviation + "Default"), {
          company_id: result.user.uid,
          dep_id: "0",
          manager: "TBD",
          name: "Default",
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

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `Companies/${random_id}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
  };

  return (
    <div>
      <SectionsWrapper>

        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addCompany(values);
            resetForm();
            setOpenSnackbar(true); 
          }}
        >
          <Form>
          <Snackbar
                autoHideDuration={6000}
                open={openSnackbar}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <Alert onClose={closeSnackbar} severity='info' variant='filled'>
                  <AlertTitle>Comapny has been registered successfully!</AlertTitle>
                </Alert>
              </Snackbar>
            <MainSections>
              {/* header */}

              <Section2>
                <ButtonCircle2
                  style={{ zIndex: 1, marginTop: -90, marginLeft: 320 }} 
                ></ButtonCircle2>
                <Avatar
                  style={{ zIndex: 1, marginTop: -108, marginLeft: 337 }}
                  background-color="white"
                  alt="R"
                  src={logo}
                  sx={{ width: 50, height: 135 }}
                />
                <FormTitle>Register Company To Checkly</FormTitle>
              </Section2>

              {/* end of header */}

              <Section>
                <InputField name="name" id="name" label="Name" />

                <InputField
                  name="abbreviation"
                  id="abbreviation"
                  label="Name Abbreviation"
                />

                <InputField name="email" id="email" label="Email" />

                <GeneralSelectField
                  name="location"
                  id="location"
                  label="Location"
                  options={locations}
                />

                <GeneralSelectField
                  name="industry"
                  id="industry"
                  label="Industry"
                  options={industries}
                />

                <GeneralSelectField
                  name="size"
                  id="size"
                  label="Size"
                  options={sizes}
                />

                <GeneralSelectField
                  name="age"
                  id="age"
                  label="Years Since Establishment"
                  options={ages}
                />

              </Section>

              <Section3>
                <ContentWrapper>
                  <PolicyRadioButtons
                    name="Policy"
                    id="Policy"
                    label="Policy"
                  />
                  <InputField name="hours" id="hours" label="Hours" />
                </ContentWrapper>
                <ButtonWrapper>
                  <SButton type="submit">Register Company</SButton>
                </ButtonWrapper>
              </Section3>
            </MainSections>
          </Form>
        </Formik>

        <SidebarSectionsWrapper>
          {/* Upload Logo  */}
          <SidebarSection1>
            <form onSubmit={formHandler}>
              <Stack direction="column" spacing={5} alignItems="center">
                <label htmlFor="contained-button-file">
                  <Box textAlign="center">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                    />
                    <Button
                      type="submit"
                      color="grey"
                      variant="contained"
                      component="span"
                      variant="outlined"
                      style={{
                        maxWidth: "170px",
                        maxHeight: "150px",
                        minWidth: "170px",
                        minHeight: "150px",
                        border: "dashed",
                        fontSize: "13px",
                      }}
                    >
                      <Stack direction="column" spacing={5} alignItems="center">
                        <InsertPhotoOutlinedIcon /> Select Logo{" "}
                      </Stack>
                    </Button>
                  </Box>
                </label>
                <SButton style={{maxWidth: '170px', maxHeight: "30px" }} type="submit">
                  Upload
                </SButton>
              </Stack>
            </form>
          </SidebarSection1>

          {/* end of Upload Logo  */}

          {/* the Sidebar Section (uploads) */}

          <SidebarSection2>
            <Stack direction="column" justify="center" spacing={5}>
              <Box textAlign="center">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    variant="outlined"
                    style={{
                      maxWidth: "170px",
                      maxHeight: "80px",
                      minWidth: "170px",
                      minHeight: "80px",
                      border: "dashed",
                      fontSize: "11px",
                    }}
                  >
                    <Stack direction="column" spacing={5} alignItems="center">
                      <UploadFileRoundedIcon /> Select departments{" "}
                    </Stack>
                  </Button>
                </label>
              </Box>

              <Box textAlign="center">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    variant="outlined"
                    style={{
                      maxWidth: "170px",
                      maxHeight: "80px",
                      minWidth: "170px",
                      minHeight: "80px",
                      border: "dashed",
                      fontSize: "11px",
                    }}
                  >
                    <Stack direction="column" spacing={5} alignItems="center">
                      <UploadFileRoundedIcon /> Select Employees{" "}
                    </Stack>
                  </Button>
                </label>
              </Box>
              <Box textAlign="center">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    variant="outlined"
                    style={{
                      maxWidth: "170px",
                      maxHeight: "80px",
                      minWidth: "170px",
                      minHeight: "80px",
                      border: "dashed",
                      fontSize: "11px",
                    }}
                  >
                    <Stack direction="column" spacing={5} alignItems="center">
                      <UploadFileRoundedIcon /> Select Geofence Info{" "}
                    </Stack>
                  </Button>
                </label>
              </Box>
              <SButton style={{maxWidth: '170px', maxHeight: "30px" }}>
                  Upload
                </SButton>
            </Stack>
          </SidebarSection2>
        </SidebarSectionsWrapper>
      </SectionsWrapper>
    </div>
  );
};

export default AddCompany;
