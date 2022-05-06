import { React, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/Forms/InputField';
import SelectField from '../../components/Forms/SelectField';
import { set, ref, onValue, getDatabase, push } from 'firebase/database';
import { database } from '../../utilities/firebase';
import styled from 'styled-components'
import TitleIcon from '@mui/icons-material/Title';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { Subtitle, Title, Wrapper } from './Dashboard';
import { auth } from '../../utilities/firebase';

const Section = styled.div`
    background-color: white;
    border-radius: 0.75em;
    padding: 3em;
    margin-bottom: 3em;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5em;
    row-gap: 0.75em;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
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
`

const MainWrapper = styled.div`
    width: 100%;
    margin: 2em 0;
`


const CreateAnnouncement = () => {

    const [departments, setDepartments] = useState([{
        department: '',
        name: ''
    }]);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const closeSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        onValue(ref(database, 'Department'), (snapshot) => {
            const data = snapshot.val();
            var departments = [];
            for (let id in data) {
                if (data[id]['company_id'] === auth.currentUser.uid) { // TODO: - company's id
                    const department = {
                        department: 'dep' + data[id]['dep_id'],
                        name: data[id]['name']
                    };
                    departments.push(department)
                }
            }
            setDepartments(departments);
        });
    }, []);

    const initialValues = {
        Title: '',
        department: '',
        announcement: '',
    };

    const validationSchema =
        Yup.object({
            Title: Yup.string().required('Title is required'),
            department: Yup.string().required('Department is required'),
            announcement: Yup.string().required('Announcement is required')
        });


    const addAnnouncement = (announcement) => {

        const db = getDatabase();
        const announcementRef = ref(db, 'Announcement');
        const newAnnouncementRef = push(announcementRef);
        set(newAnnouncementRef, {
            title: announcement.Title,
            body: announcement.announcement,
            department: announcement.department,
            author: " ",//user email
            date: `${new Date().toLocaleString()}`
        });

    }

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                addAnnouncement(values);
                resetForm();
                setOpenSnackbar(true);
                // alert(JSON.stringify(values, null, 2));
            }}>
            <Form>
                <Snackbar
                    autoHideDuration={6000}
                    open={openSnackbar}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={closeSnackbar} severity='info' variant='filled'>
                        <AlertTitle>Announcement has been posted successfully!</AlertTitle>
                    </Alert>
                </Snackbar>
                <Wrapper>
                    <MainWrapper>
                        <Title>Create Announcement</Title>
                        <Subtitle>Publish an announcement to selected department emplooyes</Subtitle>
                    </MainWrapper>
                    <Section>
                        <InputField
                            name='Title'
                            icon={<TitleIcon color='#D7D7D7' size={24} />}
                            id='Title'
                            label='Title'
                        />
                        <SelectField
                            name='department'
                            id='department'
                            label='Department'
                            options={departments}
                        />
                        <InputField
                            name='announcement'
                            id='announcement'
                            label="Announcement"
                            multiline
                            rows={6}
                        />
                    </Section>
                    <Button type='submit'>  Publish Announcement </Button>
                </Wrapper>
            </Form>
        </Formik>
    );
};



export default CreateAnnouncement;