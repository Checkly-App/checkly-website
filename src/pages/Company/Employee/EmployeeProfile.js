import { React, useState, useEffect } from 'react'
 import {ref, getDatabase } from 'firebase/database';
import "../../../Styles/EmployeeProfile.css"

// import { ref, onValue,getDatabase } from 'firebase/database';
// import { database, auth } from '../../../utilities/firebase';
import { ContentCutOutlined } from '@mui/icons-material';
// const [loading, setLoading] = useState(false);

const EmployeeProfile = (props) => {

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');

    const fetchEmployeeInfo = () => {
        const db = getDatabase();
        const name = '';
        const position = '';
        const department = '';
        const email = '';
        const phone = '';
        const id = '';
        const address = '';
        const birthdate = '';
        const gender = '';
        const EmployeeNode = ref(db, 'Employee/'+props.uid); // TODO: - UserID to be passed from shahad
        EmployeeNode.on('value', snapshot => {
            
            name = snapshot.val().name;
         
                  
            setName(name);
            position = snapshot.val().position;
            setPosition(position);
            department = snapshot.val().department;
            setDepartment(department);
            email = snapshot.val().email;
            setEmail(email);
            phone = snapshot.val().phone;
            setPhone(phone);
            id = snapshot.val().employee_id;
            setId(id);
            address = snapshot.val().address;
            setAddress(address);
            birthdate = snapshot.val().birthdate;
            setBirthdate(birthdate);
            gender = snapshot.val().gender;
            setGender(gender);
        });
    }

    useEffect(() =>{
      let  uid = props.uid
        //fetchEmployeeInfo();
    }, [props.uid]);

    return (
        <div className='cardProfile'>
            <div className='upper-containerProfile'></div>
            <div className='lower-containerProfile'>
                <h1 >name</h1>
                <h4 className="h4">Position:</h4> <p className="p">{position}</p><br></br><br></br>
                <h4 className="h4">Department:</h4> <p className="p">{department}</p><br></br><br></br>
                <h4 className="h4">Email:</h4> <p className="p">{email}</p><br></br><br></br>
                <h4 className="h4">Phone number:</h4> <p className="p">{phone}</p><br></br><br></br>
                <h4 className="h4">Employee ID:</h4> <p className="p">{id}</p><br></br><br></br>
                <h4 className="h4">Address: </h4> <p className="p">{address}</p><br></br><br></br>
                <h4 className="h4">Birthdate: </h4> <p className="p">{birthdate}</p><br></br><br></br>
                <h4 className="h4">gender: </h4> <p className="p">{gender}</p><br></br><br></br>
            </div>
        </div>
    )
}

export default EmployeeProfile;