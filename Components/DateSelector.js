import { DatePicker, DatePickerInput } from 'rc-datepicker';
import moment from 'moment';
import { useState } from 'react';

function DateSelector(handleChange, value, name) { 
  const [date, setDate] = useState(moment(value));

  return (     
    <>
      <DatePickerInput
        displayFormat='DD/MM/YYYY'
        returnFormat='YYYY-MM-DD'
        value={date}
        onChange={() => handleChange(date, name)}
      />

      <DatePicker
        locale='es'
        onChange={() => handleChange(date, name)}
        value={date} />
    </>
  )
}

export default DateSelector;