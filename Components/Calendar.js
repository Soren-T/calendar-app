import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Header, ButtonGroup, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';

function CalendarComponent({ events, setDate, date }) {
  const localizer = momentLocalizer(moment);
  const [calendarEvents, setCalendarEvents] = useState([]);
  
  useEffect(() => {
    let data = [];
      if (events && events.length) {
        data = events.map(e => ({
          ...e,
          start: moment.unix(e.start).toDate(),
          end: moment.unix(e.end).toDate()
        }));
      }
      setCalendarEvents(data);
  }, [events])

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      setDate(moment(date).subtract(1, 'week'));
      toolbar.onNavigate('PREV');
    };
    const goToNext = () => {
      setDate(moment(date).add(1, 'week'));
      toolbar.onNavigate('NEXT');
    };
    const goToCurrent = () => {
      setDate(moment());
      toolbar.onNavigate('TODAY');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Header as="h3">
          {moment(toolbar.date).format('MMM')}
          {' '}
          {moment(toolbar.date).format('YYYY')}
        </Header>
        <ButtonGroup style={{ width: '40%', padding: '10px', alignSelf: 'center' }}>
          <Button icon='angle left' onClick={goToBack} />
          <Button content='Today' onClick={goToCurrent} />
          <Button icon='angle right' onClick={goToNext} />
        </ButtonGroup>
      </div>
    );
  }

  return (
    <>
      <Dimmer active={!events}>
        <Loader />
      </Dimmer>      
      <Calendar
        localizer={localizer}
        events={calendarEvents || []}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        views={[ Views.WEEK ]}
        components={{
          toolbar: CustomToolbar
        }}
        style={{ heigth: "90vh" }} />
    </>
  );
}

export default CalendarComponent