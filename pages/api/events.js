import Event from '../../models/Event';
import connectDb from '../../utils/connectDb';

connectDb();

export default async(req, res) => {
  switch(req.method) {
    case 'GET': 
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "UPDATE":
      await handleUpdateRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Methon ${req.method} not allowed`);
      break;
  }
}

  async function handleGetRequest() {
    const { start, end } = req.query;
    const events = await Event.find();
    res.status(200).json(events);
  }
  
  async function handlePostRequest() {
    const { start, end } = req.query
  }
  
  async function handleUpdateRequest() {

  }
  
  async function handleDeleteRequest() {

  }