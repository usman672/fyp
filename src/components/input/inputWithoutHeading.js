import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';

export default class InputWithoutHeading extends Component {
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
      borderBottomWidth: 2,
    });
  }
  onBlur() {
    this.setState({
      borderBottomColor: '',
      borderBottomWidth: 0,
    });
  }

  render() {
    return (
      <View style={s.inputView}>
        <CardView
          style={s.inputCard}
          cardElevation={neomorph.elevation}
          cornerRadius={neomorph.cornerRadius}>
          <TextInput
            style={[s.inputField]}
            ref={this.props.ref}
            keyboardType={'email-address'}
            placeholder={this.props.placeholder}
            placeholderTextColor={color.gray}
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
