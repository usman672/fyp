import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { s, color } from '../../libs/styles.js';
import { useNavigation } from '@react-navigation/native';

function Button(props) {
  const navigation = useNavigation();

  return (
    <View
      style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={[styles.button, props.style]}
        onPress={props.rating}>
        <Text style={s.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7,
    height: 50,
    width: '80%',
    marginBottom: 15,
  },
});

export default Button;
