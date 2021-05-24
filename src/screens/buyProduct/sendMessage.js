import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSeparator from '../../components/separators/customSeparator';
export default class SendMessage extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View style={styles.messageView}>
        <TextInput
          style={styles.messageInput}
          //ref={this.props.ref}
          placeholder="Any Last Price Please ?"
          placeholderTextColor={color.lightGrey}
          //onChangeText={(email) => this.props.onChange(email)}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageView: {
    flexDirection: 'row',
    width: (95 * Math.round(Dimensions.get('window').width)) / 100,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '3%',
    marginTop: '3%',
  },
  messageInput: {
    width: (72 * Math.round(Dimensions.get('window').width)) / 100,
    height: 42,
    borderRadius: 25,
    backgroundColor: color.lightGrey3,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  sendButton: {
    width: (20 * Math.round(Dimensions.get('window').width)) / 100,

    height: 40,
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
  },
  sendButtonText: {
    color: color.white,
    fontSize: 18,
  },
});
