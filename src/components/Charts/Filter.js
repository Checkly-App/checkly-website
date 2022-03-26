import React from 'react';
import muiStyled from '@mui/material/styles/styled';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';


const SelectInput = muiStyled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        background: 'linear-gradient(90deg, #56BBEB 0%, #58AAF3 100%)',
        fontSize: 12,
        color: 'white',
        padding: '5px 26px 5px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '&:focus': {
        borderRadius: 10,
    },
    '& .MuiSelect-iconStandard': {
        color: 'white',
        fill: 'white'
    },
    '& .MuiSelect-icon': {
        color: 'white',
        fill: 'white'
    }
}));

const Filter = ({ filters, label, id, val, handleChange }) => {
    return (
        <div>
            <FormControl variant="standard">
                <Select
                    labelId={label}
                    id={id}
                    value={val}
                    onChange={handleChange}
                    input={<SelectInput />}>
                    {filters.map((filter, pos) => {
                        return (
                            <MenuItem key={pos} value={filter.value}>{filter.value}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default Filter;