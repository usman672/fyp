/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import stripe from 'tipsi-stripe';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import Actions from '../../redux/actions';
import storage from '../../libs/storage';
var Spinner = require('react-native-spinkit');

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      isCardAdded: false,
      cardData: {},
      isUpdate: this.props.route.params.setting,
    };
  }

  componentDidMount() {
    if (this.state.isUpdate) {
      this.getCard();
    }
  }

  checkField = () => {
    if (
      this.state.isCardAdded &&
      !this.state.isCliked
    ) {
      return true;
    }
  };

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };

  getCard = async () => {
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);
    if (user.bankData.card) {
      this.setState({
        cardData: user.bankData.card,
      });
    }
  };

  addCard = async () => {
    const token = await stripe.paymentRequestWithCardForm({
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {},
      },
    });
    const tokenId = token.tokenId;
    this.buttonClicked(true);
    const res = await this.props.addCardAction(tokenId, this.state.isUpdate);
    this.buttonClicked(false);
    if (res.code === 0) {
      this.setState({
        isCardAdded: true,
        cardData: res.data.card,
      });
    }
  };
  render() {
    return (
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
        <View style={styles.view}>
          <SettingHeader
            title="TO BUY, ADD YOUR CARD"
            backgroundColor={color.black}
            color={color.white}
          />
          <Text style={styles.field_heading}>YOUR DEFAULT CARD TO BUY</Text>
          <View style={styles.listView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 35,
              }}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  if (!this.state.cardData.last4 || this.state.isUpdate) {
                    this.addCard();
                  }
                }}>
                <Icon
                  name="pluscircleo"
                  size={20}
                  color={color.primary}
                  style={{
                    alignSelf: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
                <Text style={styles.listmaintext}>
                  {this.props.isUpdate ? 'Update Card' : 'Add New Card'}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.cardData.last4 && (
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  justifyContent: 'space-between',
                  marginTop: 20,
                  paddingBottom: 10,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    name="checkcircle"
                    size={20}
                    color={color.brandRed}
                    style={{
                      alignSelf: 'center',
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <Text style={styles.listtext}>
                    {'............' + this.state.cardData.last4}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View>
            {!this.state.isUpdate && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('BankInfo', {
                    setting: this.props.route.params.setting,
                  });
                }}
                style={[
                  this.checkField()
                    ? s.buttonbox(color.black, color.black, 'flex-end', '25%')
                    : s.buttonbox(color.gray, color.gray, 'flex-end', '25%'),
                  { flexDirection: 'row' },
                ]}
                disabled={!this.checkField()}>
                {this.state.isCliked && (
                  <Spinner
                    style={s.buttonLoader}
                    isVisible={true}
                    size={20}
                    type="FadingCircleAlt"
                    color={color.brandRed}
                  />
                )}
                <Text style={s.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
          {/*} ) : (
            <View>
              <TouchableOpacity
                style={s.buttonbox(color.black, color.black, 'flex-end', '25%')}
                onPress={() => this.props.navigation.navigate('settings')}>
                <Text style={s.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addCardAction: Actions.addCardAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: 'white',
    height: 50,
  },
  headerText: {
    margin: 10,
    // color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  field_heading: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    color: 'gray',
  },
  listView: {
    // flexDirection: 'row',
    top: 10,
    bottom: 10,
    backgroundColor: 'white',
    // height: 50,
    marginBottom: 10,
  },
  listheading: {
    alignSelf: 'flex-start',
    color: '#6b7fea',
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  listtext: {
    fontSize: 20,
    alignSelf: 'center',
    color: color.brandRed,
  },
  listmaintext: {
    fontSize: 20,
    alignSelf: 'center',
    color: color.primary,
  },
});
