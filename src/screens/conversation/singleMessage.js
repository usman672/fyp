import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard
} from 'react-native';
import Sender from '../../components/messages/sender';
import Reciver from '../../components/messages/reciver';
import SingleMessageHeader from '../../components/header/singleMessageHeader';
import { s, color } from '../../libs/styles';

export default class SingleMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      backgroundColor: color.lightGrey,
      color: color.white,
      keyboardHeight: 0,
    };
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }

  _keyboardDidHide(e) {
    this.setState({ keyboardHeight: 0 });
  }

  onChange(message) {
    if (message === '') {
      this.setState({
        message: message,
        backgroundColor: color.lightGrey,
        color: color.white,
      });
    } else {
      this.setState({
        message: message,
        backgroundColor: color.black,
        color: color.white,
      });
    }
  }

  render() {
    return (
      <View style={s.scrollview}>
        <SingleMessageHeader />
        <View style={styles.container}>
          <View style={styles.imageRow}>
            <Image
              source={require('../../assets/mobile.jpg')}
              resizeMode="stretch"
              style={styles.image}
            />
            <View style={styles.descriptionColumn}>
              <Text style={styles.description}>iphone XS</Text>
              <Text style={styles.name}>$500</Text>
            </View>
          </View>
            <ScrollView
              style={[s.scrollview]}
              ref={(ref) => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({ animated: true })
              }>
              <Sender message="could i offer for $30" date="7:06 PM" />
              <Reciver
                message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                date="7:10 PM"
              />
              <Sender message="sender message 1 " date="7:15 PM" />
              <Reciver message="reciver message 1 " date="7:21 PM" />
              <Sender message="sender message 2 " date="7:22 PM" />
              <Reciver message="reciver message 2 " date="7:23 PM" />
              <Reciver message="reciver message 2 " date="7:24 PM" />
              <Sender
                message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                date="7:28 PM"
              />
              <Reciver message="reciver message 3" date="7:30 PM" />
            </ScrollView>
            <View style={[styles.inputMessageRow, { marginBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0 },]}>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Write a message"
                  style={styles.inputMessage}
                  multiline={true}
                  onChangeText={(message) => this.onChange(message)}
                />
              </View>
              <View style={styles.sendButtonView}>
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    { backgroundColor: this.state.backgroundColor },
                  ]}>
                  <Text
                    style={[
                      styles.sendButtonText,
                      { color: this.state.color },
                    ]}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  description: {
    color: color.brandRed,
  },
  name: {
    color: color.lightGrey,
  },
  descriptionColumn: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  imageRow: {
    borderBottomWidth: 1,
    borderBottomColor: color.lightGrey2,
    paddingBottom: 20,
    flexDirection: 'row',
    width: '100%',
    marginLeft: 20,
    marginTop: '5%',
  },
  inputMessage: {
    color: color.black,
    paddingLeft: 15,
  },
  sendButtonText: {
    fontSize: 20,
  },
  inputMessageRow: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: color.lightGrey2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
    width: 70,
  },
  inputView: {
    marginLeft: 10,
    width: '70%',
  },
  sendButtonView: {
    marginRight: 10,
  },
});
