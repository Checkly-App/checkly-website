import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useField, useFormikContext } from 'formik';



const DateField = ({ name, ...other }) => {
    const [field, data] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        console.log(e)
        setFieldValue(name, e);
    };

    const config = {
        ...field,
        ...other,
        clearable: true,
        inputFormat: 'dd/MM/yyyy',
        mask: 'dd/mm/yyyy',
        onChange: handleChange,
        maxDate: new Date('01/01/2005')
    };

    const textConfig = {
        ...field,

        ...other,
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
        margin: 'dense',
        helperText: ' '
    }

    if (data && data.touched && data.error) {
        textConfig.error = true;
        textConfig.helperText = data.error;
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                {...config}
                renderInput={(params) => <TextField {...params}
                    {...textConfig}

                />}
            />
        </LocalizationProvider>

    );
};


export default DateField
