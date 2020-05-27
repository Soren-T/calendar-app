import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useState } from 'react';

function DateSelector({ handleChange, value, name, disabled }) {
  const [date, setDate] = useState(new Date());
  return (    
    <DatePicker
      selected={date}
      disabled={disabled}
      onChange={(d) => setDate(d)} />
  );
}

export default DateSelector;