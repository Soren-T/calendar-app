import mongoose from 'mongoose';

const { String, Number, Boolean } = mongoose.Schema.Types;

// Event Meta store meta data for when a particular event re-occurs
const EventMetaSchema = new mongoose.Schema({
  // _id from mongo for event collection
  event_id: {
    type: String,
    unique: true
  },
  // the type of interval/recurring patter
  interval: {
    type: String,
    required: true
  },
  // how many repetitions
  interval_count: {
    type: Number,
    required: true
  },  
})

export default mongoose.models.EventMeta || mongoose.model("EventMeta", EventMetaSchema);