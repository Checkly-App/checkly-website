import React from 'react';
import { useFormikContext } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

const PolicyRadioButtons = ({ name, ...other }) => {
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        setFieldValue(name, e.target.value);
    };

    const config = {
        ...other,
        defaultValue: 'Female',
        onChange: handleChange
    };

    return (
        <FormControl>
            <FormLabel id="radio-buttons-group">Company Attendance Policy</FormLabel>
            <RadioGroup
                row
                {...config} >
                <FormControlLabel value="Fixed" control={<Radio />} label="Fixed" />
                <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
            </RadioGroup>
        </FormControl>
    );
};


export default PolicyRadioButtons;