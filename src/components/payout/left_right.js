import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { color } from '../../libs/styles.js';
import IconArrow from 'react-native-vector-icons/AntDesign';

function LeftRight(props) {
  return (
    <View style={styles.mainView}>
      <Text
        style={{
          color: props.leftTextColor,
          fontWeight: props.leftTextFontWeight,
          fontSize: props.leftTextFontSize,
          marginLeft: '4%',
        }}>
        {props.leftText}
      </Text>
      {props.rightText === '' ? (
        <IconArrow name="right" style={styles.icon} />
      ) : (
        <Text
          style={{
            color: props.rightTextColor,
            fontWeight: props.rightTextFontWeight,
            marginRight: '3%',
            fontSize: props.rightTextFontSize,
          }}>
          {props.rightText}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.white,
    height: 60,
  },
});

export default LeftRight;
