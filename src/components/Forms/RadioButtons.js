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
            <FormLabel id="radio-buttons-group">Preferred Attendance Recording Strategy</FormLabel>
            <RadioGroup
                row
                {...config} >
                <FormControlLabel value="QR code" control={<Radio />} label="QR Code" />
                <FormControlLabel value="Location based" control={<Radio />} label="Location Based" />
                <FormControlLabel value="Both" control={<Radio />} label="Both" />
            </RadioGroup>
        </FormControl>
    );
};


export default RadioButtons;