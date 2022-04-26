import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { StaticTimePicker } from '@mui/lab';

export default function FormModal({ open, updateOpen, title, value, updateTime, max, min }) {
    const [time, setTime] = useState(new Date(value));

    const handleClose = () => {
        updateOpen(false);
        updateTime(time);
    }

    const handleChange = (newValue) => {
        setTime(new Date(0, 0, 0, newValue.getHours(), newValue.getMinutes()));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose time</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticTimePicker
                        displayStaticWrapperAs="mobile"
                        label={title}
                        value={time}
                        onChange={handleChange}
                        maxTime={max}
                        minTime={min}
                        renderInput={(params) =>
                            <TextField {...params}
                                variant='outlined'
                                size='small'
                                fullWidth={true}
                                margin='normal' />}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
