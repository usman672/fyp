import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { s, color } from '../../libs/styles';
import Actions from '../../redux/actions';
import { Input, PasswordInput } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import { signinAction } from '../../redux/actions/userActions';
import storage from '../../libs/storage';
import AsyncStorage from '@react-native-community/async-storage';
class Login extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.togglePassword = this.togglePassword.bind(this);
    this.state = {
      username: '',
      email: '',
      ispassword: false,
      isusername: false,
      isemail: false,
      showPassword: true,
    };
    AsyncStorage.removeItem('token');
  }
  togglePassword(value) {
    this.setState({ showPassword: !this.state.showPassword });
  }
  onChangeEmail = (email) => {
    if (email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        this.setState({ isemail: false });
      } else {
        this.setState({ email: email, isemail: true });
      }
    } else {
      this.setState({ isemail: false });
    }
  };
  onChangePassword = (password) => {
    if (password.length > 2) {
      this.setState({ password: password, ispassword: true });
    } else {
      this.setState({ ispassword: false });
    }
  };
  checkField = () => {
    if (this.state.ispassword && this.state.isemail) {
      return true;
    }
  };
  login = async () => {
    const fcm = await AsyncStorage.getItem('device_token');

    const res = await this.props.signinAction({
      email: this.state.email,
      password: this.state.password,
      fcmToken: fcm,
    });
  };
  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={[s.scrollview]} keyboardShouldPersistTaps="always">
        <View style={styles.view}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}>
              <Icon
                name="left"
                size={30}
                color={color.brandRed}
                style={{ margin: 13 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forgetbtn}
              onPress={() => this.props.navigation.navigate('ForgetPassword')}
            >
              <Text style={styles.forgetbtnText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <Input
            heading="Your Email"
            placeholder="name@example.com"
            ref="email"
            isValid={this.state.isemail}
            onChange={this.onChangeEmail}
          />
          <PasswordInput
            heading="Your Password"
            placeholder="7-128 character password"
            ref="password"
            isValid={this.state.ispassword}
            isShow={this.state.showPassword}
            onChange={this.onChangePassword}
            togglePassword={this.togglePassword}
          />

          <TouchableOpacity
            style={
              this.checkField()
                ? s.buttonbox(color.black, color.black, 'center', '90%')
                : s.buttonbox(color.gray, color.gray, 'center', '90%')
            }
            disabled={!this.checkField()}
            onPress={() => this.login()}
          >
            <Text style={s.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  signinAction: Actions.signinAction,
  getUserAction: Actions.getUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: color.black,
    height: 60,
    justifyContent: 'space-between',
  },
  forgetbtnText: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    margin: 10,
    textDecorationLine: 'underline',
    color: color.white,
  },
  forgetbtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
