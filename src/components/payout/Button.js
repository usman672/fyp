import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, color } from '../../libs/styles';

function Button(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        s.buttonbox(color.black, color.black, 'stretch', '90%'),
        styles.container,
      ]}
      onPress={() => navigation.navigate('bank')}>
      <Text style={styles.proceedToCheckout}>Next</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    paddingLeft: 16,
    height: 50,
    width: '80%',
    paddingRight: 16,
    marginBottom: 20,
    marginTop: 30,
    marginLeft: '10%',
  },
  proceedToCheckout: {
    color: color.white,
    fontSize: 17,
  },
});

export default Button;
