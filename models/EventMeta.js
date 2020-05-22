import mongoose from 'mongoose';

const { String, Number, Boolean } = mongoose.Schema.Types;

// Event Meta store meta data for a particular event
// event_id is the id of the event this meta data relates to
// key - meta data key 
// value - value for the key
const EventMetaSchema = new mongoose.Schema({
  event_id: {
    type: String,
    unique: true
  },
  key: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },  
})