import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';
import AsyncStorage from '@react-native-community/async-storage';
import IconWithBadge from '../Icons/iconBadge';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileHeader from '../../components/header/userProfileHeader';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
    };
  }
  setNavigation=()=>{
    this.props.navigation.navigate('userProfile')
  }
  render() {
    console.log(this.props.image,'jsdfjij')
    return (
      <CardView
        style={[s.headerCard, { backgroundColor: color.black }]}
        cardElevation={neomorph.cardElevation}>
        <View style={s.row}>
          <View style={[s.row]}>
            <TouchableOpacity onPress={this.setNavigation}>
              <Image
                source={{uri:this.props.image}}
                style={[styles.headerItem, styles.headerImage]}
                
              />
            </TouchableOpacity>
            <Text style={styles.title}>{this.props.userName}</Text>
          </View>
        </View>
      </CardView>
    );
  }
}
export default Header;
const styles = StyleSheet.create({
  headerItem: {
    marginLeft: 10,
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  cart: {
    marginRight: 15,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
  },
  icon: {
    fontSize: 30,
    color: color.brandRed,
  },
  myStoreBtn: {
    marginRight: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 100,
    height: 35,
    backgroundColor: color.brandRed,
  },
  myStoreText: {
    fontSize: 20,
    color: color.white,
  },
});
