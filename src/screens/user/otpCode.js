import React, { Component, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import {
  verifyOtpAction,
  sendOtpAction,
  signupAction,
} from '../../redux/actions/userActions';
var Spinner = require('react-native-spinkit');

class OtpCode extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      otp: '',
      isotp: false,
    };
  }

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };

  onChangeOtp = (otp) => {
    if (otp.length === 4) {
      this.setState({ otp: otp, isotp: true });
    } else {
      this.setState({ isotp: false });
    }
  };

  checkField = () => {
    if (this.state.isotp && !this.state.isCliked) {
      return true;
    }
  };

  resendCode = async () => {
    this.buttonClicked(true);
    const res = await this.props.sendOtpAction({
      countryCode: '+92',
      phone: this.props.route.params.number,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };

  verifyotp = async () => {
    this.buttonClicked(true);
    const res = await this.props.verifyOtpAction({
      countryCode: '+92',
      phone: this.props.route.params.number,
      code: this.state.otp,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
      const res = await this.props.signupAction('signup', {
        email: this.props.route.params.email,
        name: this.props.route.params.username,
        password: this.props.route.params.password,
        photo: this.props.route.params.photo,
        contactNumber: this.props.route.params.number.toString(),
        role: 'publisher',
      });
      this.buttonClicked(false);
      if (res.success) {
        console.log(res);
        Alert.alert('Success', 'SignUp Successfully');
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'login',
              },
            ],
          }),
        );
      } else {
        setTimeout(() => {
          Alert.alert('Error', res);
        }, 500);
      }

      this.props.navigation.navigate('login');
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.view}>
        <SettingHeader
          title="OTP Code"
          backgroundColor={color.black}
          color={color.white}
        />
        <View style={styles.form}>
          <Text style={styles.field_heading}>
            Enter the 4-digit code sent to you at
          </Text>
          <Text style={styles.field_number}>
            +1{this.props.route.params.number}
          </Text>
          <OTPInputView
            style={{ width: '50%', height: 20, margin: 10 }}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              this.onChangeOtp(code);
            }}
          />
          <TouchableOpacity
            style={[
              s.buttonbox(color.gray, color.gray, 'flex-start', '30%'),
              styles.resend,
            ]}
            onPress={() => this.resendCode()}
          >
            <Text style={styles.resend_btn_font}>Resend code</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            this.checkField()
              ? s.buttonbox(color.black, color.black, 'flex-end', '30%')
              : s.buttonbox(color.gray, color.gray, 'flex-end', '30%'),
            { flexDirection: 'row' },
          ]}
          disabled={!this.checkField()}
          onPress={() => this.verifyotp()}
        >
          <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
            {this.state.isCliked && (
              <Spinner
                style={s.buttonLoader}
                isVisible={true}
                size={20}
                type="FadingCircleAlt"
                color={color.brandRed}
              />
            )}
            <Text style={styles.btn_font}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  verifyOtpAction,
  sendOtpAction,
  signupAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpCode);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'flex-start',
  },
  form: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: color.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  field_heading: {
    alignSelf: 'flex-start',
    fontFamily: 'Avenir',
    margin: 10,
    color: 'black',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  buttonResend: {
    borderWidth: 1,
    width: 120,
    height: 40,
    margin: 30,
  },
  resend_btn_font: {
    alignSelf: 'center',
    padding: 7,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: color.white,
  },
  borderStyleHighLighted: {
    borderColor: 'blue',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
  btn_font: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
  },
  // button: {
  //   alignSelf: 'flex-end',
  //   borderRadius: 6,
  //   borderWidth: 2,
  //   borderColor: '#6b7fea',
  //   paddingHorizontal: 20,
  //   backgroundColor: '#6b7fea',
  //   margin: 20,
  //   marginTop: 50,
  // },
  field_number: {
    fontFamily: 'Avenir',
    padding: 4,
    fontSize: 30,
  },
});
