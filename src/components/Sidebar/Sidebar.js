import { React, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import side from '../../assets/images/sidePiece.svg';
import { RiLogoutCircleLine } from 'react-icons/ri'
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
    border-top-right-radius:45px 40px;
    border-bottom-right-radius: 45px 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin: 0 1em 0 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

    @media  (max-width: 768px) {
        display: none;
        grid-area: main;
        position: fixed;
        width: 100vw;
        min-height: 100vh;
        top: 0;
        left: ${(props) => props.open ? '0' : '-100vw'};
        z-index: 1000;
    } 
`
const MenuIcon = styled.div`
 @media  (max-width: 768px) {
        position: absolute;
        top: 0;
        left: 0;
        width: 20em;
        height: 20em;
        color: red;
        font-size: xx-large;
        z-index: 10000;
    }
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: ${props => props.nav ? 'center' : 'center'};
    flex-direction: column;
`
const NavItem = styled.li`
    width: 100%;
    margin-bottom: 1.5em;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: flex-end;
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
`
const Logo = styled.img`
    width: 6em;
`

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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
            {/* <MenuIcon onClick={() => setOpen(!open)}>
                {open ? <HiX /> : <HiOutlineMenuAlt2 />}
            </MenuIcon> */}
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
                                <RiLogoutCircleLine size={18} />
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