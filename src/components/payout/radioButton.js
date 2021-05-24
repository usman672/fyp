import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../libs/styles';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
export default class ToggleButton extends Component {
  render() {
    return (
      <View style={styles.radioView}>
        <RadioForm
          borderWidth={1}
          buttonColor={color.black}
          buttonSize={10}
          radio_props={this.props.radio_props}
          formHorizontal={true}
          labelStyle={{ marginRight: 40 }}
          initial={0}
          onPress={(value) => this.props.toggleSwitch1(value)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  radioView: {
    height: 50,
    justifyContent: 'center',
  },
});
