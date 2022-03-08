import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'


const RadioButtons = ({ name, ...other }) => {
    const field = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        setFieldValue(name, e.target.value);
    };

    const config = {
        ...field,
        ...other,
        defaultValue: 'Female',
        onChange: handleChange
    };

    return (
        <FormControl>
            <FormLabel id="radio-buttons-group">Gender</FormLabel>
            <RadioGroup
                row
                {...config} >
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
        </FormControl>
    );
};


export default RadioButtons;