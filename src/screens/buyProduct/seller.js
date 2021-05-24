import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSeparator from '../../components/separators/customSeparator';
import IconFeather from 'react-native-vector-icons/Feather';
import VerticalSeparator from '../../components/separators/verticalSeparator';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import StarRating from 'react-native-star-rating';

export default class Seller extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View>
        <View style={styles.main}>
          <Text style={styles.meetSeller}>Meet the seller</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('store', {
                  follow: true,
                  user: this.props.user,
                })
              }>
              <ImageBackground
                imageStyle={{ borderRadius: 30 }}
                style={styles.image}
                source={{ uri: this.props.image }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.titleSize}>{this.props.username}</Text>
            <TouchableOpacity style={styles.checkIcon}>
              <AntDesign name="checkcircle" color={color.brandRed} size={20} />
            </TouchableOpacity>
          </View>
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'5%'}
            width={'100%'}
          />
          <View style={styles.row}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.props.rating}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'red'}
            />
            <View style={styles.reviewsView}>
              <Text style={styles.reviewsText}>
                {this.props.reviews} reviews
              </Text>
              {/* <Text style={styles.completeSales}>
                 completed sales
              </Text> */}
            </View>
          </View>
          <CustomSeparator
            heightt={1}
            colorr={color.lightGrey2}
            margintop={'5%'}
            width={'100%'}
          />

          {/* Seller badges will come here

           <View style={styles.row}>
            <Text style={styles.generalColor}>Seller Badges </Text>
            <TouchableOpacity style={styles.questionMark}>
              <Text style={styles.questionColor}>?</Text>
            </TouchableOpacity>
          </View>
        </View>
         */}
        </View>
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
  main: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '5%',
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
    color: color.brandRed,
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
});
