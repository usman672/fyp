import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { AirbnbRating } from 'react-native-ratings';
import { s, color } from '../../libs/styles';
import CardView from 'react-native-cardview';

export default class ReviewCard extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRating = (review) => {
    console.log(review, 'rejkfgeruiohjoeh');
    return (
      <View style={[styles.reviewStatus, s.row]}>
        <Text style={[styles.ratingText]}>{review.averageRating}</Text>
        <AirbnbRating
          showRating={false}
          size={20}
          defaultRating={review.averageRating}
          isDisabled={true}
          onFinishRating={this.ratingCompleted}
        />
      </View>
    );
  };

  renderReviewType = (review) => {
    return (
      <CardView
        style={[
          s.roundCard,
          {
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.4,
            shadowColor: '#ADB6D4',
            shadowRadius: 3,
          },
        ]}
        cardElevation={6}
        cornerRadius={22}
      >
        <Image
          source={require('../../assets/dress_shirt.jpeg')}
          style={styles.iconVideo}
          resizeMode="contain"
        />
      </CardView>
    );
  };

  onPress = (review) => {
    if (this.props.type == 'hostels') {
      this.props.navigation.navigate('sellings', {
        hId: review._id,
        type: this.props.type,
        name: review.name,
        address: review.address,
        photo: review.photo,
        longitude: review.longitude,
        latitude: review.latitude,
      });
    } else if (this.props.type == 'shops') {
      this.props.navigation.navigate('shopItemDetail', {
        item: review,
      });
    }
  };

  render() {
    const review = this.props.review;
    if (this.props.type == 'hostels') {
      return (
        <CardView
          style={[
            styles.cardStyle,
            {
              shadowOpacity: 0.4,
              shadowColor: '#ADB6D4',
            },
          ]}
          cardElevation={6}
          cornerRadius={22}
        >
          <View style={[s.row, { padding: 10 }]}>
            <Text>{review.hostelType}</Text>
            <Text
              style={[
                { fontSize: 13, fontFamily: 'Poppins-Regular' },
                { color: '#ADB6D4' },
              ]}
            >
              {/* {moment(review.created_at).format('DD MMM YYYY . hh:mm A')} */}
              {review.town}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.imageOpacity}
            onPress={() => {
              this.onPress(review);
            }}
          >
            <Image
              source={{ uri: review.photo }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View style={[s.row, styles.m_20]}>
            {this.renderRating(review)}
            <Text
              style={[
                { fontSize: 13, fontFamily: 'Poppins-Regular' },
                { color: '#ADB6D4' },
              ]}
            >
              {/* {moment(review.created_at).format('DD MMM YYYY . hh:mm A')} */}
              Since {moment(review.created_at).format('DD/MM/YY')}
            </Text>
          </View>
          <View style={[s.row, styles.descriptionText]}>
            <Text style={[styles.subHeadingNormalText]} numberOfLines={3}>
              {review.description}
            </Text>
          </View>
        </CardView>
      );
    } else if (this.props.type == 'shops') {
      console.log(this.props.review, 'reivei');
      return (
        <CardView
          style={[
            styles.cardStyle,
            {
              shadowOpacity: 0.4,
              shadowColor: '#ADB6D4',
            },
          ]}
          cardElevation={6}
          cornerRadius={22}
        >
          <View style={[s.row, { padding: 10 }]}>
            <Text>{review.name}</Text>
            <Text
              style={[
                { fontSize: 13, fontFamily: 'Poppins-Regular' },
                { color: '#ADB6D4' },
              ]}
            >
              {review.shop.town}
              {/* {moment(review.created_at).format('DD MMM YYYY . hh:mm A')} */}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.imageOpacity}
            onPress={() => {
              this.onPress(review);
            }}
          >
            <Image
              source={{ uri: review.image[0].image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View style={[s.row, styles.m_20]}>
            {this.renderRating(review)}
            <Text
              style={[
                { fontSize: 13, fontFamily: 'Poppins-Regular' },
                { color: '#ADB6D4' },
              ]}
            >
              Since {moment(review.created_at).format('DD/MM/YY')}
            </Text>
          </View>
          <View style={[s.row, styles.descriptionText]}>
            <Text style={[styles.subHeadingNormalText]} numberOfLines={3}>
              {review.description}
            </Text>
          </View>
        </CardView>
      );
    }
  }
}
const styles = StyleSheet.create({
  imageView: {
    height: 200,
  },
  m_20: {
    margin: 20,
    marginBottom: 0,
  },
  cardText: {
    fontSize: 32,
    color: color.gray,
  },
  title: {
    width: '85%',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#202020',
    marginRight: 25,
    marginLeft: 15,
  },
  ratingText: {
    fontSize: 17,
    marginRight: 8,
  },
  descriptionText: {
    marginTop: 6,
    marginLeft: 22,
    marginRight: 22,
    marginBottom: 25,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
    color: '#000000',
  },
  subHeadingNormalText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  imageOpacity: {
    height: 200,
    width: s.width - 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  cardStyle: {
    alignSelf: 'center',
    width: s.width - 20,
    marginTop: 5,
  },
});
