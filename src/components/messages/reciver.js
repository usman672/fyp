import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { s, color } from '../../libs/styles';

export default class reciver extends Component {
  render() {
    return (
      <View style={[s.row, s.messageContainer]}>
        <Text style={styles.recieverTime}>{this.props.date}</Text>
        <View style={styles.messageView}>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recieverTime: {
    color: color.lightGrey2,
    marginTop: 10,
    marginLeft: 10,
  },
  messageView: {
    marginRight: 30,
    width: '70%',
    backgroundColor: color.black,
    borderRadius: 15,
    padding: 10,
  },
  message: {
    color: color.white,
    fontSize: 15,
  },
});
