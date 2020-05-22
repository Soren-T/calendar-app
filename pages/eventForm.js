import { Form, Input, TextArea, Button, Radio, Header, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import axios from 'axios';

const DEFAULT_EVENT = {
  label: "",
  start: "",
  end: "",
  description: "",
}

const DEFAULT_EVENT_META = {
  type: "",
  start: "",
  end: "",
}

function CreateEvent() {
  const [isRecurring, setIsRecurring] = useState(false);
  const [event, setEvent] = useState(DEFAULT_EVENT);
  // the even meta schema use these start and end values to comnpute the key and value properties that will be stored in the database
  const [eventMeta, setEventMeta] = useState(DEFAULT_EVENT_META);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEventChange(e) {
    const { name, value } = e.target;
    console.log(success, _.isEmpty(event))
    if (success && _.isEqual(event, DEFAULT_EVENT)) {
      setSuccess(false)
    }
    setEvent((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleMetaChange(e) {
    const { name, value } = e.target;
    setEventMeta((prevState) => ({ ...prevState, [name]: value }))
  }

  const router = useRouter();

  function handleSubmit(e) {
    const { name } = e.target;
    console.log("target", name);
    e.preventDefault();
    setLoading(true);
    const url =`${baseUrl}/api/events`;
    const payload = {
      ...event,
      ...eventMeta
    }
    await axios.post(ur, payload)  
    setEvent(DEFAULT_EVENT);
    setEventMeta(DEFAULT_EVENT_META);
    setLoading(false);
    setSuccess(true);
    if (name === 'close') {
      // if 'submit and close' return user to homepage/calendar
      console.log("close")
      router.push('/');
    }
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
          <Form.Field
            control={Input}
            name="start"
            label="Start Time"
            placeholder="Start Time"
            value={event.start}
            onChange={handleEventChange} />
          <Form.Field
            control={Input}
            name="end"
            label="End Time"
            placeholder="End Time"
            value={event.end}
            onChange={handleEventChange} />
        </Form.Group>

        <Form.Field>
          <Radio
            toggle
            label="Recurring"
            onChange={()=> setIsRecurring(!isRecurring)} />
        </Form.Field>   

        {isRecurring && (
          <>
            <Header as="h3">
              Recurring Event Details
            </Header>
            <Form.Group>
              <Form.Field
                control={Input}
                name="type"
                label="Type"
                placeholder="Recurring Event Type"
                value={eventMeta.type}
                onChange={handleMetaChange} />
              <Form.Field
                control={Input}
                name="start"
                label="Start Date"
                placeholder="Start Date"
                value={eventMeta.start}
                onChange={handleMetaChange} />
              <Form.Field
                control={Input}
                name="end"
                label="End Date"
                placeholder="End Date"
                value={eventMeta.end}
                onChange={handleMetaChange} />
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
              content="Submit & Close" />
            <Button.Or />
            <Button
              color="blue"
              name="continue"
              onClick={handleSubmit}
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