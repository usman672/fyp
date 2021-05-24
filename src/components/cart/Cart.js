import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { color } from '../../libs/styles';
function Cart(props) {
 
  const getImage = () => {
    let path = require('../../assets/dummyProduct.png');
    if (props.product.image_urls.length > 0)
      return { uri: props.product.image_urls[0].image_url };
    else return path;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxStack}>
        <View style={styles.box}>
          <View style={styles.imageRow}>
            <Image
              source={getImage()}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.nameColumn}>
            <View style={styles.nameAndIcon}>
              <Text style={styles.name}>{props.product.name}</Text>
              <Icon
                name="closecircle"
                style={styles.icon}
                onPress={() =>
                  props.deleteFromCart(props.product._id, props.index)
                }
              />
            </View>
            <Text style={styles.price}>${props.product.price}</Text>
            {props.product.freeDelivery ? (
              <Text style={styles.delivery}>Free shipping</Text>
            ) : (
              <Text style={styles.delivery} />
            )}
          </View>
        </View>
      </View>
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
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    borderColor: color.lightGrey,
    borderRadius: 0.2,
    elevation: 2,
    shadowOpacity: 0.01,
    padding: 5,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: color.black,
    fontSize: 20,
  },
  price: {
    color: color.black,
    fontSize: 20,
    marginTop: 10,
  },
  delivery: {
    color: color.lightGrey,
    marginTop: 10,
  },
  nameColumn: {
    width: '60%',
    marginLeft: '5%',
  },
  imageRow: {
    width: '30%',
  },
  nameAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: color.lightGrey2,
    fontSize: 30,
  },
  boxStack: {
    width: '95%',
    alignSelf: 'center',
    margin: 5,
  },
});

export default Cart;
