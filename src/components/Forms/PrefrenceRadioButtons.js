import { React, useState, useEffect } from "react";
import { useFormikContext } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText';

const PolicyRadioButtons = ({ name, ...other }) => {
    const { setFieldValue } = useFormikContext();
    const [value, setValue] = useState('');
    const [helperText, setHelperText] = useState('');

    const handleChange = (e) => {
        setFieldValue(name, e.target.value);
        if (e.target.value === 'Flexible') {
            setHelperText('Please enter minimum working hours');
     
        } else if (e.target.value === 'Fixed') {
            setHelperText('Please enter working hours, e.g. 8-4');
        }
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
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};


export default PolicyRadioButtons;