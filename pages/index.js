import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Divider } from 'semantic-ui-react';
import Calendar from '../Components/Calendar.js';
import baseUrl from '../utils/baseUrl.js';
import moment from 'moment';

function Home() {
  const [week, setWeek] = useState(moment().week());
  const [events, setEvents] = useState();

  async function getEvents() {
    // fetch data on server
    const url = `${baseUrl}/api/events`;
    const payload = {
      params: {        
        start: moment(week).startOf('week'),
        end: moment(week).endOf('week')
      }
    };
    // const response = await axios.get(url, payload);
    // return response data as an object
    const events = [];
    return events;
    // note this object will be merged with existing props
  }

  useEffect(() => {
    const eventsForCurrentWeek = getEvents();
    setEvents(eventsForCurrentWeek)
  }, []);

  return (
    <div>
      <Header as="h2">My Calendar</Header>
      <Divider />
      <Calendar events={events} setWeek={setWeek} />
    </div>
  );
}

export default Home;
