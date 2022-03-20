import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Departments from './Company Admin/Departments';
import Dashboard from './Company Admin/Dashboard';
import Analytics from './Company Admin/Analytics';
import Services from './Company Admin/Services';
import AddEmployee from './Company Admin/AddEmployee';
import Sidebar from '../components/Sidebar/Sidebar';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas: 'bar main';
  justify-items: stretch;
  justify-content: center;
`
const Content = styled.div`
  overflow-y: scroll;
  grid-area: main;
  display: subgrid;
  align-items: center;
  background-color: #F5F5F5;
`

const CompanyAdmin = () => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <Routes>
                    <Route exact path="/admin/dashboard" element={<Dashboard />} />
                    <Route exact path="/admin/departments" element={<Departments />} />
                    <Route exact path="/admin/employees" element={<AddEmployee />} />
                    <Route exact path="/admin/analytics" element={<Analytics />} />
                    <Route exact path="/admin/services" element={<Services />} />
                </Routes>
            </Content>
        </Container>
    );
};

export default CompanyAdmin;