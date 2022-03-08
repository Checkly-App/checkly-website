import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';


const DateField = ({ name, options, ...other }) => {
    const [field, data] = useField(name);

    const config = {
        ...field,
        ...other,
        type: 'date',
        helperText: ' ',
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
        margin: 'dense',
        InputLabelProps: {
            shrink: true
        },
        InputProps: {
            inputProps: { max: "2006-01-01" }
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

export default DateField;