import { React } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useField, useFormikContext } from 'formik';

const DateRangeField = ({ name, ...other }) => {
    const [field, data] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        setFieldValue(name, e);
    };

    const config = {
        ...field,
        ...other,
        clearable: true,
        inputFormat: 'dd/MM/yyyy',
        mask: '__/__/____',
        onChange: handleChange,
        openTo: 'day',
    };

    const textConfig = {
        ...field,
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
        margin: 'none',
        sx: { svg: { color: '#D7D7D7' } }
    };

    if (data && data.touched && data.error) {
        textConfig.error = true;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                {...config}
                renderInput={(params) => <TextField {...params}
                    {...textConfig}
                    error={textConfig.error}
                    helperText={textConfig.error ? data.error : ' '}
                />}
            />
        </LocalizationProvider>

    );
};


export default DateRangeField
