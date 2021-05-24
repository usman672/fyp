import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { s, color } from '../../libs/styles';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/index';
import { addOrderAction } from '../../redux/actions/orderAction';

const Button = ({ ...props }) => {
  const navigation = useNavigation();

  async function confirmOrder() {
    const res = await props.addOrderAction({
      products: props.productIds,
    });
    // console.log(res, 112);

    if (res.code == 0) {
      let orderIds = [];
      res.data.orders.forEach((order) => {
        orderIds.push(order._id);
      });
      navigation.navigate('checkout', {
        orderId: orderIds,
        count: res.data.orders.length,
        total: res.data.ordersTotalAmount,
        cartList: res.data.orders,
        tax: res.data.totalTax,
        shipto: res.data.orders[0].shipment.address_to,
        singleProduct: false,
      });
    } else {
      Alert.alert(res.message);
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => confirmOrder()}>
      <Text style={styles.proceedToCheckout}>Proceed to checkout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 10,
  },
  proceedToCheckout: {
    color: color.white,
    fontSize: 17,
  },
});

// export default Button;
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addOrderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
