import 'react-native-gesture-handler';
import { SafeAreaView, Text } from 'react-native';
import store from './src/redux/store';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loader from './src/components/modal/loader';
import splash from './src/splash/splash.js';
import login from './src/screens/user/login';
import swiper from './src/screens/swiper/screen.js';
import Main from './src/screens/main';
import signup from './src/screens/user/signup';
import ForgetPassword from './src/screens/user/forgetPassword';
import Otp from './src/screens/user/otp';
import OtpCode from './src/screens/user/otpCode';
import Profile from './src/screens/profile/profile';
import MyAddresses from './src/screens/profile/myaddresses';
import EditAddress from './src/screens/profile/editaddress';
import MyPayments from './src/screens/profile/mypayments';
import BankInfo from './src/screens/profile/bankinfo';
import EditProfile from './src/screens/profile/editprofile';
import ProductDetail from './src/screens/Product/productDetail';
import singleMessage from './src/screens/conversation/singleMessage';
import BottomTabNavigator from './src/components/Navigators/BottomTabNavigator';
import notifications from './src/screens/notifications/notifications';
import buyer from './src/screens/buyer/buyer';
import BuyerRating from './src/screens/buyer/buyerRating';
import cart from './src/screens/cart/cart';
import checkout from './src/screens/checkout/checkout';
import balance from './src/screens/balance/balance';
import payout from './src/screens/payout/payout';
import UserProfile from './src/screens/userProfile/userProfile';
import bank from './src/screens/payout/bank';
import confirmPayout from './src/screens/payout/confirmPayout';
import successPayout from './src/screens/payout/successPayout';
import sellItem from './src/screens/item/sellItem';
import category from './src/screens/category/category.js';
import sellings from './src/screens/sellings/sellings.js';
import item from './src/screens/sellings/item';
import ItemDetail from './src/screens/buyProduct/itemDetails';
import type from './src/screens/category/type.js';
import sellType from './src/screens/category/sellType';
import ShippingInfo from './src/screens/shipping/shippingInfo';
import SearchProduct from './src/screens/Product/searchProduct';
import HelpCenter from './src/screens/helpCenter/index';
import ContactUs from './src/screens/helpCenter/contactus';
import PDFExample from './src/screens/Pdf/pdf';
// redux
import { Provider, connect } from 'react-redux';
import Setting from './src/screens/settings/settings';
import Store from './src/screens/store/store';
import OrderStatus from './src/screens/shippingTimeline/orderStatus';
import FollowSeller from './src/screens/follow/followSeller';
import PickImageModal from './src/components/modal/pickImage';
import payment from './src/screens/stripe/CardFormScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { markLogedin } from './src/redux/actions/userActions';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { logoutAction } from './src/redux/actions/userActions';

const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTime: false,
      isLogedin: false,
    };
  }
  testPushnotifications = () => {
    PushNotification.localNotification({
      title: 'My Notification Title',
      message: 'My Notification Message',
    });
  };
  getDeviceToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('fcmToken');
    console.log(fcmToken);
    AsyncStorage.setItem('device_token', fcmToken);
  };
  componentWillMount = async () => {
    await store.subscribe(() => this.stateChange());
    await this.checkUserLogedin();
    this.getDeviceToken();
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log('TOKEN:', token);
    //   },
    //   onNotification: function (notification) {
    //     console.log('NOTIFICATION:', notification);
    //   },
    //   onAction: function (notification) {
    //     console.log('ACTION:', notification.action);
    //   },
    //   onRegistrationError: function (err) {
    //     console.error(err.message, err);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
  };
  checkUserLogedin = async () => {
    const isLogedin = await AsyncStorage.getItem('isLogedin');
    if (isLogedin === 'true') {
      await store.dispatch(markLogedin);
    }
    SplashScreen.hide();
  };
  stateChange = async () => {
    const currentState = store.getState();
    await this.setState({
      isLogedin: currentState.UserReducer.isLogedin,
    });
  };
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ backgroundColor: '#000', opacity: 0.7 }} />
        <NavigationContainer>
          <Loader />
          <Stack.Navigator headerMode="float">
            {!this.state.isLogedin ? (
              <>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="swiper"
                  component={swiper}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Main"
                  component={Main}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="login"
                  component={login}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Profile"
                  component={Profile}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="signup"
                  component={signup}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="sellings"
                  component={sellings}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Otp"
                  component={Otp}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="OtpCode"
                  component={OtpCode}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="MyAddresses"
                  component={MyAddresses}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="HelpCenter"
                  component={HelpCenter}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="EditAddress"
                  component={EditAddress}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="type"
                  component={type}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="BankInfo"
                  component={BankInfo}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ForgetPassword"
                  component={ForgetPassword}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="PDFExample"
                  component={PDFExample}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ShippingInfo"
                  component={ShippingInfo}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="confirmPayout"
                  component={confirmPayout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="payout"
                  component={payout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SearchProduct"
                  component={SearchProduct}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="itemDetail"
                  component={ItemDetail}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="balance"
                  component={balance}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="tabnavigator"
                  component={BottomTabNavigator}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="MyPayments"
                  component={MyPayments}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="buyer"
                  component={buyer}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="userProfile"
                  component={UserProfile}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ContactUs"
                  component={ContactUs}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="EditProfile"
                  component={EditProfile}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="store"
                  component={Store}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="notifications"
                  component={notifications}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="successPayout"
                  component={successPayout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="settings"
                  component={Setting}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="bank"
                  component={bank}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="sellItem"
                  component={sellItem}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="cart"
                  component={cart}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="followSeller"
                  component={FollowSeller}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="singleMessage"
                  component={singleMessage}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="orderStatus"
                  component={OrderStatus}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="checkout"
                  component={checkout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="category"
                  component={category}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="tabnavigator"
                  component={BottomTabNavigator}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="cart"
                  component={cart}
                />
                 <Stack.Screen
                  options={{ headerShown: false }}
                  name="signup"
                  component={signup}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="checkout"
                  component={checkout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="sellings"
                  component={sellings}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="splash"
                  component={splash}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="type"
                  component={type}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="balance"
                  component={balance}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="sellItem"
                  component={sellItem}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ForgetPassword"
                  component={ForgetPassword}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="item"
                  component={item}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="sellType"
                  component={sellType}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="confirmPayout"
                  component={confirmPayout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="payout"
                  component={payout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="OtpCode"
                  component={OtpCode}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="userProfile"
                  component={UserProfile}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Main"
                  component={Main}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="login"
                  component={login}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Otp"
                  component={Otp}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Profile"
                  component={Profile}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="MyAddresses"
                  component={MyAddresses}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="EditAddress"
                  component={EditAddress}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="MyPayments"
                  component={MyPayments}
                />
                
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="BankInfo"
                  component={BankInfo}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="category"
                  component={category}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="EditProfile"
                  component={EditProfile}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ProductDetail"
                  component={ProductDetail}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="bank"
                  component={bank}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="successPayout"
                  component={successPayout}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="singleMessage"
                  component={singleMessage}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="notifications"
                  component={notifications}
                />

                <Stack.Screen
                  options={{ headerShown: false }}
                  name="buyer"
                  component={buyer}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="settings"
                  component={Setting}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="store"
                  component={Store}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="itemDetail"
                  component={ItemDetail}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="orderStatus"
                  component={OrderStatus}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="BuyerRating"
                  component={BuyerRating}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ShippingInfo"
                  component={ShippingInfo}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="pickImage"
                  component={PickImageModal}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="followSeller"
                  component={FollowSeller}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SearchProduct"
                  component={SearchProduct}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="HelpCenter"
                  component={HelpCenter}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ContactUs"
                  component={ContactUs}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="paymentstripe"
                  component={payment}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="PDFExample"
                  component={PDFExample}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}