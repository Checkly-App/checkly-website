import { RiDashboard3Line, RiParentLine, RiBuildingLine, RiTimeLine, RiMailLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { IoMegaphoneOutline } from 'react-icons/io5'

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
    },
    {
        title: 'Settings',
        path: '/admin/settings',
        icon: <FiSettings size={20} />,
    },
    {
        title: 'Announce',
        path: '/admin/announcement',
        icon: <IoMegaphoneOutline size={20} />,
    },

];
