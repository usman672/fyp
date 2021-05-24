import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, Alert } from 'react-native';
import Cart from '../../components/cart/Cart';
import ProceedCheckout from '../../components/cart/ProceedCheckout';
import SettingHeader from '../../components/header/settingHeader';
import { s, color } from '../../libs/styles.js';
import Actions from '../../redux/actions';
import { connect } from 'react-redux';
class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIds: this.getProductIdCart(),
      cartList: this.props.cartProducts,
      total: this.getTotal(),
    };
  }
  
  getTotal = () => {
    var totalCopy = 0;
    for (var i = 0; i < this.props.cartProducts.length; i++) {
      totalCopy =
        totalCopy + parseInt(this.props.cartProducts[i].product.price);
    }
    return totalCopy;
  };
  renderCartItems = ({ item, index }) => {
    return (
      <Cart
        deleteFromCart={this.deleteFromCart}
        navigation={this.props.navigation}
        index={index}
        product={item.product}
      />
    );
  };
  deleteFromCart = async (pid, index) => {
    const res = await this.props.deleteFromCartAction(pid, index);
    if (res.code === 0) {
      this.setState({ cartList: this.props.cartProducts });
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };
  getProductIdCart() {
    let productId = [];
    for (let i = 0; i < this.props.cartProducts.length; i++) {
      productId.push(this.props.cartProducts[i].product._id);
    }
    return productId;
  }

  render() {
    if (this.state.cartList.length > 0) {
      return (
        <View style={s.scrollview}>
          <SettingHeader
            title="Cart"
            backgroundColor=""
            color={color.lightGrey}
          />
          <ScrollView
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'rgba(255,255,255,1)',
            }}>
            <FlatList
              data={this.state.cartList}
              renderItem={this.renderCartItems}
              keyExtractor={(item, index) => index.toString()}
            />
            <ProceedCheckout
              count={this.state.cartList.length}
              total={this.state.total}
              cartList={this.state.cartList}
              productIds={this.state.productIds}
            />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={s.scrollview}>
          <SettingHeader
            title="Cart"
            backgroundColor=""
            color={color.lightGrey}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: color.lightGrey,
              }}>
              Cart is Empty
            </Text>
          </View>
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    cartProducts: state.CartReducer.cartProducts,
  };
};
const mapDispatchToProps = {
  deleteFromCartAction: Actions.deleteFromCartAction,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(cart);
