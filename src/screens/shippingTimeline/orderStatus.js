import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { s, color } from '../../libs/styles';
import Timeline from 'react-native-timeline-flatlist';
import SettingHeader from '../../components/header/settingHeader';
import Shipping from '..//..//screens/shippingTimeline/whenShipping';
import Dates from '../../screens/shippingTimeline/date';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/index';
import { checkOrderStatus } from '../../redux/actions/orderAction';
import moment from 'moment';

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '',
          description: '',
          circleColor: '',
          lineColor: '',
        },
        {
          title: '',
          description: '',
          circleColor: '',
          lineColor: '',
        },

        {
          title: '',
          description: '',
          circleColor: '',
          lineColor: '',
        },
        {
          title: '',
          description: '',
          circleColor: '',
          lineColor: '',
        },
      ],
    };
    // console.log(
    //   this.props.route.params.params._id,
    //   'this.props.route.params.params',
    // );
    // console.log(
    //   this.props.route.params.params.product.userId,
    //   'dasdasdasdasdas',
    // );
    this.checkOrderStatus();
  }
  checkOrderStatus = async () => {
    const res = await this.props.checkOrderStatus({
      orderId: this.props.route.params.params._id,
      productId: this.props.route.params.params.product._id,
    });
    // console.log(res);
  };
  checkStatus() {
    if (
      this.props.getorderStatus === 'UNKNOWN' ||
      this.props.getorderStatus === 'TRANSIT'
    ) {
      if (this.props.getorderStatus === 'TRANSIT') {
        this.setStatusValues(
          0,
          <Text style={styles.title}>Shipped</Text>,
          <Dates text="ETA" padding={20} />,
          color.black,
          color.primary,
        );
        this.setStatusValues(
          1,
          <Text style={styles.title}>Delivery</Text>,
          <Shipping
            iconName={'delivery'}
            upperText={'Latest Status:'}
            lowerText={'Out for delivery,Expected Delivery By 8:00 PM'}
          />,
          color.black,
          color.primary,
        );
        this.setStatusValues(2, 'Rating', '', color.black, color.black);
        this.setStatusValues(3, 'Complete', '', color.black, color.black);
      } else {
        this.setStatusValues(
          0,
          <Text style={styles.title}>Shipping</Text>,
          <Shipping
            iconName={'shipping'}
            upperText={'Pack it up'}
            lowerText={'Please ship your item'}
          />,
          color.black,
          color.primary,
        );
        this.setStatusValues(1, 'Delivery', '', color.black, color.black);
        this.setStatusValues(2, 'Rating', '', color.black, color.black);
        this.setStatusValues(3, 'Complete', '', color.black, color.black);
      }
    } else if (this.props.getorderStatus === 'DELIVERED') {
      this.setStatusValues(
        2,
        <Text style={styles.title}>Rating</Text>,
        <Shipping
          iconName={'rating'}
          upperText={
            'The buyer has 3 days after delivery to confirm the item is as described and submit a rating. Meanwhile, we will be reminding the buyer to rate'
          }
          lowerText={''}
        />,
        color.black,
        color.primary,
      );
      this.setStatusValues(0, 'Shipped', '', color.primary, color.primary);
      this.setStatusValues(1, 'Delivered', '', color.primary, color.primary);
      this.setStatusValues(3, 'Complete', '', color.black, color.black);
    }
  }

  setStatusValues(index, title, description, lineColor, circleColor) {
    this.state.data[index].title = title;
    this.state.data[index].description = description;
    this.state.data[index].lineColor = lineColor;
    this.state.data[index].circleColor = circleColor;
  }
  navigateRating = () => {
    if (this.props.getorderStatus === 'DELIVERED') {
      this.props.navigation.navigate('BuyerRating',{
        orderId: this.props.route.params.params._id,
        reviewedUser: this.props.route.params.params.product.userId,
      });
    } else {
      this.props.navigation.navigate('orderStatus', {
        params: 'rating',
      });
    }
  };
  render() {
    return (
      <ScrollView style={[s.scrollview]}>
        <SettingHeader
          title="Order Status"
          backgroundColor=""
          color={color.lightGrey}
        />
        <View style={s.scrollview}>
          <View style={styles.rowView}>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={{
                  uri: this.props.route.params.params.product.image_urls[0]
                    .image_url,
                }}
              />
            </View>
            <View style={styles.rowRightSide}>
              <View style={styles.detailView}>
                <Text style={styles.boldText}>
                  {this.props.route.params.params.product.name}
                </Text>
                <Text style={styles.likes}>
                  Posted at
                  {moment(
                    this.props.route.params.params.product.createdAt,
                  ).format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={styles.recieptButtonView}>
                <Text style={styles.priceBoldText}>
                  ${this.props.route.params.params.product.price}
                </Text>

                <TouchableOpacity style={styles.recieptButton}>
                  <Text style={styles.recieptText}>Reciept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            {this.checkStatus()}
            <Timeline
              data={this.state.data}
              showTime={false}
              innerCircleType="icon"
              titleStyle={{ marginTop: -10, fontWeight: '' }}
            />
          </View>
          {this.props.getorderStatus === 'DELIVERED' && (
            <View style={styles.ratingView}>
              <TouchableOpacity
                style={s.buttonbox(color.black, color.black, 'center', '90%')}
                onPress={this.navigateRating}>
                <Text style={s.buttonText}>Go to Rating</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* {this.props.route.params.params === 'rating' && (
            <View style={styles.ratingView}>
              <TouchableOpacity
                style={s.buttonbox(color.black, color.black, 'center', '90%')}
                onPress={this.navigateRating}>
                <Text style={s.buttonText}>Rate Now</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getorderStatus: state.OrderReducer.getorderStatus,
  };
};

const mapDispatchToProps = {
  checkOrderStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);

const styles = StyleSheet.create({
  timeline: {
    margin: 0,
  },

  container: {
    flex: 1,
    paddingTop: 20,

    backgroundColor: color.lightGrey3,
  },
  rowView: {
    margin: 10,
    flexDirection: 'row',
    width: (95 * Math.round(Dimensions.get('window').width)) / 100,
    justifyContent: 'space-between',
  },
  detailView: {
    marginLeft: '2%',
    width: (70 * Math.round(Dimensions.get('window').width)) / 100,
  },
  imageView: {
    width: (22 * Math.round(Dimensions.get('window').width)) / 100,
    height: (22 * Math.round(Dimensions.get('window').width)) / 100,
  },
  image: {
    width: (22 * Math.round(Dimensions.get('window').width)) / 100,
    height: (22 * Math.round(Dimensions.get('window').width)) / 100,

    resizeMode: 'stretch',
  },

  boldText: {
    fontSize: 16,
  },

  likes: {
    marginTop: '1%',
    color: color.lightGrey2,
  },
  priceBoldText: {
    marginTop: '2.5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recieptButtonView: {
    width: (73 * Math.round(Dimensions.get('window').width)) / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2%',
  },
  recieptButton: {
    height: 35,
    width: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  recieptText: {
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingView: {
    marginTop: (15 * Math.round(Dimensions.get('window').height)) / 100,
  },
});
