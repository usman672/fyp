import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../libs/styles.js';

function Summary(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.current}>{props.name} </Text>
        <Text style={styles.price}>{props.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  current: {
      
    color: color.black,
    fontSize: 18,
    marginLeft: 29,
    width: '70%',
  },
  price: {
      
    color: color.black,
    fontSize: 18,
    width: '30%',
  },
});

export default Summary;
