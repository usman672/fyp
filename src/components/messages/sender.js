import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { s, color } from '../../libs/styles';

export default class sender extends Component {
  render() {
    return (
      <View style={[s.row, s.messageContainer]}>
        <View style={styles.messageView}>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>
        <Text style={styles.recieverTime}>{this.props.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recieverTime: {
    color: color.lightGrey2,
    marginTop: 10,
    marginRight: 10,
  },
  messageView: {
    marginLeft: 30,
    width: '70%',
    backgroundColor: color.lightGrey3,
    borderRadius: 15,
    padding: 10,
  },
  message: {
    color: color.black,
    fontSize: 15,
  },
});
