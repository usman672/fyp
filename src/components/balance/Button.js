import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { color } from 'react-native-reanimated';

function Button(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.proceedToCheckout}>Balance History</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    textAlign: 'center',
    paddingLeft: 16,
    marginBottom: 5,
    height: 35,
    width: '60%',
    paddingRight: 16,
    marginLeft: '20%',
  },
  proceedToCheckout: {
    color: color.white,
    fontSize: 17,
  },
});

export default Button;
