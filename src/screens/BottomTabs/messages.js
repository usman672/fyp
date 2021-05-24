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
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';
import TabsHeader from '../../components/header/tabsHeader';
import storage from '../../libs/storage';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.setSeller();
    this.state = {
      image: '',
      userName: '',
      FlatListItems: [
        {
          days: '1d',
          url: require('../../assets/product.jpg'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
        {
          days: '2d',
          url: require('../../assets/mobile.jpg'),
          title: 'Sorry again',
          notification: 'Jasminewalys',
        },
        {
          days: '3d',
          url: require('../../assets/message.png'),
          title: 'Okey let me check then',
          notification: 'okay',
        },
        {
          days: '4d',
          url: require('../../assets/sale.jpg'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
        {
          days: '4d',
          url: require('../../assets/logo.png'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
        {
          days: '11/11/20',
          url: require('../../assets/logo.png'),
          title: 'Can you do $100 with ship',
          notification: 'Gift',
        },
      ],
    };
  }

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
    this.props.navigation.addListener('focus', (payload) => {
      this.setSeller();
    });
  }
  render() {
    return (
      <View style={[s.scrollview]}>
        <TabsHeader
          guest={this.props.guest}
          image={this.state.image}
          userName={this.state.userName}
          navigation={this.props.notification}
        />

        <ScrollView style={[s.scrollview]}>
          <FlatList
            data={this.state.FlatListItems}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('singleMessage')}
                style={styles.container}>
                <View style={s.row}>
                  <View style={styles.photoView}>
                    <Image
                      style={[s.photo_100]}
                      source={item.url}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.notificationTextView}>
                    {item.title !== '' && (
                      <Text numberOfLines={2} style={s.title_1_normal}>
                        {item.title}
                      </Text>
                    )}
                    <Text numberOfLines={2} style={s.subtitle_normal}>
                      {item.notification}
                    </Text>
                  </View>
                  <View style={styles.daysView}>
                    <Text style={s.subtitle_general}>{item.days}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 10,
  },
  photoView: {
    width: (15 * s.width) / 100,
    height: (15 * s.width) / 100,
    justifyContent: 'center',
  },
  notificationTextView: {
    width: (60 * s.width) / 100,
    paddingBottom: 15,
    justifyContent: 'center',
  },
  daysView: {
    width: (19 * s.width) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});
