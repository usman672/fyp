import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { color } from '../../libs/styles.js';
import IconArrow from 'react-native-vector-icons/AntDesign';

function Amount(props) {
  return (
    <View style={styles.mainRow}>
      <View style={styles.leftView}>
        <Text style={styles.leftText}>{props.left}</Text>
      </View>
      <View style={styles.rightView}>
        <Text
          style={{
            color: props.rightColor,
            fontSize: 17,
          }}>
          {props.Right}
        </Text>
        {props.icon === true ? (
          <IconArrow name="right" style={styles.icon} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftText: {
    fontSize: 17,
    color: color.black,
  },
  selectColor: {
    fontSize: 18,
    color: color.primary,
  },
  leftView: {
    width: '25%',
  },
  icon: {
    color: color.lightGrey2,
    fontSize: 30,
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 60,
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
});

export default Amount;
