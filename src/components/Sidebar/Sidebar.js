import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import side from '../../assets/images/sidePiece.svg';
import { RiLogoutCircleLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom';
import { sideBarData } from './Data';
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

const SideBarWrapper = styled.div`
    grid-area: bar;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border-top-right-radius:45px 40px;
    border-bottom-right-radius: 45px 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin: 0 1em 0 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

     /* @media  (max-width: 768px) {
        padding: 1em 3em;
        height: 100vh;
        background-color: white;
        flex-direction: column;
        color: #35435E ;
        display: ${props => props.open ? 'flex' : 'none'};
    } */
    @media  (max-width: 768px) {
        display: flex;
        border-radius: 0;
        grid-area: main;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: ${(props) => props.open ? '0' : '-100vw'};
        z-index: 10;
    } 
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: ${props => props.nav ? 'center' : 'center'};
    flex-direction: column;

    @media  (max-width: 768px) {
       width: 70vw;
    }
`
const NavItem = styled.li`
    width: 100%;
    margin-bottom: 1.5em;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media  (max-width: 768px) {
        align-items: center;
    }
`
const Link = styled(NavLink)`
    width: 100%;
    padding: 0.25em;
    color: #A3A1A1;
    font-size: 0.85em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    
    ${NavItem}:hover &{
    color: #2CB1EF;
    }

    &.active {
    background-image: url(${side});
    background-repeat: no-repeat;
    background-position: right center;
    background-size: contain;
    color: #2CB1EF;

        @media  (max-width: 768px) {
            background-position: left center;
        }
    }   


`
const ImageLink = styled(Link)`
    padding: 0;
    margin: 0;
    text-decoration: none;
`
const LogoutWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.25em;
    color: #A3A1A1;
    font-size: 0.85em;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    text-decoration: none;
  
    cursor: pointer;
`
const Icon = styled.div`
    padding: 0 0 0 1em;
`
const NavTitle = styled.span`
    font-size: 1.25em;
    margin-left: 0.5em;
    flex: 2;
    @media  (max-width: 768px) {
        flex: 1;
    }
`
const Logo = styled.img`
    width: 6em;
`

const Sidebar = ({ open, updateOpen }) => {
    const navigate = useNavigate();

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            window.history.replaceState(null, null, "/login");
            navigate("/login");
            window.location.reload(false);
        });
    }

    return (
        <SideBarWrapper open={open}>
            <Wrapper>
                <ImageLink to='/'>
                    <Logo src={logo} />
                </ImageLink>
            </Wrapper>
            <Wrapper nav>
                {sideBarData.map((item, index) => {
                    return (
                        <NavItem key={index}>
                            <Link onClick={() => updateOpen(false)} to={item.path}>
                                <Icon>{item.icon}</Icon>
                                <NavTitle>{item.title}</NavTitle>
                            </Link>
                        </NavItem>
                    );
                })}
            </Wrapper>
            <Wrapper>
                <NavItem onClick={logout}>
                    <LogoutWrapper>
                        <Icon>
                            <RiLogoutCircleLine size={18} />
                        </Icon>
                        <NavTitle>Logout</NavTitle>
                    </LogoutWrapper>
                </NavItem>
            </Wrapper>
        </SideBarWrapper>

    );
};

export default Sidebar;