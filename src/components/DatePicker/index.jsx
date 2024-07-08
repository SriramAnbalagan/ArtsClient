import React, {useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {TextField} from '@mui/material';

export const ArtDatePicker = ({
  label = "Select Date",
  value,
  onChange
}) => {

  const handleDateChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={handleDateChange}
        renderInput={((params) => <TextField {...params} />)}
      />
    </LocalizationProvider>
  );
};
