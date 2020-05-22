import Event from '../../models/Event';
import connectDb from '../../utils/connectDb';

connectDb();

export default async(req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
};