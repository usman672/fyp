import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../libs/styles.js';

function Summary(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.summary}>Order Summary</Text>
      <View style={styles.toRow}>
        <View style={styles.shopColumn}>
          <Text style={styles.to}>SHIP TO</Text>
        </View>
        <View style={styles.shopColumn}>
          <Text style={styles.address}>
            {props.shipto.company}  {props.shipto.city}, {props.shipto.country}
          </Text>
        </View>
      </View>
      <View style={styles.toRow}>
        <View style={styles.shopColumn}>
          <Text style={styles.to}>TAX</Text>
        </View>
        <View style={styles.shopColumn}>
          <Text style={styles.tax}>{props.tax.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.totalAmmountRow}>
        <View style={styles.shopColumn}>
          <Text style={styles.totalAmmount}>
            Subtotal ({props.count} items)
          </Text>
        </View>
        <View style={styles.shopColumn}>
          <Text style={styles.price}>${props.total.toFixed(3)}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignSelf: 'center',
    width: '90%',
  },
  summary: {
    color: color.black,
    fontSize: 22,
    alignSelf: 'center',
  },
  to: {
    color: color.lightGrey,
    marginTop: 5,
  },
  shop: {
    color: color.lightGrey,
  },
  tax: {
    color: color.lightGrey,
    // marginLeft: 10,
    alignSelf: 'center',
  },
  address: {
    color: color.lightGrey2,
    alignSelf: 'center',
  },
  shopColumn: {
    width: 165,
    marginLeft: 10,
    alignSelf: 'center',
  },
  toRow: {
    // height: 32,
    flexDirection: 'row',
    alignSelf: 'center',
    // marginBottom: 20,
  },
  card: {
    color: color.lightGrey,
  },
  payment: {
    color: color.gray,
    marginLeft: 23,
    marginTop: 1,
  },
  cardRow: {
    height: 17,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    margin: 10,
    // marginTop: 23,
    // marginLeft: 41,
    // marginRight: 152,
  },
  stopShop1: {
    color: color.lightGrey2,
    // marginTop: -26,
    marginLeft: 112,
  },
  totalAmmount: {
    color: color.black,
    marginTop: 5,
  },
  price: {
    color: color.black,
    fontSize: 15,
    alignSelf:'center',
  },
  totalAmmountRow: {
    height: 25,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
  },
});

export default Summary;
