import React, {useState} from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { useParams } from 'react-router-dom'


const Calendar = () => {
    const [value, setValue] = useState(null);
 
    const {id}= useParams();
    const [open, setOpen] = useState(false);
    const handleAccept = (newValue) => {
        setValue(newValue);
        setOpen(true);
      };
    
      
        
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <StaticDatePicker
    orientation='landscape'
    openTo='day'
    disablePast={true}
    value={value}
    onChange={(newValue)=> {
        setValue(newValue);
    }}
    onAccept={handleAccept}
    open
    />
    </LocalizationProvider>
  
};

export default Calendar;
