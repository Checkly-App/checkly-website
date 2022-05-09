import { React, useState, useEffect } from 'react'
import "../../../Styles/EmployeeProfile.css"
import { ref, onValue } from 'firebase/database';
import { database } from '../../../utilities/firebase';

const EmployeeProfile = (props) => {
    
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [departmentID, setDepartmentID] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [checkIn, setCheckIn] = useState('');

    let today = new Date();
    var date = "";
    if(parseInt(today.getMonth()+1) < 10){
        date = "0" + parseInt(today.getMonth()+1) + "-";
    }

    if(today.getDate() < 10){
        date = date + "0" + today.getDate() + "-";
    }
    date = date + today.getFullYear();

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
            const departmentID = data.department;
            setDepartmentID(departmentID);
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
        onValue(ref(database, 'Department/'+departmentID), (snapshot) => {
            const data = snapshot.val();
            //9- Department name
            const dep = data.name;
            setDepartmentName(dep);
        });
    });


    //MARK: - fetching attendance info
    useEffect(() =>{
        onValue(ref(database, 'LocationAttendance/ emp'+props.uid+'-Attendance/'+date), (snapshot) => {
            if(snapshot.val()['check-out'] != "TBD"){
                setCheckIn("Employee is checked out");
            }else{
                setCheckIn("Emplyee is checked In");
            }
        });
    });

    return (
        <div className='cardProfile'>
            <div className='upper-containerProfile'></div>
            <div className='lower-containerProfile'>
                <h1 className="EmployeeProfileHeader">{name}</h1><br></br>
                <h4 className="EmployeeProfileSubHeader">Status:  </h4> <p className="employeeInfo attendance">{checkIn}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Position:  </h4> <p className="employeeInfo">{position}</p><br></br><br></br>
                <h4 className="EmployeeProfileSubHeader">Department:  </h4> <p className="employeeInfo">{departmentName}</p><br></br><br></br>
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