import { useState, useEffect } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';

import Calendar from '../Components/Calendar.js';
import baseUrl from '../utils/baseUrl.js';

function Home() {
  const [date, setDate] = useState(moment());
  const [week, setWeek] = useState(moment(date).week());
  const [events, setEvents] = useState();

  async function getEvents() {
    // fetch data on server
    const url = `${baseUrl}/api/events`;
    const payload = {
      params: {        
        start: moment(date).startOf('week').unix(),
        end: moment(date).endOf('week').unix()
      }
    };
    const response = await axios.get(url, payload);
    setEvents(response.data);
  }

  useEffect(() => {
    const eventsForCurrentWeek = getEvents();
    setEvents(eventsForCurrentWeek)
  }, [week]);

  useEffect(() => {
    const dateWeek = moment(date).week();
    if(dateWeek !== week) {
      setWeek(dateWeek);
    }
  }, [date])

  return (
    <div>
      <Header as="h2">My Calendar</Header>
      <Divider />
      <Calendar
        events={events}
        setDate={setDate}
        date={date} />
    </div>
  );
}

export default Home;
