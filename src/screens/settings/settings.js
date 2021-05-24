import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { s, color } from '../../libs/styles';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import SettingHead from '../../components/header/settingHeader';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '../../libs/storage';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: true,
      bankEmpty: '',
      cardEmpty: '',
      navigate: '',
    };
    this.haveAccount();
  }
  haveAccount = async () => {
    const user = await storage._retrieveData('user');

    if (!Object.keys(JSON.parse(user).bankData).length) {
      this.setState({ bankEmpty: true });
      this.setState({ navigate: 'MyPayments' });
    }
    if (
      Object.keys(JSON.parse(user).bankData.card).length &&
      !Object.keys(JSON.parse(user).bankData).hasOwnProperty('routing_number')
    ) {
      this.setState({ bankEmpty: false });
      this.setState({ navigate: 'BankInfo' });
    } else {
      this.setState({ bankEmpty: true });
      this.setState({ navigate: 'BankInfo' });
      this;
    }
  };
  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      this.haveAccount();
    });
  }
  isSeller = async () => {
    const isSeller = await AsyncStorage.getItem('isSeller');
    if (isSeller === 'true') this.props.navigation.navigate('balance');
    else {
      setTimeout(() => {
        Alert.alert(' ', 'You are not a seller');
      }, 500);
    }
  };
  render() {
    return (
      <View style={s.scrollview}>
        <SettingHead
          title="Settings"
          backgroundColor=""
          color={color.lightGrey}
        />
        <View style={styles.settingHeading}>
          <Text style={styles.headingText}>ACCOUNT SETTINGS</Text>
        </View>
        <View style={styles.optionsList}>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() =>
              this.props.navigation.navigate('EditProfile', {
                forgetPassword: false,
              })
            }>
            <View>
              <Text style={styles.optionsTextFont}>Change Password</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() =>
              this.props.navigation.navigate('Profile', {
                setting: this.state.setting,
              })
            }>
            <View>
              <Text style={styles.optionsTextFont}>Edit Profile</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() =>
              this.props.navigation.navigate('MyAddresses', {
                setting: this.state.setting,
              })
            }>
            <View>
              <Text style={styles.optionsTextFont}>My Address</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() =>
              this.props.navigation.navigate('MyPayments', {
                setting: this.state.setting,
              })
            }>
            <View>
              <Text style={styles.optionsTextFont}>My Payment Methods</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() =>
              this.props.navigation.navigate(this.state.navigate, {
                setting: this.state.setting,
                bankEmpty: this.state.bankEmpty,
              })
            }>
            <View>
              <Text style={styles.optionsTextFont}>My Bank Account</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() => this.props.navigation.navigate('notifications')}>
            <View>
              <Text style={styles.optionsTextFont}>Notifications</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsName}
            onPress={() => this.isSeller()}>
            <View>
              <Text style={styles.optionsTextFont}>Balance</Text>
              <HorizontalSeparator />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: color.lightGrey2,
  },
  settingHeading: {
    height: 55,
    justifyContent: 'flex-end',
    backgroundColor: color.lightGrey3,
  },
  optionsName: {
    marginLeft: 5,
    marginTop: '6%',
    width: '100%',
  },

  optionsList: {
    flexDirection: 'column',
    marginLeft: '3%',
  },
  optionsTextFont: {
    fontSize: 18,
    color: color.black,
  },
});
