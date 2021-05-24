import PushNotification from 'react-native-push-notification';
class BankInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View>
        <Text>Push Notification</Text>
      </View>
    );
  }
}
