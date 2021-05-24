import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../libs/styles';
function Payout(props) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    backgroundColor: color.lightGrey3,
  },
  text: {
      
    color: color.lightGrey,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default Payout;
