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
      <View style={s.inputView}>
        <Text style={s.inputHeading}>{this.props.heading}</Text>
        <CardView
          style={s.inputCard}
          cardElevation={neomorph.elevation}
          cornerRadius={neomorph.cornerRadius}>
          <Picker
            // style={styles.pickerStyle}
            style={s.inputField}
            mode="dropdown"
            selectedValue={this.props.selectedState}
            onValueChange={(itemValue) => {
              this.props.onSelect(itemValue, this.props.heading);
            }}>
            {this.props.list.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={index} key={index} />
              );
            })}
          </Picker>
        </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
