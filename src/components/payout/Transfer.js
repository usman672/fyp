import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, color } from '../../libs/styles';

function Transfer(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={s.buttonbox(color.black, color.black, 'center', '90%')}
      onPress={() => navigation.navigate('successPayout')}>
      <Text style={styles.proceedToCheckout}>Transfer balance</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    textAlign: 'center',
    paddingLeft: 16,
    height: 50,
    paddingRight: 16,
  },
  proceedToCheckout: {
    color: color.white,
    fontSize: 17,
  },
});

export default Transfer;
