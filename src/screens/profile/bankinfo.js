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
import SettingHeader from '../../components/header/settingHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import { s, color } from '../../libs/styles';
import { Input } from '../../components';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import CustomSeparator from '../../components/separators/customSeparator';
import storage from '../../libs/storage';

var Spinner = require('react-native-spinkit');

class BankInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCliked: false,
      accountHolderName: '',
      bankRoutingNumber: '',
      checkingAccountNumber: '',
      userId: '',
      setting: this.props.route.params.setting,
      navigate: 'login',
    };
    if (this.props.route.params.setting) {
      this.setData();
    }
  }
  setData = async () => {
    const user = await storage._retrieveData('user');
    if (this.props.route.params.bankEmpty) {
      this.setState({ setting: false });
      this.props.route.params.setting = false;
      this.setState({ navigate: 'settings' });
    }
    await this.setState({
      checkingAccountNumber: JSON.parse(user).bankData.account_number,
      bankRoutingNumber: JSON.parse(user).bankData.routing_number,
      accountHolderName: JSON.parse(user).bankData.account_holder_name,
    });
  };

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };

  saveBankAccount = async () => {
    this.buttonClicked(true);
    const res = await this.props.saveBankAccountAction({
      routing_number: this.state.bankRoutingNumber,
      account_number: this.state.checkingAccountNumber,
      account_holder_name: this.state.accountHolderName,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
      this.props.navigation.navigate(this.state.navigate);
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };
  onChangeCheckingAccountNumber = (newText) => {
    if (newText) {
      this.setState({ checkingAccountNumber: newText });
    } else {
      this.setState({ checkingAccountNumber: newText });
    }
  };
  onChangeRoutingNumber = (newText) => {
    if (newText) {
      this.setState({ bankRoutingNumber: newText });
    } else {
      this.setState({ bankRoutingNumber: newText });
    }
  };
  onChangeAccountHolderName = (newText) => {
    if (newText) {
      this.setState({ accountHolderName: newText });
    } else {
      this.setState({ accountHolderName: newText });
    }
  };
  editBank = async () => {
    this.buttonClicked(true);
    const res = await this.props.updateBankInfoAction({
      account_holder_name: this.state.accountHolderName,
      routing_number: this.state.bankRoutingNumber,
      account_number: this.state.checkingAccountNumber,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
      setTimeout(() => {
        Alert.alert('SuccessFully Updated');
      }, 500);
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };
  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={s.scrollview} keyboardShouldPersistTaps="always">
        <View style={styles.view}>
          <View style={styles.view}>
            <SettingHeader
              title="FOR SELLER TO RECEIVE EARNINGS"
              backgroundColor={color.black}
              color={color.white}
            />

            <Text style={styles.mainheading}>
              We will only use your bank information when you request to cash
              out
            </Text>
            <View>
              <Input
                heading="BANK ACCOUNT HOLDER'S NAME"
                placeholder="Elberts John"
                value={this.state.accountHolderName}
                onChange={this.onChangeAccountHolderName}
              />
              <Input
                heading="BANK ROUTING NUMBER"
                placeholder="*******112"
                value={this.state.bankRoutingNumber}
                onChange={this.onChangeRoutingNumber}
              />
              <Input
                heading="BANK CHECKING ACCOUNT NUMBER"
                placeholder="*******112"
                value={this.state.checkingAccountNumber}
                onChange={this.onChangeCheckingAccountNumber}
              />
            </View>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              marginTop: 10,
              textDecorationLine: 'underline',
            }}
          >
            What is a bank rounting number?
          </Text>
          {!this.state.setting ? (
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  marginTop: '8%',
                }}
              >
                IF NOT A SELLER ?
              </Text>
              <TouchableOpacity
                style={s.buttonbox(color.black, color.black, 'center', '90%')}
                onPress={() =>
                  this.props.navigation.navigate(this.state.navigate)
                }
              >
                <Text style={s.buttonText}>Skip</Text>
              </TouchableOpacity>
              <View style={styles.orView}>
                <CustomSeparator
                  heightt={0.5}
                  colorr={color.lightGrey2}
                  margintop={'0%'}
                  width={'40%'}
                />
                <Text style={styles.orText}>&nbsp;&nbsp;&nbsp;or</Text>
                <CustomSeparator
                  heightt={0.5}
                  colorr={color.lightGrey2}
                  margintop={'0%'}
                  width={'40%'}
                />
              </View>

              <TouchableOpacity
                onPress={this.saveBankAccount}
                style={[
                  this.state.isCliked
                    ? s.buttonbox(color.gray, color.black, 'center', '90%')
                    : s.buttonbox(color.black, color.black, 'center', '90%'),
                  { flexDirection: 'row' },
                ]}
                disabled={this.state.isCliked}
              >
                {this.state.isCliked && (
                  <Spinner
                    style={s.buttonLoader}
                    isVisible={true}
                    size={20}
                    type="FadingCircleAlt"
                    color={color.brandRed}
                  />
                )}
                <Text style={s.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  marginTop: '10%',
                }}
              >
                IF NOT A SELLER ?
              </Text>

              <TouchableOpacity
                style={s.buttonbox(color.black, color.black, 'center', '90%')}
                onPress={() => this.props.navigation.navigate('settings')}
              >
                <Text style={s.buttonText}>Skip</Text>
              </TouchableOpacity>

              <View style={styles.orView}>
                <CustomSeparator
                  heightt={0.5}
                  colorr={color.lightGrey2}
                  margintop={'0%'}
                  width={'40%'}
                />
                <Text style={styles.orText}>&nbsp;&nbsp;&nbsp;or</Text>
                <CustomSeparator
                  heightt={0.5}
                  colorr={color.lightGrey2}
                  margintop={'0%'}
                  width={'40%'}
                />
              </View>
              <TouchableOpacity
                style={[
                  this.state.isCliked
                    ? s.buttonbox(color.gray, color.black, 'center', '90%')
                    : s.buttonbox(color.black, color.black, 'center', '90%'),
                  { flexDirection: 'row' },
                ]}
                onPress={this.editBank}
                disabled={this.state.isCliked}
              >
                {/* <View style={{ alignSelf: 'center', flexDirection: 'row' }}> */}
                {this.state.isCliked && (
                  <Spinner
                    style={s.buttonLoader}
                    isVisible={true}
                    size={20}
                    type="FadingCircleAlt"
                    color={color.brandRed}
                  />
                )}
                <Text style={s.buttonText}>Edit</Text>
                {/* </View> */}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  saveBankAccountAction: Actions.saveBankAccountAction,
  updateBankInfoAction: Actions.updateBankInfoAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(BankInfo);

const styles = StyleSheet.create({
  header: {
    alignContent: 'stretch',
    height: 55,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 14,
    padding: 10,
    backgroundColor: '#6b7fea',
    color: 'white',
  },
  orView: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },
  skipText: {
    marginRight: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#6b7fea',
    color: 'white',
    fontSize: 15,
    padding: 5,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  skipHeading: {
    fontSize: 13,
    marginLeft: 5,
  },
  mainheading: {
    paddingBottom: 10,
    margin: 10,
    fontSize: 15,
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
