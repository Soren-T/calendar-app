import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Header, ButtonGroup, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';

function CalendarComponent({ events, setWeek, week }) {
  const localizer = momentLocalizer(moment);
  const [date, setDate] = useState();  

  const CustomToolbar = (toolbar) => {
    setDate(toolbar.date)  
    const goToBack = () => { toolbar.onNavigate('PREV'); };
    const goToNext = () => { toolbar.onNavigate('NEXT'); };
    const goToCurrent = () => { toolbar.onNavigate('TODAY'); };

    useEffect(() => {
      setDate(toolbar.date)
    }, [toolbar.date])
  
    useEffect(() => {
      if (!moment(date).isSame(week, 'week')) {
        setWeek(moment(date).week())
      }
    }, [date])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Header as="h3">
          {moment(date).format('MMM')}
          {' '}
          {moment(date).format('YYYY')}
        </Header>
        <ButtonGroup style={{ width: '40%', padding: '10px', alignSelf: 'center' }}>
          <Button icon='angle left' onClick={goToBack} />
          <Button content='Today' onClick={goToCurrent} />
          <Button icon='angle right' onClick={goToNext} />
        </ButtonGroup>
      </div>
    );
  }
  
  if (!(events || []).length) return null;

  return (
    <Calendar
      localizer={localizer}
      events={events || []}
      startAccessor="start"
      endAccessor="end"
      defaultView={Views.WEEK}
      views={[ Views.WEEK ]}
      components={{
        toolbar: CustomToolbar
      }}
      style={{ heigth: "90vh" }} />
  );
}

export default CalendarComponent