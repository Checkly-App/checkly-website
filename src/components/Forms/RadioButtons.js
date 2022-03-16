import React from 'react';
import { useFormikContext } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import FormHelperText from '@mui/material/FormHelperText';



const RadioButtons = ({ name, ...other }) => {
    const { setFieldValue } = useFormikContext();
    const [helperText, setHelperText] = React.useState('Choose wisely');


    const handleChange = (e) => {
        setFieldValue(name, e.target.value);
        e.preventDefault();
        if (e.target.value === 'QR code') {
            setHelperText('You got it!');
            
          } 
    };



    const config = {
        ...other,
        defaultValue: 'QR Code',
        onChange: handleChange
    };

    return (
        <FormControl>
            <FormLabel id="radio-buttons-group">Company's Attendance Policy</FormLabel>
            <RadioGroup
                row
                name="position"
                defaultValue="top"
                {...config} >
            <Stack direction="row" spacing={2} >
            <Box sx={{ p: 2, border: '1px solid grey' }}  borderRadius={1}>
                <FormControlLabel value="QR code" control={<Radio />} label="QR Code" labelPlacement="bottom" />
            </Box>
            <Box sx={{ p: 2, border: '1px solid grey' }} borderRadius={1}>
                <FormControlLabel value="Location based" control={<Radio />} label="Location Based" labelPlacement="bottom"/>
            </Box>
            <Box sx={{ p: 2, border: '1px solid grey' }} borderRadius={1}>
                <FormControlLabel value="Both" control={<Radio />} label="Both" labelPlacement="bottom"/>
            </Box>
            </Stack>
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};


export default RadioButtons;