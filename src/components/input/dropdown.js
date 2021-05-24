import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { s, color, neomorph } from '../../libs/styles';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/AntDesign';

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.options, 'opoppoyyyyyyyyyyyyyyyyyy');
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
        
          Platform.OS === 'ios' ? { zIndex: this.props.zIndex } : {width:'100%'},
        ]}>
      <View>
          <DropDownPicker
            items={this.props.options}
            style={
              this.props.isBorder
                ? { borderRadius: 10 }
                : { borderRadius: 10, borderWidth: 0 }
            }
            placeholder={this.props.placeholder}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            onChangeItem={(item) => {
              this.props.onSelect(item.value, this.props.heading);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
