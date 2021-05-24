import React from 'react';
import { View, StyleSheet } from 'react-native';
import { s, color } from '../../libs/styles';
const FlatListItemSeparator = () => {
  return <View style={styles.separator} />;
};
export default FlatListItemSeparator;

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: color.separatorColor,
    marginTop: 20,
  },
});
