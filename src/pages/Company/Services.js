import React from 'react';
import { Link } from 'react-router-dom';
import { Construction } from './Dashboard';

const Services = () => {
    return (
        <Construction>
            Services Under Construction
            <Link to='/admin/services/timesheets'>Generate Timesheets</Link>
        </Construction>
    );
};

export default Services;