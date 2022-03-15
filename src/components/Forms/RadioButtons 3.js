import React from 'react';
import { useFormikContext } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

const RadioButtons = ({ name, ...other }) => {
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
            <FormLabel id="radio-buttons-group">Perferred Attendance Recor</FormLabel>
            <RadioGroup
                row
                {...config} >
                <FormControlLabel value="3" control={<Radio />} label="Female" />
                <FormControlLabel value="2" control={<Radio />} label="Male" />
                <FormControlLabel value="1" control={<Radio />} label="Male" />
            </RadioGroup>
        </FormControl>
    );
};


export default RadioButtons;