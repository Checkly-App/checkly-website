import { RiDashboard3Line, RiParentLine, RiBuildingLine, RiTimeLine } from 'react-icons/ri';

export const sideBarData = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <RiDashboard3Line size={20} />,
    },
    {
        title: 'Departments',
        path: '/admin/departments',
        icon: <RiBuildingLine size={20} />,
    },
    {
        title: 'Employees',
        path: '/admin/employees',
        icon: <RiParentLine size={20} />,
    },
    {
        title: 'Timesheets',
        path: '/admin/timesheets',
        icon: <RiTimeLine size={20} />,
    }
];
