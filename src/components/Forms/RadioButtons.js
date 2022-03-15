import React from 'react';
import { useFormikContext } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";


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
                name="position"
                defaultValue="top"
                {...config} >
            <Stack direction="row" spacing={2} >
            <Box sx={{ p: 2, border: '1px solid grey' }}  borderRadius={1}>
                <FormControlLabel value="QR code" control={<Radio />} label="QR Code" labelPlacement="bottom" />
            </Box>
            <Box sx={{ p: 2, border: '1px solid grey' }} borderRadius={1}>
                <FormControlLabel value="Location based" control={<Radio />} label="Location Based" />
            </Box>
            <Box sx={{ p: 2, border: '1px solid grey' }} borderRadius={1}>
                <FormControlLabel value="Both" control={<Radio />} label="Both" />
            </Box>
            </Stack>
            </RadioGroup>
        </FormControl>
    );
};


export default RadioButtons;