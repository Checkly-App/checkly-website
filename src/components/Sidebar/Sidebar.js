import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineLineChart, AiOutlineAppstore, AiOutlineCluster } from 'react-icons/ai';
import { MdPeopleOutline, MdLogout } from 'react-icons/md'

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
    align-items: center;
    flex-direction: column;
`
const NavItem = styled.li`
    width: 100%;
    height: 2em;
    padding: 1em;
    list-style: none;
    display: flex;
`
const NavLink = styled(Link)`
    width: 100%;
    color: #A3A1A1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
     ${NavItem}:hover &{
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
`
const Icon = styled.div`
    flex: 1;
    text-align: end;
`
const NavTitle = styled.span`
    font-size: 1.25em;
    margin-left: 0.5em;
    flex: 2;
`
const Logo = styled.img`
    width: 5em;
`;
const LogoCaption = styled.h1`
    font-weight: 600;
`
const Divider = styled.div`
    background-color:  #A3A1A1;
    height: 1px;
    width: 80%;
    margin: 0 2em;
`
const Sidebar = () => {
    const sideBarData = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <AiOutlineDashboard size={22} />,
        },
        {
            title: 'Departments',
            path: '/departments',
            icon: <AiOutlineCluster size={22} />,
        },
        {
            title: 'Employees',
            path: '/employees',
            icon: <MdPeopleOutline size={22} />,
        },
        {
            title: 'Analytics',
            path: '/analytics',
            icon: <AiOutlineLineChart size={22} />,
        },
        {
            title: 'Services',
            path: '/services',
            icon: <AiOutlineAppstore size={22} />,
        }
    ];

    return (
        <SideBarWrapper>
            <Wrapper>
                <Logo src={logo} />
                <LogoCaption>Checkly</LogoCaption>
            </Wrapper>
            <Wrapper>
                {
                    sideBarData.map((item, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink to={item.path}>
                                    <Icon>{item.icon}</Icon>
                                    <NavTitle>{item.title}</NavTitle>
                                </NavLink>
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