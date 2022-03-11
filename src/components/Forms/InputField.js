import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { InputAdornment } from '@mui/material';

const InputField = ({ name, icon, ...other }) => {
    const [field, data] = useField(name);
    const config = {
        ...field,
        ...other,
        helperText: ' ',
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
        margin: 'dense',
        InputProps: {
            endAdornment: < InputAdornment position="end" > {icon} </InputAdornment>
        }
    };

    if (data && data.touched && data.error) {
        config.error = true;
        config.helperText = data.error;
    }

    return (
        <TextField {...config} />
    );
};

export default InputField;