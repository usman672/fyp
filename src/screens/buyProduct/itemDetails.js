import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';

import { StackActions } from '@react-navigation/native';

import { s, color, neomorph } from '../../libs/styles';
import ItemDetailHeader from '../../components/header/itemDetailHeader';
import CustomSeparator from '../../components/separators/customSeparator';

import Description from '../../screens/buyProduct/description';
import MoneyBack from '../../screens/buyProduct/moneyBack';

import BuyNow from '../../screens/buyProduct/buyNow';

import storage from '../../libs/storage';
import { connect } from 'react-redux';
import { addToCartAction } from '../../redux/actions/cartAction';
import { likeDislikeProductAction } from '../../redux/actions/productAction';
import Actions from '../../redux/actions';
import { SliderBox } from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-community/async-storage';
import { bookRoomAction } from '../../redux/actions/orderAction';
import { similarProductAction } from '../../redux/actions/productAction';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import { getClientToken, bookRoomPayment } from '../../services/apiList';

class ItemDetail extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Add to cart',
      backColor: color.white,
      isGuest: '',
      iconName: 'hearto',
      iconColor: color.black,
      // likesCount: this.props.route.params.product.likes,
      imagesArray: this.getImagesArray(),
      badgeCount: this.props.cartProducts.length,
      isSeller: false,
      productId: [],
    };
    console.log(this.props.route.params.item, 12);
    this.checkSeller();
  }

  checkSeller = async () => {
    const user = await storage._retrieveData('user');

    if (JSON.parse(user).data.user._id == this.props.route.params.item.user) {
      this.setState({
        isSeller: true,
      });
    }
  };

  navigationPage = (element) => {
    this.props.navigation.dispatch(
      StackActions.replace('itemDetail', {
        product: element.item,
      }),
    );
  };
  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      //  this.setState({ badgeCount: this.props.cartProducts.length });
    });
  }

  getImagesArray = () => {
    console.log(this.props.route.params.item, 1253453);
    var imagesArray = [];
    for (var i = 0; i < this.props.route.params.item.img.length; i++) {
      imagesArray.push(this.props.route.params.item.img[i].image_url);
    }
    if (this.props.route.params.item.img.length < 1) {
      imagesArray.push(require('../../assets/dummyProduct.png'));
    }
    return imagesArray;
  };

  book = async () => {
    const res = await getClientToken();
    console.log(res, '5y56y65y');
    BraintreeDropIn.show({
      clientToken: res.clientToken.clientToken,
      merchantIdentifier: 'h47c2b5ctcmmhd68',
      //  merchantName: 'Your Merchant Name for Apple Pay',
      orderTotal: 'Total Price',
      vaultManager: true,
      cardDisabled: false,
      googlePay: false,
      darkTheme: true,
      payPal: true,
    })
      .then(async (result) => {
        // console.log(result);

        console.log(res, 354534);
        const res = await this.props.bookRoomAction(
          this.props.route.params.item._id,
          {
            paymentMethodNonce: result.nonce,
            hostel: this.props.route.params.item.hostel,
            roomNumber: this.props.route.params.item.roomNumber,
            amount: parseInt(this.props.route.params.item.price),
          },
        );
        if (res.success) {
          Alert.alert('Message', res.message);
        } else {
          Alert.alert('Error', res.message);
        }
      })
      .catch((error) => {
        if (error.code === 'USER_CANCELLATION') {
          // update your UI to handle cancellation
        } else {
          // update your UI to handle other errors
        }
      });
  };
  buynow = async () => {
    Alert.alert(
      'Booking',
      'Are you sure you want to send request for Booking this Room?',
      [{ text: 'No' }, { text: 'Yes', onPress: () => this.book() }],
      { cancelable: false },
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props.route.params.item, 'iowejiofjwejjweo,eF,.');
    return (
      <View style={[s.scrollview]}>
        <ItemDetailHeader
          price={'Room # ' + this.props.route.params.item.roomNumber}
          badgeCount={this.state.badgeCount}
          navigation={this.props.navigation}
        />
        <ScrollView style={[s.scrollview]}>
          <View style={styles.main}>
            <View style={styles.imageBackground}>
              <SliderBox
                images={this.state.imagesArray}
                sliderBoxHeight={(50 * s.height) / 100}
                dotColor={color.brandRed}
                inactiveDotColor={color.black}
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
              />
            </View>
            <View style={styles.itemDetailView}>
              <View>
                <Text style={styles.boldText}>
                  {this.props.route.params.item.availableSeats} Seats Available
                </Text>
                <Text style={styles.likes}>
                  {'Added ' +
                    moment(this.props.route.params.item.createdAt).format(
                      'DD MMM YYYY',
                    )}
                </Text>
                <Text style={styles.priceBoldText}>
                  {this.props.route.params.item.price}
                </Text>
              </View>
            </View>

            <Description
              descriptionOne={this.props.route.params.item.description}
            />
            {this.state.isSeller === false && (
              <BuyNow navigation={this.props.navigation} buy={this.buynow} />
            )}
            <CustomSeparator
              heightt={1}
              colorr={color.lightGrey2}
              margintop={'20%'}
              width={'100%'}
            />
          </View>
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
  similarProductAction,
  likeDislikeProductAction,
  addToCartAction,
  bookRoomAction,
  getLikeProductAction: Actions.getLikeProductAction,
  getAllRecentProductsAction: Actions.getAllRecentProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
  },
  imageBackground: {
    height: (50 * s.height) / 100,
  },
  item: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  shareIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsOpacity: {
    borderRadius: 25,
    backgroundColor: color.blackOpacity,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
    marginBottom: '3%',
  },
  icon: {
    color: color.white,
    fontSize: 25,
  },
  itemDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '3%',
  },
  favouriteCard: {},
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  favouriteCardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  likes: {
    marginTop: '5%',
    color: color.lightGrey2,
  },
  priceBoldText: {
    marginTop: '10%',
    fontSize: 25,
    fontWeight: 'bold',
  },
  cartButtonView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '3%',
    marginTop: '4%',
  },
  cartButton: {
    backgroundColor: color.black,
    borderRadius: 10,
    height: 45,
    width: (40 * Math.round(Dimensions.get('window').width)) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sold: {
    backgroundColor: color.orangeOpacity,
    borderRadius: 10,
    height: 45,
    width: (40 * Math.round(Dimensions.get('window').width)) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
