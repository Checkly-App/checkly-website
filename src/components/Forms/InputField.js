import React, { useState } from 'react';
import { TextField, styled } from '@material-ui/core';
import { useField } from 'formik';
import { InputAdornment } from '@material-ui/core';


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
            // style: { color: (data.touched && data.error) ? '#F65786' : ((focus) ? '#A3A3A1' : '#2CB1EF') },
            endAdornment: < InputAdornment position="end" > {icon} </InputAdornment>
        }
    };

    if (data && data.touched && data.error) {
        config.error = true;
        config.helperText = data.error;
    }

    return (
        <TextField {...config}
        // onBlur={() => { !(data && data.touched && data.error)? setFocus(true) }}
        // onFocus={() => { setFocus(false) }} 
        />
    );
};


export default InputField;