import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, Alert } from 'react-native';
import Checkout from '../../components/checkout/Checkout';
import Summary from '../../components/checkout/Summary';
import Button from '../../components/checkout/Button';
import { s, color } from '../../libs/styles.js';
import SettingHeader from '../../components/header/settingHeader';
import { PureComponent } from 'react';
import stripe from 'tipsi-stripe';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/index';
import {
  addOrderAction,
  doPaymentAction,
} from '../../redux/actions/orderAction';
import { setCartEmpty } from '../../redux/actions/cartAction';
import { getCartProductsAction } from '../../redux/actions/cartAction';
import { CardConfirmation } from '../../components/';
import { StackActions } from '@react-navigation/native';

stripe.setOptions({
  publishableKey:
    'pk_test_51GsCkoJngS3nWOeWuwVxkps0ZRWzSq2sHSTH223Tv87QTuf42F5TW2JO7P6Cs33CfRCGiemBmDPZHyY0Z2BagMBm00V0aU2N0I',
});
class checkout extends Component {
  state = {
    loading: false,
    token: null,
    success: null,
    visible: false,
  };
  cardInfo = () => {
    this.setState({ visible: true });
  };
  cancelcardInfo = () => {
    this.setState({ visible: false });
  };

  stripe = async () => {
    try {
      this.setState({ loading: true, token: null });
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Enappd Store',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: '',
            country: 'Estonia',
            postalCode: '31217',
            email: 'admin@enappd.com',
          },
        },
      });
      this.setState({ loading: false, token });
      this.confirmOrder();
    } catch (error) {
      this.setState({ loading: false });
    }
  };
  confirmOrder = async () => {
    let product = [];
    for (let i = 0; i < this.props.route.params.cartList.length; i++) {
      product.push(this.props.route.params.cartList[i].product._id);
    }
    const res = await this.props.addOrderAction({
      products: product,
    });
    if (res.code == 0) {
      Alert.alert('Success', 'Order Placement successfull');
    }
  };
  renderCartItems = ({ item, index }) => {
    return <Checkout order={item} />;
  };
  dopayment = async () => {
    const res = await this.props.doPaymentAction(
      {
        amount: this.props.route.params.total,
        orderIds: this.props.route.params.orderId,
      },
      this.props.route.params.singleProduct,
    );
    this.props.getCartProductsAction();
    this.props.navigation.dispatch(StackActions.replace('tabnavigator'));
    this.cancelcardInfo();
  };
  render() {
    return (
      <View style={s.scrollview}>
        <SettingHeader
          title="Checkout"
          backgroundColor=""
          color={color.lightGrey}
        />
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: color.white,
          }}>
          <FlatList
            data={this.props.route.params.cartList}
            renderItem={this.renderCartItems}
            keyExtractor={(item, index) => index.toString()}
          />
          <Summary
            count={this.props.route.params.count}
            total={this.props.route.params.total}
            tax={this.props.route.params.tax}
            shipto={this.props.route.params.shipto}
          />
          <Button
            stripe={this.stripe}
            total={this.props.route.params.total}
            click={this.cardInfo}
          />
          {this.state.visible && (
            <CardConfirmation
              total={this.props.route.params.total}
              cancel={this.cancelcardInfo}
              confirm={this.dopayment}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartProducts: state.CartReducer.cartProducts,
  };
};

const mapDispatchToProps = {
  addOrderAction,
  doPaymentAction,
  setCartEmpty,
  getCartProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
