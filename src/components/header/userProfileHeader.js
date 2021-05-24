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
import CardView from 'react-native-cardview';
import AsyncStorage from '@react-native-community/async-storage';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeller: '',
      userToken: '',
    };
    this.setToken();
    this.setSeller();
  }
  getButton = () => {
    if (this.state.isSeller === 'true' || this.state.userToken === null) {
      return (
        <View style={[s.row]}>
          <TouchableOpacity
            style={styles.myStoreBtn}
            onPress={() =>
              this.props.navigation.navigate(this.props.goTo, {
                follow: false,
                user: false,
              })
            }>
            <Text style={styles.myStoreText}>{this.props.btnText}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  setToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    this.setState({ userToken: userToken });
  };
  setSeller = async () => {
    const isSeller = await AsyncStorage.getItem('isSeller');
    await this.setState({ isSeller: isSeller });
  };
  render() {
    return (
      <CardView
        style={[s.headerCard, { backgroundColor: color.black }]}
        cardElevation={neomorph.cardElevation}>
        <View style={s.row}>
          {this.state.userToken ? (
            <View style={[s.row]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('tabnavigator')}>
                <AntDesign style={styles.icon} name="left" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text />
          )}
          {this.getButton()}
        </View>
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    color: color.brandRed,
    marginLeft: 10,
  },
  myStoreBtn: {
    marginRight: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: color.brandRed,
  },
  myStoreText: {
    fontSize: 16,
    color: color.white,
  },
});
