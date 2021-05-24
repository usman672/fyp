import React, { Component } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { s, color, neomorph } from '../../libs/styles';

const Toggle = (props) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ true: color.lightGrey2, false: color.lightGrey2 }}
        thumbColor={color.lightGrey3}
        onValueChange={props.toggleSwitch1}
        value={props.switch1Value}
      />
    </View>
  );
};
export default Toggle;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: 10,
  },
});
