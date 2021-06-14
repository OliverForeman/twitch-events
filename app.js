import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { DirectConnectionAdapter, EventSubListener } from 'twitch-eventsub';

const USER_ID = 'userId';
const CLIENT_ID = 'clientId';
const CLIENT_SECRET = 'clientSecret';

const authProvider = new ClientCredentialsAuthProvider(CLIENT_ID, CLIENT_SECRET);
const apiClient = new ApiClient({ authProvider });

const listener = new EventSubListener(apiClient, new DirectConnectionAdapter({
  hostName: 'hostname.com',
  sslCert: {
    key: '',
    cert: ''
  }
}), 'randomlyGeneratedConstantString');

await listener.listen();

const followerSubscription = await listener.subscribeToChannelFollowEvents(USER_ID, () => {
  // Do stuff here
});
