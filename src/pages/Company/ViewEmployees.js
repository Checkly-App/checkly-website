import { React, useState, useEffect } from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../../utilities/firebase';
import { MdAccountCircle ,MdSearch} from "react-icons/md";
import '../../Styles/EmployeeCard.css'
import styled from 'styled-components';




import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid  ,TextField} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>


/**
 * Send Email Cloud Function 
 */


/**
 * Styled Components 
 */

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
const MainWrapper = styled.div`
    width: 100%;
    margin: 2em 0;
`

const ViewEmployees = () => {
  
  
  
    const [employees, setEmployees] = useState([{
        tokens:'',
        name:'',
        position: '',
        department: '',
    }]);
    const [searchterm, setsearchterm] = useState("");
const input ={
    backgroundColor :"white",

  
   width: "90%" , 
  
   padding: "5px 5px 5px 10px", /* Add some padding */
   border: "1px solid #ddd", /* Add a grey border */
   marginBottom: "12px" ,
   marginLeft:"5%",/* Add some space below the input */
   borderRadius:"12px"
 
}


const handleMouseEnter = e => {
    e.target.style.border = "none"
  }

    
     
     const navigate = useNavigate()
    useEffect(() => {
        onValue(ref(database, 'Employee'), (snapshot) => {
            const data = snapshot.val();
            var employsarray = [];
            for (let id in data) {
               
                    const employee = {
                        
                        tokens:data[id]['image_token'],
                        name:data[id]['name'],
                        position: data[id]['position'],
                        department:data[id] ['department'],
                    };
                    onValue(ref(database, 'Department'), (snapshot) => {
                        const data = snapshot.val();
                       
                        for (let id in data) {
                           
                            if (id  === employee.department){
                                const namedeb = {
                                    
                                   
                                    namedep:data[id]['name'],
                                    comid :data[id]['company_id']
                                    
                                };
                                if (namedeb.comid === auth.currentUser.uid){
                                employee.department = namedeb.namedep
                                employsarray.push(employee)}
                            }
                               
                                
                               
                            }
                      
                       
                    });
                    
                   
                }
           setEmployees(employsarray)
           
        });
        return () => {
           
           
            setEmployees([]);
        }
    }, []);

   
   
    
    const emp = ()=> {

 navigate("/admin/Addemployee")
    }

    return (
       
                <SetionsWrapper>
                    <div className="container">
                    <div className="row">
                    <div className="col-6 col-md-6">
                    <MainWrapper>
                        <MainTitle> Employees</MainTitle>
                        <Subtitle>Here is the list of employee’s that work at the Company </Subtitle>
                       
                    </MainWrapper>
                    </div>
                    <div className="col-6 col-md-6" style={{padding:"5%" ,paddingLeft:"40%" ,marginLeft:"auto"}}>
                    <Button onClick={emp}>  Add new employee </Button>
                    </div>
                    </div></div>

 
 <div className="container">
 
 
  

{/* <div className="input-group" style={input}>
<i className="fa fa-envelope icon"><MdSearch size="20px"  style={{paddingLeft:"0em" ,marginTop:"0.3em"}}/></i>
  <input  className="inputsearch"  type="text" placeholder="Search for names ,departments,position.." onChange={(event)=>{setsearchterm(event.target.value)}} onMouseEnter={handleMouseEnter} />
  
</div> */}
<input  className="inputsearch"  type="text" placeholder="Search for names ,departments,position.." onChange={(event)=>{setsearchterm(event.target.value)}} />

                    <div className="row">
                   

    { employees.filter((emp)=>{

        if (searchterm === ""){
          
return emp
        }else if (emp.name.toLowerCase().includes(searchterm.toLowerCase())) {
            
            return emp
        }
        else if (emp.department.toLowerCase().includes(searchterm.toLowerCase())) {
            
            return emp
        }
        else if (emp.position.toLowerCase().includes(searchterm.toLowerCase())) {
            
            return emp
        }
    }
    
    
    ).map((emp,Index)=> {

    return (    
    <Grid item xs={4} style={{paddingBottom:"1em"}} key={Index}>
<Card sx={{ maxWidth: 250 ,minHeight:260 } }>
      <CardActionArea>
        
        <CardContent>
            { emp.tokens == "null" ? <MdAccountCircle 
        
         color='lightgray' style={{padding:"0.5em" ,marginLeft:"0em",height:"160px",width:"220px"}}/> :   <img src={emp.tokens} style={{ width:"250px",height:"150px",paddingRight:"3em",paddingLeft:"0.3em" ,marginBottom:"0.5em"}} alt="logo"  />}

            
        
            
          <Typography gutterBottom variant="body1" component="div" textAlign="center" fontWeight="bold">
            {emp?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
         {emp?.department}
          </Typography>
          <Typography variant="body2" color="#56BBEB" textAlign="center">
         {emp?.position}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid> )
  }  )
}
    
    

    </div> </div>
                    </SetionsWrapper>
                   
    )
};

export default ViewEmployees;
