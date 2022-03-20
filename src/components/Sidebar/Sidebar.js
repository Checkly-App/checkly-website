import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import side from '../../assets/images/sidePiece.svg';
import { MdLogout } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { sideBarData } from './Data';

const SideBarWrapper = styled.div`
  grid-area: bar;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
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
    height: 2em;
    padding: 1em;
    list-style: none;
    display: flex;
`
const Link = styled(NavLink)`
    width: 100%;
    height: 100%;
    color: #A3A1A1;
    font-size: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
    justify-content: space-between;
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
`;
const LogoCaption = styled.h1`
    font-weight: 500;
    font-size: 1.75em;
    margin-top: 0.25em;
`
const Divider = styled.div`
    background-color:  #A3A1A1;
    height: 0.5px;
    width: 80%;
    margin: 0 2em;
`

const Sidebar = () => {
    return (
        <SideBarWrapper>
            <Wrapper>
                <Logo src={logo} />
                <LogoCaption></LogoCaption>
            </Wrapper>
            <Wrapper nav>
                {
                    sideBarData.map((item, index) => {
                        return (
                            <NavItem key={index}>
                                <Link to={item.path}>
                                    <Icon>{item.icon}</Icon>
                                    <NavTitle>{item.title}</NavTitle>
                                </Link>
                            </NavItem>
                        )
                    })
                }
            </Wrapper>
            <Wrapper>
                <Divider />
                <NavItem>
                    <LogoutWrapper>
                        <Icon>
                            <MdLogout size={22} />
                        </Icon>
                        <NavTitle>Logout</NavTitle>
                    </LogoutWrapper>
                </NavItem>
            </Wrapper>
        </SideBarWrapper>
    );
};

export default Sidebar;