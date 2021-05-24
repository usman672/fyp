import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';
import IconWithBadge from '../Icons/iconBadge';
import AsyncStorage from '@react-native-community/async-storage';
export const navigationRef = React.createRef();
function Navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
class ItemDetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
    };
    this.setToken();
  }
  setToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    await this.setState({ userToken: userToken });
  };
  render() {
    return (
      <CardView
        style={[s.headerCard, { backgroundColor: color.black }]}
        cardElevation={neomorph.cardElevation}>
        <View style={s.row}>
          <View style={[s.row]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('tabnavigator')}>
              <AntDesign style={styles.icon} name="left" />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.centerText}>{this.props.price}</Text>
          </View>
          {this.state.userToken !== null ? (
            <View style={[s.row]}>
              <TouchableOpacity
                style={styles.cart}
                onPress={() => this.props.navigation.navigate('cart')}>
                <IconWithBadge
                  name="cart-plus"
                  color={color.white}
                  badgeCount={this.props.badgeCount}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
          )}
        </View>
      </CardView>
    );
  }
}

export default ItemDetailHeader;
const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    color: color.brandRed,
    marginLeft: 15,
  },
  cart: {
    marginRight: 15,
  },
  myStoreText: {
    fontSize: 20,
    color: color.white,
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 20,
    color: color.white,
  },
});
