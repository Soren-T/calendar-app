import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { useState } from 'react';

function TimeSelector({ handleChange, value, name }) {
  const [time, setTime] = useState(moment(value));

  return (     
    <TimePicker
      showSecond={false}
      defaultValue={time}
      allowEmpty={false}
      onChange={(value) => setTime(moment(value))}
      onClose={() => handleChange(time, name)}
      format={'h:mm a'}
      use12Hours
    />
  );
}

export default TimeSelector;