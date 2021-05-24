import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

const ProceedCheckout = ({ ...props }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.total}>
          Subtotal ({props.count} {props.count > 1 ? 'items' : 'item'})
        </Text>
        <Text style={styles.price}>${props.total}</Text>
      </View>
      <Text style={styles.conditions}>Taxes may apply for certain states</Text>
      <Button
        style={styles.button}
        count={props.count}
        total={props.total}
        cartList={props.cartList}
        productIds={props.productIds}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  total: {
    color: '#121212',
  },
  price: {
    color: '#121212',
    fontSize: 18,
  },
  conditions: {
    color: 'rgba(155,155,155,1)',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    alignSelf: 'center',
    height: 52,
    width: '80%',
    marginTop: 29,
  },
});

export default ProceedCheckout;
