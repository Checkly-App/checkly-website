import { AiOutlineDashboard, AiOutlineLineChart, AiOutlineAppstore, AiOutlineCluster } from 'react-icons/ai';
import { MdPeopleOutline } from 'react-icons/md'
export const sideBarData = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <AiOutlineDashboard size={22} />,
    },
    {
        title: 'Departments',
        path: '/admin/departments',
        icon: <AiOutlineCluster size={22} />,
    },
    {
        title: 'Employees',
        path: '/admin/employees',
        icon: <MdPeopleOutline size={22} />,
    },
    {
        title: 'Analytics',
        path: '/admin/analytics',
        icon: <AiOutlineLineChart size={22} />,
    },
    {
        title: 'Services',
        path: '/admin/services',
        icon: <AiOutlineAppstore size={22} />,
    }
];
