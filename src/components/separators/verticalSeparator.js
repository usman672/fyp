import React from 'react';
import { View, StyleSheet } from 'react-native';
import { s, color } from '../../libs/styles';
const FlatListItemSeparator = () => {
  return <View style={styles.separator} />;
};
export default FlatListItemSeparator;

const styles = StyleSheet.create({
  separator: {
    height: 50,
    backgroundColor: color.separatorColor,
    width: 0.9,
    marginLeft:2,
    marginRight:2,
  },
});
