import {
    AccessManager,
    Client,
    Constants
} from 'react-native-twilio-chat';

// create the access manager
const accessManager = new AccessManager(token);

// specify any handlers for events
accessManager.onTokenWillExpire = () => {
    getNewTokenFromServer()
    .then(accessManager.updateToken);
}

// create the client
const client = new Client(token);

// specify any global events
client.onError = ({error, userInfo}) => console.log(error);

// initialize the client
client.initialize();

// wait for sync to finish
client.onClientSynchronized = () => {
    client.getUserChannels()
    .then((channelPaginator) => console.log(channelPaginator.items));
}

/* Individual Channel */

// an instance of Channel is passed down in the app via props
let channel = this.props.channel

// specify channel specific events
channel.onMessageAdded = (message) => console.log(message.author + ": " + message.body);
channel.onTypingStarted = (member) => console.log(member.identity + " started typing...");
channel.onTypingEnded = (member) => console.log(member.identity + " stopped typing...");
channel.onMemberAdded = (member) => console.log(member.identity + " joined " + channel.friendlyName);

// sending a message
<TextInput 
  onChangeText={(body) => {
    this.setState({body});
    channel.typing();
  }}
  onSubmitEditing={() => { channel.sendMessage(this.state.body)} }
/>