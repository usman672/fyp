import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { color } from '../../libs/styles.js';
export default class SwitchFun extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const on = color.primary;
    const off = color.lightGrey3;
    const neutral = color.lightGrey2;
    const sky = color.sky;
    return (
      <View style={styles.container}>
        <Switch
          trackColor={{ false: neutral, true: on }}
          thumbColor={this.props.isEnabled ? color.black : off}
          onValueChange={this.props.switchToogle}
          value={this.props.isEnabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
