import { React, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import side from '../../assets/images/sidePiece.svg';
import { MdLogout } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { sideBarData } from './Data';
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";

const SideBarWrapper = styled.div`
    grid-area: bar;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    @media  (max-width: 768px) {
        display: none;
        /* grid-area: main;
        position: fixed;
        width: 100vw;
        min-height: 100vh;
        top: 0;
        left: ${(props) => props.open ? '0' : '-100vw'};
        z-index: 1000; */
    } 
`
// const MenuIcon = styled.div`
//  @media  (max-width: 768px) {
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 20em;
//         height: 20em;
//         color: red;
//         font-size: xx-large;
//         z-index: 10000;
//     }
// `
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: ${props => props.nav ? 'center' : 'center'};
    flex-direction: column;
    background-color: white;
`
const NavItem = styled.li`
    width: 100%;
    height: 2em;
    margin-bottom: 1.5em;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Link = styled(NavLink)`
    width: 100%;
    height: 100%;
    color: #A3A1A1;
    font-size: 1em;
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
    }   
`
const LogoutWrapper = styled.div`
    width: 100%;
    color: #A3A1A1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
`
const Icon = styled.div`
    font-size: 1.25em;
    padding: 0 0 0 1em;
`
const NavTitle = styled.span`
    font-size: 1.25em;
    margin-left: 0.5em;
    flex: 2;
`
const Logo = styled.img`
    width: 5em;
`

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);


    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            window.history.replaceState(null, null, "/login");
            navigate("/login");
            window.location.reload(false);
        });
    }

    return (
        <>
            {/* <MenuIcon >
                {open ? <HiX onClick={() => { setOpen(!open) }} /> : <HiOutlineMenuAlt2 onClick={() => { setOpen(!open) }} />}
            </MenuIcon> */}
            <SideBarWrapper open={open}>
                <Wrapper>
                    <Logo src={logo} />
                </Wrapper>
                <Wrapper nav>
                    {sideBarData.map((item, index) => {
                        return (
                            <NavItem key={index}>
                                <Link to={item.path}>
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
                                <MdLogout size={22} />
                            </Icon>
                            <NavTitle>Logout</NavTitle>
                        </LogoutWrapper>
                    </NavItem>
                </Wrapper>
            </SideBarWrapper>
        </>
    );
};

export default Sidebar;