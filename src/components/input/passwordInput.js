import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';

export default class PasswordInput extends Component {
  constructor() {
    super();

    this.state = {
      borderBottomWidth: 0,
      borderBottomColor: '',
    };
  }
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

  check = () => {
    if (this.props.heading === 'Your Password') {
      this.props.togglePassword('password');
    } else if (this.props.heading === 'New Password') {
      this.props.togglePassword('newpassword');
    } else if (this.props.heading === 'Confirm password') {
      this.props.togglePassword('confirmpassword');
    } else if (this.props.heading === 'Current Password') {
      this.props.togglePassword('currentpassword');
    } else {
      this.props.togglePassword('');
    }
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
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            style={[s.inputField]}
            ref={this.props.ref}
            secureTextEntry={this.props.isShow}
            placeholder={this.props.placeholder}
            placeholderTextColor={color.gray}
            onChangeText={(email) => this.props.onChange(email)}
            autoCapitalize="none"
          />
          <TouchableOpacity style={[s.inputPasswordShow]} onPress={this.check}>
            <Text>{this.props.isShow ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
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
