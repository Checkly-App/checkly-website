import { React, useState, useEffect } from 'react'
import "../../../Styles/EmployeeProfile.css"
import { ref, onValue } from 'firebase/database';
import { database } from '../../../utilities/firebase';

const EmployeeProfile = (props) => {
    
    const [name, setName] = useState('d');
    const [position, setPosition] = useState('d');
    const [department, setDepartment] = useState('d');
    const [email, setEmail] = useState('d');
    const [phone, setPhone] = useState('d');
    const [id, setId] = useState('d');
    const [address, setAddress] = useState('d');
    const [birthdate, setBirthdate] = useState('d');
    const [gender, setGender] = useState('d');

    //MARK: - search for employee with props.uid
    useEffect(() =>{
        onValue(ref(database, 'Employee/'+props.uid), (snapshot) => {
            const data = snapshot.val();
            //1-Employee name
            const name = data.name;    
            setName(name);
            //2-Employee position
            const position = data.position;
            setPosition(position);
            //3-Employee department
            const department = data.department;
            setDepartment(department);
            //4-Employee email
            const email = data.email;
            setEmail(email);
            //Employee phone
            const phone = data.phone_number;
            setPhone(phone);
            //5-Employee id
            const id = data.employee_id;
            setId(id);
            //6-Employee address
            const address = data.address;
            setAddress(address);
            //7-Employee birthdate
            const birthdate = data.birthdate;
            setBirthdate(birthdate);
            //8-Employee gender
            const gender = data.gender;
            setGender(gender);
        });
    }, [props.uid]);



    //MARK: - fetching department info
    useEffect(() =>{
        onValue(ref(database, 'Department/'+department), (snapshot) => {
            const data = snapshot.val();
            //9- Department name
            const department = data.name;
            setDepartment(department);
        });
    });


    return (
        <div className='cardProfile'>
            <div className='upper-containerProfile'></div>
            <div className='lower-containerProfile'>
                <h1 className="EmployeeProfileHeader">{name}</h1> <br></br>
                <h4 className="EmployeeProfileSubHeader">Position:  </h4> <p className="employeeInfo">{position}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Department:  </h4> <p className="employeeInfo">{department}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Email:  </h4> <p className="employeeInfo">{email}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Phone number:  </h4> <p className="employeeInfo">{phone}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Employee ID:  </h4> <p className="employeeInfo">{id}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Address:  </h4> <p className="employeeInfo">{address}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Birthdate:  </h4> <p className="employeeInfo">{birthdate}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">gender:  </h4> <p className="employeeInfo">{gender}</p><br></br><br></br>
            </div>
        </div>
    )
}

export default EmployeeProfile;