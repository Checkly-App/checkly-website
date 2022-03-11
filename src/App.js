// import logo from './assets/images/logo.svg';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from 'styled-components';

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
const SideBar = styled.div`
  grid-area: bar;
  display: flex;
  align-items: center;
  background-color: white;
`
const Content = styled.div`
  grid-area: main;
  display: subgrid;
  align-items: center;
  background-color: #F5F5F5;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer className="App">
        <SideBar> Sidebar Content</SideBar>
        <Content>
          <AddEmployee />
        </Content>
      </AppContainer >
    </ThemeProvider>

  );
}

export default App;
