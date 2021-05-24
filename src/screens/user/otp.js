import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import { sendOtpAction } from '../../redux/actions/userActions';

var Spinner = require('react-native-spinkit');

class Otp extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      number: '',
      isnumber: false,
      borderBottomWidth: 2,
      borderBottomColor: color.lightGrey,
    };
  }

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };

  onFocus() {
    this.setState({
      borderBottomColor: color.primary,
      borderBottomWidth: 2,
    });
  }
  onBlur() {
    this.setState({
      borderBottomColor: '',
      borderBottomWidth: 0,
    });
  }

  onNumber = (number) => {
    if (number.length === 10) {
      this.setState({ number: number, isnumber: true });
    } else {
      this.setState({ isnumber: false });
    }
  };

  checkField = () => {
    if (this.state.isnumber && !this.state.isCliked) {
      return true;
    }
  };

  cellnumber = async () => {
  

    this.buttonClicked(true);
    const res = await this.props.sendOtpAction({
      countryCode: '+92',
      phone: this.state.number,
      isSigningUp: true,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
      this.props.navigation.navigate('OtpCode', {
        number: this.state.number,
        email: this.props.route.params.email,
        password: this.props.route.params.password,
        username: this.props.route.params.username,
        photo:this.props.route.params.photo,
      });
    } else {
      setTimeout(() => {
        Alert.alert('Error', 'res.message');
      }, 500);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.view}>
        <SettingHeader
          title="Verification"
          backgroundColor={color.black}
          color={color.white}
        />

        <KeyboardAvoidingView style={styles.form}>
          <Text style={styles.field_heading}>Enter Mobile Number</Text>
          <View style={styles.cell_field}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                paddingBottom: 10,
              }}>
              +92
            </Text>
            <TextInput
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              style={[
                styles.input,
                {
                  borderBottomWidth: this.state.borderBottomWidth,
                  borderBottomColor: this.state.borderBottomColor,
                },
              ]}
              ref="number"
              keyboardType="numeric"
              placeholder="(000)-000-0000"
              placeholderTextColor="gray"
              onChangeText={(number) => this.onNumber(number)}
              maxLength={10}
            />
            {this.state.isnumber ? (
              <View>
                <Icon
                  style={{ alignItems: 'flex-end', padding: 10 }}
                  name="check"
                  size={20}
                  color={color.black}
                />
              </View>
            ) : (
              <View>
                <Text />
                <Text />
              </View>
            )}
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text> Only for verification purpose.</Text>
            <Text> We will send you a code to verify your number</Text>
          </View>
          <TouchableOpacity
            style={[
              this.checkField()
                ? s.buttonbox(color.black, color.black, 'flex-end', '30%')
                : s.buttonbox(color.gray, color.gray, 'flex-end', '30%'),
              { flexDirection: 'row' },
            ]}
            disabled={!this.checkField()}
            onPress={() => this.cellnumber()}>
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
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  sendOtpAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Otp);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  form: {
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  field_heading: {
    alignSelf: 'flex-start',
    fontFamily: 'Avenir',
    marginLeft: 10,
    marginBottom: 10,
    color: 'black',
  },
  cell_field: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginLeft: 10,
    paddingBottom: 1,
    borderRadius: 10,
  },
  input: {
    borderColor: 'black',
    width: '85%',
    height: 50,
    borderBottomColor: 'gray',
    fontFamily: 'Avenir',
    fontSize: 20,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6b7fea',
    paddingHorizontal: 20,
    backgroundColor: '#6b7fea',
    margin: 20,
    marginTop: 50,
  },
  btn_font: {
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
    color: 'white',
    textAlign: 'center',
  },
});
