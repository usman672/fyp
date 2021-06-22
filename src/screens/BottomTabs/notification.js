import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { s, color } from '../../libs/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';
import TabsHeader from '../../components/header/tabsHeader';
import storage from '../../libs/storage';
import { getNotificationsAction } from '../../redux/actions/notificationAction';
import { connect } from 'react-redux';
import moment from 'moment';

import LoadMore from '../../components/loader/loadMore';
import ListingLoader from '../../components/loader/listingLoader';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      userName: '',
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
      isLoading: false,
      isEmpty: false,
    };
    this.getNotifications();
    this.setSeller();
  }
  getNotifications = async () => {
    await this.props.getNotificationsAction();
  };
  setSeller = async () => {
    console.log('user', 'erferjiofjeroijferjggerjggtrtrvtrgrnho');

    const user = await storage._retrieveData('user');
    console.log(user, 'erferjiofjeroijferjggerjggtrtrvtrgrnho');

    await this.setState({
      userName: JSON.parse(user).data.user.name,
    });
    await this.setState({
      image: JSON.parse(user).data.user.photo,
    });
  };

  GetItem(item) {
    Alert.alert(item);
  }
  setSeller = async () => {
    const user = await storage._retrieveData('user');
    await this.setState({
      userName: JSON.parse(user).username,
    });
    await this.setState({
      image: JSON.parse(user).image_url,
    });
  };
  componentWillMount() {
    this.props.navigation.addListener('focus', () => {
      this.setSeller();
      this.getNotifications();
    });
  }
  getImage = (url) => {
    let path = require('../../assets/dummyProduct.png');
    return path;
  };
  render() {
    return (
      <View style={[s.scrollview]}>
        <TabsHeader
          guest={this.props.guest}
          image={this.state.image}
          userName={this.state.userName}
        />
        {this.state.FlatListItems.length > 0 ? (
          <FlatList
            data={this.state.FlatListItems}
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
                      source={this.getImage(0)}
                      resizeMode="stretch"
                    />
                    <View style={styles.bottomBadgeIcon}>
                      <MaterialCommunityIcons
                        name="heart"
                        color={color.primary}
                        size={(2.5 * s.width) / 100}
                      />
                    </View>
                  </View>
                  <View style={styles.notificationTextView}>
                    <Text numberOfLines={3} style={s.subtitle_normal}>
                      {item.notification}
                    </Text>
                  </View>
                  <View style={styles.daysView}>
                    <Text style={s.subtitle_general}>
                      {/* {moment(item.created_at).format('DD/MM/YY')}
                       */}
                      {item.days}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ListingLoader />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    notificationsList: state.NotificationReducer.notificationsList,
  };
};

const mapDispatchToProps = {
  getNotificationsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

const styles = StyleSheet.create({
  bottomBadgeIcon: {
    borderWidth: 0.5,
    position: 'absolute',
    right: -12,
    bottom: -5,
    backgroundColor: color.white,
    borderRadius: (6 * s.width) / 100 / 2,
    width: (5 * s.width) / 100,
    height: (5 * s.width) / 100,
    justifyContent: 'center',
    alignItems: 'center',
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
});
