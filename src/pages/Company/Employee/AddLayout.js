import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddEmployee from './AddEmployee';
import styled from 'styled-components';
import AddBatchEmployees from './AddBatchEmployees';
import { Subtitle, Title, Wrapper } from '../Dashboard';


export const MainWrapper = styled.div`
    width: 50%;
`
export const Header = styled.div`
    margin: 2em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Container = styled(Wrapper)`
    margin: 1em 5em;
`
const AddLayout = () => {
    const [alignment, setAlignment] = useState('individual');

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <Container>
            <Header>
                <MainWrapper>
                    <Title>{`Add Employee${alignment === 'batch' ? 's' : ''}`}</Title>
                    <Subtitle>Start by adding an individual employee or a batch of employees</Subtitle>
                </MainWrapper>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}>
                    <ToggleButton value="batch">Add Batch</ToggleButton>
                    <ToggleButton value="individual">Add Individual</ToggleButton>
                </ToggleButtonGroup>
            </Header>
            {alignment === 'batch' ? <AddBatchEmployees /> : <AddEmployee />}
        </Container>
    );
};

export default AddLayout;