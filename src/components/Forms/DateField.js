import React from 'react';
import { DatePicker, styled } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';


const DateField = ({ name, options, ...other }) => {
    const [field, data] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        const { value } = e.target;
        setFieldValue(name, value);
    };

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
    };

    if (data && data.touched && data.error) {
        config.error = true;
        config.helperText = data.error;
    }

    return (
        <DatePicker {...config} />
    );
};

export default DateField;