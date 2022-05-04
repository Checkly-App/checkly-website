import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Subtitle, Title, Wrapper } from '../Dashboard';
import { MainWrapper, Header } from './AddLayout';
import EmployeeStatistics from './EmployeeStatistics';
import { useLocation } from 'react-router-dom';

const ViewLayout = () => {
    const [alignment, setAlignment] = useState('statistics');
    const location = useLocation();
    const employee = {
        name: location.state.name,
        id: location.state.id,
        employee_id: location.state.employeeID
    }

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <Wrapper>
            <Header>
                <MainWrapper>
                    <Title>{`${alignment === 'statistics' ? employee.name.slice(0, employee.name.indexOf(' ')) + '\'s Statistics' : 'View Profile'}`}</Title>
                    <Subtitle> {alignment === 'statistics' ? employee.name + '—' + employee.employee_id : ' '}</Subtitle>
                </MainWrapper>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}>
                    <ToggleButton value="statistics">View Statistics</ToggleButton>
                    <ToggleButton value="profile">View Profile</ToggleButton>
                </ToggleButtonGroup>
            </Header>
            {alignment === 'statistics' ? <EmployeeStatistics uid={employee.id} /> : <></>}
        </Wrapper>
    );
};

export default ViewLayout;






