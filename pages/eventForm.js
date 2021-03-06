import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment'

import { Form, Input, TextArea, Button, Radio, Header, Message, Select } from 'semantic-ui-react';
import TimeSelector from '../Components/TimeSelector.js';
import DateSelector from '../Components/DateSelector.js';

import baseUrl from '../utils/baseUrl';

const DEFAULT_EVENT = {
  label: "meeting",
  startTime: moment(),
  endTime: moment().add(1, 'hour'),
  description: "super fun"
};

const DEFAULT_EVENT_META = {
  type: "",
  startDate: "",
  endDate: ""
};

const recurringOptions = [
  {
    key: 'daily',
    text: 'Daily',
    value: 'daily'
  },
  {
    key: 'weekly',
    text: 'Weekly',
    value: 'weekly'
  },
  {
    key: 'monthly',
    text: 'Montly',
    value: 'monthly'
  },
];

function CreateEvent() {
  const [isRecurring, setIsRecurring] = useState(false);
  const [event, setEvent] = useState(DEFAULT_EVENT);
  // the even meta schema use these start and end values to comnpute the key and value properties that will be stored in the database
  const [eventMeta, setEventMeta] = useState(DEFAULT_EVENT_META);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleTimeChange(value, name) {
    if (success && _.isEqual(event, DEFAULT_EVENT)) {
      setSuccess(false)
    }
    if (name.includes('Time')) {
      setEvent((prevState) => ({ ...prevState, [name]: value }))
    } else {
      setEventMeta((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  function handleEventChange(e) {
    const { name, value } = e.target;
    if (success && _.isEqual(event, DEFAULT_EVENT)) {
      setSuccess(false)
    }
    setEvent((prevState) => ({ ...prevState, [name]: value }))
  }

  // select form fields send a data object to the onChange function.
  // that data object holds the value and name.
  function handleMetaChange(e, data) {
    const { name: targetName, value: targetValue } = e.target;
    const { value: dataValue, name: dataName } = data;
    const updateValue = targetValue || dataValue;
    const stateName = targetName || dataName;
    setEventMeta((prevState) => ({ ...prevState, [stateName]: updateValue }))
  }

  const router = useRouter();

  async function postEvent() {    
    const url =`${baseUrl}/api/events`;
    const payload = {
      ...event,
      ...eventMeta
    }
    // post event
    const response = await axios.post(url, payload);
  }

  function handleSubmit(e) {
    const { name } = e.target;
    e.preventDefault();
    setLoading(true);
    // post event
    postEvent().then(
      () => {
        setEvent(DEFAULT_EVENT)
        setEventMeta(DEFAULT_EVENT_META)
        setLoading(false)
        setSuccess(true)
        if (name === 'close') {
          // if 'submit and close' return user to homepage/calendar
          router.push('/');
        }
      }
    );
  }

  return(
    <>
      <Header as="h2">
        Create Event
      </Header>
      <Form
        success={success}
        loading={loading}>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="label"
            label="Label"
            placeholder="Event Label"
            value={event.label}
            onChange={handleEventChange} />
          <Form.Field>
            <label>Start Time</label>
            <TimeSelector
              handleChange={handleTimeChange}
              value={event.startTime}
              name={'startTime'} />
          </Form.Field>
          <Form.Field>
            <label>End Time</label>
            <TimeSelector
              handleChange={handleTimeChange}
              value={event.endTime}
              name={'endTime'} />
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <Radio
            toggle
            label="Recurring"
            onChange={() => {
              if (isRecurring) {
                // if going back to not recurring set back to defaults
                setEventMeta(DEFAULT_EVENT_META);
              }
              setIsRecurring(!isRecurring);
            }} />
        </Form.Field>   

        {isRecurring && (
          <>
            <Header as="h3">
              Recurring Event Details
            </Header>
            <Form.Group>
              <Form.Field
                control={Select}
                options={recurringOptions}
                name="type"
                label="Type"
                placeholder="Recurring Event Type"
                value={eventMeta.type}
                onChange={handleMetaChange} />
              <Form.Field>
                <label>Start Date</label>
                <DateSelector
                  disabled={!eventMeta.type}
                  onChange={handleTimeChange}
                  value={eventMeta.startDate}
                  name={'startDate'} />
              </Form.Field>
              <Form.Field>
                <label>End Date</label>
                <DateSelector
                  disabled={!eventMeta.type}
                  onChange={handleTimeChange}
                  value={eventMeta.endDate}
                  name={'endDate'} />
              </Form.Field>
            </Form.Group>
          </>          
        )}

        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="enter event description"
          value={event.description}
          onChange={handleEventChange} />

        <Form.Field>
          <Button.Group>
            <Button
              color="blue"
              name="close"
              onClick={handleSubmit}
              disabled={loading}
              content="Submit & Close" />
            <Button.Or />
            <Button
              color="blue"
              name="continue"
              onClick={handleSubmit}
              disabled={loading}
              content="Submit & Create Another Event" />
          </Button.Group>
        </Form.Field>  

        <Message
          success
          header="Event Submitted"
          content="Your event has been successfully added to your calendar" />
      </Form>
    </>
  );
}

export default CreateEvent