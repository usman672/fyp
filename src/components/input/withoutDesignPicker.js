import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker } from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';

export default class Pickerr extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.PickerView}>
        <Picker
          // style={styles.pickerStyle}
          mode="dropdown"
          selectedValue={this.props.selectedState}
          onValueChange={(itemValue) => {
            this.props.onSelect(itemValue, this.props.heading);
          }}>
          {this.props.list.map((item, index) => {
            return <Picker.Item label={item.name} value={index} key={index} />;
          })}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PickerView: {
    height: 49,
    justifyContent: 'center',
  },
});
