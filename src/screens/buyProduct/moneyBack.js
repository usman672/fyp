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
export default class MoneyBack extends Component {
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
          <TouchableOpacity style={styles.logo}>
            <Text style={styles.logoText}>B</Text>
          </TouchableOpacity>
          <Text style={styles.middleColor}>Book You'r Room </Text>
          <Text style={styles.lowerColor}>
             You'r Booking Notification Send To Owner plz Wait For Approve Booking Request
          </Text>
        </View>

        <CustomSeparator
          heightt={10}
          colorr={color.lightGrey3}
          margintop={'10%'}
          width={'100%'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  logo: {
    backgroundColor: color.black,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: color.brandRed,
    fontSize: 30,
    fontWeight: 'bold',
  },
  middleColor: {
    color: color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '1%',
  },
  lowerColor: {
    fontSize: 15,
    color: color.lightGrey2,
    alignSelf: 'center',
    marginTop: '1%',
  },
});
