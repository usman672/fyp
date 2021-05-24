import React, { Component } from 'react';
import Notification from '../../screens/BottomTabs/notification';
import Home from '../../screens/BottomTabs/home';
import Messages from '../../screens/BottomTabs/messages';
import Likes from '../../screens/BottomTabs/likes';
import Sell from '../../screens/BottomTabs/sell';
import storage from '../../libs/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Image,
} from 'react-native';
import { s, color } from '../../libs/styles';
import IconWithBadge from '../../components/Icons/iconBadge';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { getUserAction } from '../../redux/actions/addressAction';
import Actions from '../../redux/actions';
import PickImageModal from '../../components/modal/pickImage';
import settingHeader from '../../components/header/settingHeader';
import ProfileHeader from '../../components/header/userProfileHeader';

const margintop = 20;
const Tab = createBottomTabNavigator();
class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userToken: '0',
    };
    this.getToken();
  }
  sellNavigate = async () => {
    if (this.state.userToken === null) {
      this.setState({ visible: false });
      setTimeout(() => {
        Alert.alert(' ', 'You are not logged in');
      }, 500);
    } else {
      const isSeller = await AsyncStorage.getItem('isSeller');
      if (isSeller === 'false') {
        setTimeout(() => {
          Alert.alert(' ', 'You are not a Seller');
        }, 500);
      } else {
        this.setState({ visible: true });
      }
    }
  };
  setImage = (uri) => {
    this.setState({ visible: false });
  };
  getToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    this.setState({ userToken: userToken });
  };
  check = (props, type) => {
    // if (this.state.userToken === null) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'space-between' }}>
    //       <ProfileHeader
    //         navigation={this.props.navigation}
    //         btnText="Sign Up"
    //         goTo="Main"
    //       />

    //       <View
    //         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Text style={s.NaText}>Need to Login First</Text>
    //       </View>
    //       <Text></Text>
    //     </View>
    //   );
    if (type === 'chats') return <Messages {...props} />;
    else if (type === 'notifications') return <Notification {...props} />;
    else if (type === 'likes') return <Likes {...props} />;
  };

  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Home') {
              return (
                <View style={styles.tabView}>
                  <MaterialCommunityIcons
                    style={s.tabIcons}
                    name={focused ? 'home' : 'home-outline'}
                    color={focused ? color.brandRed : color.black}
                  />
                  <Text style={styles.tabText} numberOfLines={1}>
                    Hostels
                  </Text>
                </View>
              );
            } else if (route.name === 'Likes') {
              return (
                <View style={styles.tabView}>
                  <FontAwesome
                    style={s.tabIcons}
                    name={focused ? 'shopping-bag' : 'shopping-bag'}
                    color={focused ? color.brandRed : color.black}
                  />
                  <Text style={styles.tabText} numberOfLines={1}>
                    Shops
                  </Text>
                </View>
              );
            } else if (route.name === 'New') {
              return (
                <View style={styles.tabView}>
                  <FontAwesome
                    style={s.tabIcons}
                    name={focused ? 'newspaper-o' : 'newspaper-o'}
                    color={focused ? color.brandRed : color.black}
                  />
                  <Text style={styles.tabText} numberOfLines={1}>
                    Jobs
                  </Text>
                </View>
              );
            } else if (route.name === 'Notifications') {
              return (
                <View style={styles.tabView}>
                  <FontAwesome
                    style={s.tabIcons}
                    name={focused ? 'bell' : 'bell-o'}
                    color={focused ? color.brandRed : color.black}
                  />
                  <Text style={styles.tabText} numberOfLines={1}>
                    Notification
                  </Text>
                </View>
              );
            } else if (route.name === 'Chats') {
              return (
                <View style={styles.tabView}>
                  <FontAwesome
                    style={s.tabIcons}
                    name={focused ? 'user' : 'user'}
                    color={focused ? color.brandRed : color.black}
                  />
                  <Text style={styles.tabText} numberOfLines={1}>
                    Profile
                  </Text>
                </View>
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: color.black,
          inactiveTintColor: color.black,
          style: {
            backgroundColor: color.white,
          },
          tabStyle: {},
          labelStyle: {
            paddingBottom: 3,
            fontSize: 12,
          },
          showLabel: false,
        }}>
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Likes" options={{ headerShown: false }}>
          {(props) => this.check(props, 'likes')}
        </Tab.Screen>
        <Tab.Screen name="New" options={{ headerShown: false }}>
          {(props) => <Sell {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Notifications" options={{ headerShown: false }}>
          {(props) => this.check(props, 'notifications')}
        </Tab.Screen>
        <Tab.Screen name="Chats" options={{ headerShown: false }}>
          {(props) => this.check(props, 'chats')}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}
export default BottomTabNavigator;

const styles = StyleSheet.create({
  sell: {
    height: 65,
    width: 65,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: color.brandRed,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: color.black,
  },
  sellText: {
    color: color.white,
    fontSize: 12,
    paddingBottom: 3,
  },
  cameraIcon: {
    fontSize: 50,
    color: color.white,
  },
  tabView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 11,
  },
});
