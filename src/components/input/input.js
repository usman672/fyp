import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';
var editablee = true;
var placeholderTextColor = color.gray;
export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderBottomWidth: 0,
      borderBottomColor: '',
    };
  }

  isEditable = () => {
    if (this.props.heading === '.') {
      editablee = false;
      return editablee;
    }
  };
  onFocus() {
    this.setState({
      borderBottomColor: color.primary,
      borderBottomWidth: 1,
    });
  }
  onBlur() {
    this.setState({
      borderBottomColor: '',
      borderBottomWidth: 0,
    });
  }
  getKeyboardType = () => {
    if (this.props.heading === 'Your Email') {
      return 'email-address';
    } else return '';
  };
  render() {
    return (
      <View style={s.inputView}>
        <Text style={s.inputHeading}>{this.props.heading}</Text>
        <CardView
          style={s.inputCard}
          cardElevation={neomorph.elevation}
          cornerRadius={neomorph.cornerRadius}>
          <TextInput
            style={[s.inputField]}
            editable={this.isEditable()}
            value={this.props.value}
            keyboardType={this.getKeyboardType()}
            placeholder={this.props.placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(email) => this.props.onChange(email)}
            autoCapitalize="none"
          />
          {this.props.isValid && (
            <View style={[s.inputValidateIcon]}>
              <Icon name="check" size={20} color={color.black} />
            </View>
          )}
        </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
