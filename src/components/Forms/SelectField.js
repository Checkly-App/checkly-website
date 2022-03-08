import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';


const SelectField = ({ name, options, ...other }) => {
    const [field, data] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        const { value } = e.target;
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
        margin: 'dense',
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
            {Object.keys(options).map((item, pos) => {
                return (
                    <MenuItem key={pos} value={item}>
                        {options[item]}
                    </MenuItem>
                )
            })}
        </TextField>
    );
};

export default SelectField;