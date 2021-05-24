import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { PureComponent } from 'react';
import stripe from 'tipsi-stripe';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSeparator from '../../components/separators/customSeparator';
import IconFeather from 'react-native-vector-icons/Feather';
import VerticalSeparator from '../../components/separators/verticalSeparator';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
stripe.setOptions({
  publishableKey:
    'pk_test_51GsCkoJngS3nWOeWuwVxkps0ZRWzSq2sHSTH223Tv87QTuf42F5TW2JO7P6Cs33CfRCGiemBmDPZHyY0Z2BagMBm00V0aU2N0I',
});
export default class BuyNow extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
  }
  state = {
    loading: false,
    token: null,
    success: null,
  };
  
  handleCardPayPress = async () => {
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
      // (token);

      this.setState({ loading: false, token });
    } catch (error) {
      this.setState({ loading: false });
    }
  };


  render() {
    return (
      <View>
        <View style={styles.main}>
          
        <View style={styles.main}>
          <TouchableOpacity style={styles.logo}>
            <Text style={styles.logoText}>B</Text>
          </TouchableOpacity>
          <Text style={styles.middleColor}>Book You'r Room </Text>
          <Text style={styles.lowerColor}>
             You'r Booking Notification Send To Owner 
          </Text>
          <Text style={styles.lowerColor}>
         Plz Wait For Approve Booked Request </Text>
          
        </View>

          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey3}
            margintop={'10%'}
            width={'100%'}
          />
          <View style={styles.cartButtonView}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => this.props.buy()}>
              <Text style={styles.cartButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomSeparator
          heightt={10}
          colorr={color.lightGrey3}
          margintop={'10%'}
          width={'100%'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },

  reviewsView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '3%',
  },
  meetSeller: {
    color: color.lightGrey2,
    fontSize: 18,
  },
  reviewsText: {
    fontSize: 20,
  },
  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
    width:'95%',
    alignSelf:'center'
  },
  logo: {
    backgroundColor: color.black,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: color.brandRed,
    fontSize: 30,
    fontWeight: 'bold',
  },
  middleColor: {
    color: color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '1%',
  },
  lowerColor: {
    fontSize: 15,
    color: color.lightGrey2,
    alignSelf: 'center',
    marginTop: '1%',
  },
  image: {
    height: 80,
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleSize: {
    marginLeft: '3%',
    fontSize: 18,
    fontWeight: 'bold',
  },

  starIcon: {
    color: color.starIcon,
  },

  checkIcon: {
    marginLeft: '2%',
  },
  completeSales: {
    color: color.darkBlue,
    fontSize: 16,
  },
  questionMark: {
    backgroundColor: color.lightGrey2,
    borderRadius: 8,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionColor: {
    color: color.white,
  },
  generalColor: {
    color: color.lightGrey2,
    fontSize: 20,
  },
  paymentDescription: {
    marginTop: '3%',
    color: color.nearGray,
    fontSize: 14,
  },
  paymentImage: {
    marginTop: '5%',
    width: (70 * Math.round(Dimensions.get('window').width)) / 100,
    height: 50,
  },
  cartButtonView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: '3%',
    marginTop: '5%',
  },
  cartButton: {
    backgroundColor: color.black,
    borderRadius: 5,
    height: 45,
    width: (50 * Math.round(Dimensions.get('window').width)) / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});