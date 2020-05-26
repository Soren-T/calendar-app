import Event from '../../models/Event';
import EventMeta from '../../models/EventMeta';

import connectDb from '../../utils/connectDb';
import moment from 'moment';

connectDb();

export default async(req, res) => {
  console.log("method", req.method);
  switch(req.method) {
    case 'GET': 
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res).then(
        postEventMeta(res)
      );
      break;
    case "UPDATE":
      await handleUpdateRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
}

  async function handleGetRequest(req, res) {
    const { start, end } = req.query;
    // retrieve all events
    const events = await Event.find();
    // retrieve all events in a specific week
    // const events = await Event.find(
    //   { start: { $gt: start, $lt: end } }
    // )
    res.status(200).json(events);
  }

  async function postEventMeta(res, meta) {
    console.log('response', res);
    const { _id, start, is_recurring } = res.data;
    const { type, startDate, endDate } = meta;
    // default for interval_count = 1 which means the even only happens once.
    let interval_count = 1
    if (is_recurring) {
      switch(type) {
        case 'daily':
          interval_count = moment(startDate).diff(endDate, 'days');
          break;
        case 'weekly':
          interval_count = moment(startDate).diff(endDate, 'weeks');
          break;
        case 'monthly':
          interval_count = moment(startDate).diff(endDate, 'months');
          break;
        default:
          break;
      }
    }
    const keyStart = startDate ? startDate : start;
    const meta = {
      event_id: _id,
      interval: type,
      interval_count,
    };
    const meta = await new EventMeta({
      ...meta
    });
    res.status(201).json(meta);
    console.log(meta);
  }

  async function postEvent (event) {
    const event = await new Event({ ...event }).save();
    res.status(201).json(event);
  }

  async function handlePostRequest(req, res) {
    const {
      label,
      startTime,
      endTime,
      description,
      is_recurring,
      type,
      startDate,
      endDate
    } = req.body;
    if (!label || !startTime || !endTime) {
      return res.status(422).send(
        "Event posting missing one or more fields"
      );
    }
    eventPayload = {
      label,
      start: moment(startTime).unix(),
      end: moment(endTime).unix(),
      description,
      is_recurring
    };
    const eventMetaPayload = {
      type,
      startDate,
      endDate
    };
    postEvent(payload).then((res) => {      
      postEventMeta(res, eventMetaPayload)
    });
  }
  
  async function handleUpdateRequest(req, res) {

  }
  
  async function handleDeleteRequest(req, res) {

  }