import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SelectField = ({ name, options, ...other }) => {
    const [field, data] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        const { value } = e.target;
        console.log(value)
        setFieldValue(name, value);
    };

    const config = {
        ...field,
        ...other,
        select: true,
        helperText: ' ',
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
        margin: 'none',
        InputProps: {
            style: { textAlign: 'left' }
        },
        onChange: handleChange,
    };

    if (data && data.touched && data.error) {
        config.error = true;
        config.helperText = data.error;
    }

    return (
        <TextField {...config}>
            {options.map((option, pos) => {
                return (
                    <MenuItem key={pos} value={option.department}>
                        {option.name}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default SelectField;