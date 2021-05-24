import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, color } from '../../libs/styles';

function Shopping(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('tabnavigator')}
      style={s.buttonbox(color.black, color.black, 'center', '90%')}>
      <Text style={styles.proceedToCheckout}>Continue shopping</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 
  proceedToCheckout: {
    color: color.white,
    fontSize: 17,
  },
});

export default Shopping;
