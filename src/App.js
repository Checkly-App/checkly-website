import logo from './assets/images/logo.svg';
import "./App.css";
import AddCompany from "./pages/AddCompany";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2CB1EF",
    },
    grey: {
      main: "#A3A1A1",
      secondary: "#A3A1A1",
      disabled: "#A3A1A1",
      hint: "#A3A1A1",
    },
    error: {
      main: "#F65786",
    },
  },
});


const AppContainer = styled.div`
  // height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  // grid-template-columns: 1fr 5fr;
  // grid-template-areas: "bar main";
  // justify-items: stretch;
  // justify-content: center;
`;
const SideBar = styled.div`
  // grid-area: bar;
  display: flex;
  width: 15%;
  // height: 100%;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  background-color: white;
`;
const Content = styled.div`
  // grid-area: main;
  // display: subgrid;
  align-items: center; 
  width: 85%;
  height: 100%;

  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 1.3em;
  font-weight: 400;
  margin: 0em 0em 1em 0em;
  text-align: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer className="App">
        <SideBar> 
          <Stack direction="column" spacing={85} alignItems="center" >
            <Stack direction="column" spacing={0} alignItems="center" >
                <Stack direction="row" spacing={1} alignItems="center" >
                   <Avatar 
                    alt="logo"
                    src={logo}
                    sx={{ width: 40, height: 70 }}
                  />
                  <Title>Checkly</Title>
               </Stack>
              <Divider style={{width:'100%'}} variant="middle" />    
            </Stack>
               <Stack direction="column" spacing={1} alignItems="left" style={{ marginLeft: -100 }}>
                <Divider style={{width:'100%'}} variant="middle" /> 
                <Button color="primary" startIcon={<LogoutIcon />}>
                  Logout
                </Button>
               </Stack>
            </Stack>
        </SideBar>
        <Content>
          <AddCompany />
        </Content>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;