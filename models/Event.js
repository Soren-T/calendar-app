import mongoose from 'mongoose';
import shortid from 'shortid';

const { String, Number } = mongoose.Schema.Types;

const EventSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  // hourly start time
  start: {
    type: Number,
    required: true
  },
  // hourly end time
  end: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  },  
  is_recurring: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);