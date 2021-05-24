/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { s, color } from '../../libs/styles';
import { Input, PasswordInput } from '../../components';
import SettingHeader from '../../components/header/settingHeader';
import Actions from '../../redux/actions';
import {
  changeCurrentPasswordAction,
  changePasswordAction,
} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.togglePassword = this.togglePassword.bind(this);

    this.state = {
      password: '',
      ispassword: false,
      newpassword: '',
      isnewpassword: false,
      confirmpassword: '',
      isconfirmpassword: false,
      showPassword: true,
      showPassword2: true,
      showPassword3: true,
      isForgot: this.props.route.params.forgetPassword,
      header: this.props.route.params.forgetPassword
        ? 'Reset Password'
        : 'Change Password',
    };
  }
  togglePassword(value) {
    if (value === 'currentpassword') {
      // console.log("ergjtrogitjgotijo")
      this.setState({ showPassword: !this.state.showPassword });
    } else if (value === 'newpassword') {
      this.setState({ showPassword2: !this.state.showPassword2 });
    } else if (value === 'confirmpassword') {
      this.setState({ showPassword3: !this.state.showPassword3 });
    }
  }

  onChangePassword = (password) => {
    if (password.length > 6) {
      this.setState({ password: password, ispassword: true });
    } else {
      this.setState({ ispassword: false });
    }
  };
  onChangenewPassword = (password) => {
    if (password.length > 6) {
      this.setState({ newpassword: password, isnewpassword: true });
    } else {
      this.setState({ isnewpassword: false });
    }
  };
  onChangeConfirmPassword = (password) => {
    if (password.length > 6) {
      this.setState({ confirmpassword: password, isconfirmpassword: true });
    } else {
      this.setState({ isconfirmpassword: false });
    }
  };
  checkField = () => {
    if (this.props.route.params.forgetPassword) {
      if (this.state.isconfirmpassword && this.state.isnewpassword) {
        return true;
      }
    } else {
      if (this.state.ispassword && this.state.isnewpassword) {
        if (this.state.isconfirmpassword) {
          return true;
        }
      }
    }
  };
  changePassword = async () => {
    if (this.state.confirmpassword == this.state.newpassword) {
      let res;
      if (this.props.route.params.forgetPassword) {
        const number = await AsyncStorage.getItem('number');
        res = await this.props.changePasswordAction({
          phone: number,
          countryCode: '1',
          password: this.state.confirmpassword,
        });
      } else {
        res = await this.props.changeCurrentPasswordAction({
          currentPassword: this.state.password,
          newPassword: this.state.newpassword,
        });
      }
      res;
      if (res.code === 0) {
        if (this.props.route.params.forgetPassword) {
          this.props.navigation.navigate('login');
        } else {
          this.props.navigation.navigate('tabnavigator');
        }
      } else {
        setTimeout(() => {
          Alert.alert('Error', res.message);
        }, 500);
      }
    } else {
      setTimeout(() => {
        Alert.alert('Error', 'New Password and Confirm password not Same');
      }, 500);
    }
  };
  render() {
    const { goBack } = this.props.navigation;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
        <View>
          <SettingHeader
            title={this.state.header}
            backgroundColor={color.black}
            color={color.white}
          />
          <View style={styles.view}>
            <View style={styles.fieldsview}>
              {!this.state.isForgot ? (
                <PasswordInput
                  heading="Current Password"
                  placeholder="7-128 character password"
                  ref="currentpassword"
                  isValid={this.state.ispassword}
                  isShow={this.state.showPassword}
                  onChange={this.onChangePassword}
                  togglePassword={this.togglePassword}
                />
              ) : (
                <Text />
              )}
              <PasswordInput
                heading="New Password"
                placeholder="7-128 character password"
                ref="newpassword"
                isValid={this.state.isnewpassword}
                isShow={this.state.showPassword2}
                onChange={this.onChangenewPassword}
                togglePassword={this.togglePassword}
              />
              <PasswordInput
                heading="Confirm password"
                placeholder="7-128 character password"
                ref="confirmpassword"
                isValid={this.state.isconfirmpassword}
                isShow={this.state.showPassword3}
                onChange={this.onChangeConfirmPassword}
                togglePassword={this.togglePassword}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={!this.checkField()}
            onPress={() => this.changePassword()}
            style={
              this.checkField()
                ? s.buttonbox(color.black, color.black, 'stretch', '90%')
                : s.buttonbox(color.gray, color.gray, 'stretch', '90%')
            }>
            <Text style={s.buttonText}>Update</Text>
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
  changeCurrentPasswordAction: Actions.changeCurrentPasswordAction,
  changePasswordAction: Actions.changePasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 5,
    paddingBottom: 5,
  },
  header: {
    flex: 1,
    alignContent: 'stretch',
    height: 50,
  },
  mainheading: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  h2: {
    fontSize: 15,
    alignSelf: 'center',
  },
  checkbox: {
    borderRadius: 1,
  },
  checkboxText: {
    alignSelf: 'center',
    fontSize: 15,
  },
});
