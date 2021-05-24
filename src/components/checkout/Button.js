import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { color } from '../../libs/styles.js';
import { useNavigation } from '@react-navigation/native';

function Button(props) {
  const navigation = useNavigation();

  return (
    // <TouchableOpacity
    //   style={[styles.container, props.style]}
    //   onPress={() => props.stripe()}>
    //   <Text style={styles.proceedToCheckout}>Checkout</Text>
    // </TouchableOpacity>
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => props.click()}>
      <Text style={styles.proceedToCheckout}>Checkout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 10,
    height: 50,
    width: '70%',
    marginLeft: 50,
    marginBottom: 10,
  },
  proceedToCheckout: {
    color: color.white,
    fontSize: 17,
  },
});

export default Button;
