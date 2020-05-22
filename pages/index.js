// import React from 'react';
import axios from 'axios';

function Home({ events }) {
  console.log("EVENTS", events)

  return <>home</>;
}

Home.getInitialProps = async () => {
  // fetch data on server
  const url = 'http://localhost:3000/api/events';
  const response = await axios.get(url);
  // return response data as an object
  const events = (response && response.data) || { poop: 'poop'};
  return { events };
  // note this object will be merged with existing props
}

export default Home;
