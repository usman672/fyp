import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { s, color } from '../../libs/styles';
const CustomSeparator = ({ heightt, colorr, margintop, width }) => {
  return (
    <View
      style={{
        backgroundColor: colorr,
        height: heightt,
        marginTop: margintop,
        width: width,
      }}></View>
  );
};
export default CustomSeparator;

const styles = StyleSheet.create({
  separator: {
    height: 20.5,
    backgroundColor: color.orange,
    marginTop: 20,
  },
});
