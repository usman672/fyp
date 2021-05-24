import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../libs/styles.js';
function Checkout(props) {
  return (
    <View style={styles.container}>
      <View style={styles.boxStack}>
        <View style={styles.box}>
          <View style={styles.imageRow}>
            <Image
              source={{ uri: props.order.product.image_urls[0].image_url }}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={styles.nameColumn}>
              <Text style={styles.name}>{props.order.product.name}</Text>
              <Text style={styles.price}>${props.order.product.price}</Text>
              {props.order.product.freeDelivery ? (
                <Text style={styles.delivery}>Free shipping</Text>
              ) : (
                <Text style={styles.delivery}>
                  {props.order.shipmentChargesToBuyer}
                </Text>
              )}
              <Text style={styles.deliveryTime}>Within day(s)</Text>
              {/* {props.product.shipment.rates[0].estimated_days} */}
            </View>
          </View>
        </View>
      </View>
      {/* <Text style={styles.deliveryDescription}>Free Shipping</Text> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  box: {
    backgroundColor: color.white,
    borderWidth: 0,
    borderColor: color.gray,
    borderRadius: 4,
    elevation: 2,
    shadowOpacity: 0.01,
  },
  image: {
    width: '30%',
    height: 120,
  },
  name: {
    color: color.lightGrey,
    fontSize: 20,
  },
  price: {
    color: color.black,
    fontSize: 18,
    marginTop: 5,
  },
  delivery: {
    color: color.lightGrey2,
    marginTop: 5,
  },
  deliveryDescription: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 25,
  },
  deliveryTime: {
    color: color.lightGrey2,
    marginTop: 5,
    fontSize: 10,
  },
  nameColumn: {
    width: '60%',
    marginLeft: 31,
  },
  imageRow: {
    flexDirection: 'row',
  },
  icon: {
    left: 88,
    color: color.lightGrey,
    fontSize: 30,
  },
  boxStack: {
    width: '90%',
    height: 140,
    marginTop: 5,
    marginLeft: 20,
  },
});

export default Checkout;
