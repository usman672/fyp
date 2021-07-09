import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../components';
import { s, color } from '../../../src/libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import { TagSelect } from 'react-native-tag-select';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/index';
import { getReviewsAction, ratingOrder } from '../../redux/actions/orderAction';
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';

class BuyerRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
      review: '',
      orderId: '',
      title: '',
      FlatListItems: [
        {
          days: '10d',
          url: require('../../assets/product.jpg'),
          title: '',
          notification:
            'Price is down. Buy right now "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'heart',
        },
        {
          days: '2d',
          url: require('../../assets/mobile.jpg'),
          title: '',
          notification:
            'Ding Dong. Sold. Congrats. Ship "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'swap-horizontal-bold',
        },
        {
          days: '02/17/19',
          url: require('../../assets/message.png'),
          title: 'Important Shipping update new pricing :',
          notification:
            'Price is down. Buy right now "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'heart',
        },
        {
          days: '4d',
          url: require('../../assets/sale.jpg'),
          title: '',
          notification:
            'Ding Dong. Sold. Congrats. Ship "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'swap-horizontal-bold',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: '',
          notification:
            'Price is down. Buy right now "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'heart',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: '',
          notification:
            'Ding Dong. Sold. Congrats. Ship "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'swap-horizontal-bold',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: '',
          notification:
            'Price is down. Buy right now "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'heart',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: '',
          notification:
            'Ding Dong. Sold. Congrats. Ship "Argentina 2018-1019 Home Messy 1 0 Jersey within 3 buisness days" ',
          iconCategory: 'swap-horizontal-bold',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: '',
          notification:
            'Ding Dong. Sold. Congrats. Ship "Argentina 2018-1019 Home Messy 10 Jersey within 3 buisness days" ',
          iconCategory: 'heart',
        },
      ],
    };
    this.getReviews();
    // console.log(this.props.route.params, 'awasiasdas');
  }
  getReviews = async () => {
    console.log(this.props.route.params.hId, 'ernhfik');
    const reviews = await this.props.getReviewsAction(
      this.props.route.params.hId,
      this.props.route.params.type,
    );
    if (reviews.success) {
    }
  };
  onStarRatingPress(rating) {
    if (this.tag.itemsSelected.length > 0) {
      this.setState({
        starCount: rating,
        title: JSON.stringify(this.tag.itemsSelected[0].label),
      });
    }

    this.setState({
      starCount: rating,
    });
  }
  review = async () => {
    // console.log(21312312312);
    // console.log(res);
    const rating = await this.props.ratingOrder(
      {
        rating: this.state.starCount,
        text: this.state.review,
        title: this.state.title,
      },
      this.props.route.params.hId,
      this.props.route.params.type,
    );
    console.log(rating);
    if (rating.success) {
      this.getReviews();
      Alert.alert('Message', 'Review Submitted Successfully');
    } else {
      Alert.alert('Message', 'You have already submit a review');
    }
  };
  onChange = (searchText) => {
    if (searchText) {
      this.setState({ review: searchText });
    }
  };
  render() {
    const { goBack } = this.props.navigation;
    const data = [
      { id: 1, label: 'Friendly' },
      { id: 2, label: 'Quick Rater' },
      { id: 3, label: 'understanding' },
      { id: 4, label: 'Comunication' },
    ];
    return (
      <View style={s.container_space_between}>
        <ScrollView>
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  name="close"
                  size={23}
                  color="gray"
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
              <Text style={styles.heading}>Buyer Rating</Text>
            </View>

            <View style={styles.content}>
              <Image
                style={styles.profileImage}
                source={
                  this.props.route.params.photo
                    ? { uri: this.props.route.params.photo }
                    : require('../../assets/hostel.jpg')
                }
              />
               {!this.props.route.params.isOwner &&
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={'red'}
              />
               }
            </View>
            {!this.props.route.params.isOwner &&
            <>
            <Text style={styles.secondHeading}>
              How Would you rate the buyer?
            </Text>
            <View style={styles.tags}>
              <TagSelect
                data={data}
                max={1}
                ref={(tag) => {
                  this.tag = tag;
                }}
                onMaxError={() => {
                  Alert.alert('Ops', 'Max reached');
                }}
                itemStyle={styles.item}
              />
            </View>

            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(searchText) => this.onChange(searchText)}
              />
            </View>
            </>
  }
          </View>
          <Text
            style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}
          >
            Reviews
          </Text>
          <FlatList
            data={this.props.allReviews}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.container}
                // onPress={() => this.props.navigation.navigate('notifications')}
              >
                <View style={s.row}>
                  <View style={styles.photoView}>
                    <Image
                      style={s.photo_100}
                      source={require('../../assets/logo.png')}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.notificationTextView}>
                    {/* {item.text !== '' && (
                      <Text numberOfLines={3} style={s.title_1_bold}>
                        {item.text}
                      </Text>
                    )} */}
                    <Text numberOfLines={3} style={s.subtitle_normal}>
                      {item.text}
                    </Text>
                  </View>
                  <View style={styles.daysView}>
                    <Text style={s.subtitle_general}>just now</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        {!this.props.route.params.isOwner &&
        <Button text="Submit Rating" rating={() => this.review()} />
  }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allReviews: state.OrderReducer.allReviews,
  };
};

const mapDispatchToProps = {
  getReviewsAction,
  ratingOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRating);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  heading: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    marginTop: 15,
    marginLeft: 10,
  },
  photoView: {
    width: (18 * s.width) / 100,
    height: (18 * s.width) / 100,
    justifyContent: 'center',
  },
  notificationTextView: {
    width: (60 * s.width) / 100,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  daysView: {
    width: (17 * s.width) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 63,
    alignSelf: 'center',
    marginBottom: 10,
  },
  content: {
    alignSelf: 'center',
    marginTop: 10,
  },
  secondHeading: {
    alignSelf: 'center',
    margin: 10,
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 70,
    justifyContent: 'flex-start',
  },
  tags: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  item: {
    alignSelf: 'center',
  },
});
