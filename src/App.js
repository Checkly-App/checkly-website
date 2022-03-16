// import logo from './assets/images/logo.svg';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Departments from './pages/Departments';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Services from './pages/Services';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2CB1EF'
    },
    grey: {
      main: '#A3A1A1',
      secondary: '#A3A1A1',
      disabled: '#A3A1A1',
      hint: '#A3A1A1'
    },
    error: {
      main: '#F65786'
    },
    success: {
      main: '#7EC900'
    }
  }
});

const AppContainer = styled.div`
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer className="App">
          <Sidebar />
          <Content>
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/departments" element={<Departments />} />
              <Route path="/admin/employees" element={<AddEmployee />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/services" element={<Services />} />
            </Routes>
          </Content>
        </AppContainer >
      </Router>
    </ThemeProvider>

  );
}

export default App;
