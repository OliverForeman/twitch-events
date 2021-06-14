const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { DirectConnectionAdapter, EventSubListener } = require('twitch-eventsub');
const { NgrokAdapter } = require('twitch-eventsub-ngrok')
const AdjustingInterval = require('./adjustingInterval');
require('dotenv').config();

// const authProvider = new ClientCredentialsAuthProvider(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
// const apiClient = new ApiClient({ authProvider });

// const listener = new EventSubListener(apiClient, new NgrokAdapter(), 'randomlyGeneratedConstantString');

//  const test = async() => {
//   const promise = listener.listen();

//   promise.then(e => {
//     console.log(e)
//   }).catch(e => {
//     console.error(e)
//   })
  
//   await listener.subscribeToChannelFollowEvents(process.env.USER_ID, e => {
//     console.log('Follow event', e);
//   });
// }

// test();

let countdownNum = 5;

const doWork = () => {
  console.log(--countdownNum);
};

const onError = () => {
  console.error('Drift exceeds the interval.');
  counter.stop();
};

const counter = new AdjustingInterval(doWork, 1000, onError);
counter.start();
