import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { s, color } from '../../libs/styles';
import { Input, PasswordInput } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import { forgetPasswordAction } from '../../redux/actions/userActions';
import Actions from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

class ForgetPassword extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      isnumber: false,
    };
  }
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
    if (this.state.isnumber) {
      return true;
    }
  };
  sendOtp = async () => {
    const res = await this.props.forgetPasswordAction({
      countryCode: '1',
      phone: this.state.number,
    });
    if (res.code === 0) {
      AsyncStorage.setItem('number', this.state.number);
      this.props.navigation.navigate('OtpCode', {
        forgetPassword: true,
        number: this.state.number,
      });
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={[s.scrollview]} keyboardShouldPersistTaps="always">
        <View style={styles.view}>
          <SettingHeader
            title="Forgot Password"
            backgroundColor={color.black}
            color={color.white}
          />
          <View style={styles.page}>
            <View>
              <Text style={styles.mainheading}>Forgot password?</Text>
              <Text style={styles.heading}>
                We'll send you a code to reset your password.
              </Text>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={styles.heading}>Enter your mobile number</Text>
              <View style={styles.cell_field}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    paddingBottom: 10,
                  }}>
                  +1
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
                      color="black"
                    />
                  </View>
                ) : (
                  <View>
                    <Text />
                    <Text />
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity
              style={
                this.checkField()
                  ? s.buttonbox(color.black, color.black, 'center', '90%')
                  : s.buttonbox(color.gray, color.gray, 'center', '90%')
              }
              disabled={!this.state.isnumber}
              onPress={() => this.sendOtp()}>
              <Text style={s.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  forgetPasswordAction: Actions.forgetPasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

const styles = StyleSheet.create({
  mainheading: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
  },
  heading: {
    margin: 5,
    fontSize: 15,
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
  cell_field: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 1,
    borderRadius: 10,
  },
  page: {
    marginLeft: 10,
  },
});
