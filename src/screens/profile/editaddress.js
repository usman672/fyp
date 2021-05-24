import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
var Spinner = require('react-native-spinkit');
import { s, color, neomorph } from '../../libs/styles';
import { Input, Dropdown } from '../../components';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import storage from '../../libs/storage';

import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder';

var isLoading = false;
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      selectedStateIndex: 0,
      selectedCountryIndex: 0,
      street: '',
      isStreet: false,
      address1: '',
      isAddress1: false,
      address2: '',
      isaddress2: false,
      zip: '',
      isZip: false,
      city: '',
      isCity: false,
      state: '',
      isState: false,
      country: 0,
      isCountry: false,
      radio: false,
      lng: '',
      lat: '',
      countryPlaceholder: 'Select Country',
      statePlaceholder: 'Select State',
      statesList: [],
      data: [
        {
          value: 'Banana',
        },
        {
          value: 'Mango',
        },
        {
          value: 'Pear',
        },
      ],
      countriesList: [],
    };
    this.getCountries();
    console.log(this.props.route.params.image, 'oooooo');
  }
  getCountries = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        Geocoder.fallbackToGoogle('AIzaSyBX3_0ZK5248-GNQTONPB_t-Z2GaB5KPwY'); // use a valid API key

        console.log(location);
        var NY = {
          lat: location.latitude,
          lng: location.longitude,
        };

        Geocoder.geocodePosition(NY)
          .then((res) => {
            console.log(res, 'res');
            var str = res[0].formattedAddress;
            str = str.replace(',', '');
            str = str.replace(',', '');
            str = str.replace(',', '');
            str = str.replace(',', '');
            str = str.replace(',', '');
            this.setState({
              address1: str,
              city: res[0].locality,
              street: res[0].subLocality,
              lat: NY.lat,
              lng: NY.lng,
            });

            console.log(
              this.props.route.params.name,
              'name',
              this.props.route.params.description,
              'description',
              this.props.route.params.category,
              'category',
              this.props.route.params.image,
              'image url',
              this.state.street,
              'Street',
              this.state.city,
              'Address',
              this.state.address1,
              ' Town',
            );
            // res is an Array of geocoding object (see below)
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };
  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };
  editAddress = async () => {
    this.buttonClicked(true);
    const res = await this.props.editAddressAction({
      address1: this.state.address1,
      address2: this.state.address2,
      zipCode: this.state.zip,
      city: this.state.city,
      state: this.state.state,
      street: this.state.street,
      country: this.state.country,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
      this.props.navigation.navigate('MyAddresses');
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };
  saveAddress = async () => {
    this.buttonClicked(true);
    
    if (this.props.route.params.type == 'hostel') {
      const res = await this.props.saveAddressAction({
        address: this.state.address1,
        hostelType: this.props.route.params.category,
        type: this.props.route.params.type,
        photo: this.props.route.params.image,
        description: this.props.route.params.description,
        name: this.props.route.params.name,
        longitude: this.state.lng,
        latitude: this.state.lat,
        city: this.state.city,
        town: this.state.street,
      });
      console.log(res)
       this.buttonClicked(false);
    if (res.success) {
      setTimeout(() => {
        Alert.alert('Error', 'Hostel Added Successfully');
      }, 500);
    } else {
      setTimeout(() => {
        Alert.alert('Error', 'Something went wrong');
      }, 500);
    }
    } else if (this.props.route.params.type == 'shop') {
      const res = await this.props.saveAddressAction({
        address: this.state.address1,
        type: this.props.route.params.type,
        photo: this.props.route.params.image,
        description: this.props.route.params.description,
        name: this.props.route.params.name,
        longitude: this.state.lng,
        latitude: this.state.lat,
        city: this.state.city,
        town: this.state.street,
      });
       console.log(res)
     
       this.buttonClicked(false);
    if (res.success) {
      setTimeout(() => {
         Alert.alert(
          'Message',
          'Shop Added SuccessFully',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('userProfile'),
            },
          ],
          {cancelable: false},
        );
      }, 500);
    } else {
     Alert.alert(
          'Message',
          'Shop Added SuccessFully',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('userProfile'),
            },
          ],
          {cancelable: false},
        );}
    }
    console.log(res);
   
  };

  onChangeStreet = (newText) => {
    if (newText) {
      this.setState({ street: newText, isStreet: true });
    } else {
      this.setState({ street: newText, isStreet: false });
    }
  };
  onChangeaddress1 = (newText) => {
    if (newText) {
      this.setState({ address1: newText, isAddress1: true });
    } else {
      this.setState({ address1: newText, isAddress1: false });
    }
  };
  onChangeaddress2 = (newText) => {
    if (newText) {
      this.setState({ address2: newText, isaddress2: true });
    } else {
      this.setState({ address2: newText, isaddress2: false });
    }
  };
  onChangeuserzip = (newText) => {
    if (newText) {
      this.setState({ zip: newText, isZip: true });
    } else {
      this.setState({ zip: newText, isZip: false });
    }
  };
  onChangeusercity = (newText) => {
    if (newText) {
      this.setState({ city: newText, isCity: true });
    } else {
      this.setState({ city: newText, isCity: false });
    }
  };
  onChangeuserstate = (newText) => {
    if (newText) {
      this.setState({ state: newText, isState: true });
    }
  };
  onChangeusercountry = (newText) => {
    if (newText) {
      this.setState({ country: 'USA', isCountry: true });
    }
  };
  radio = () => {
    if (this.state.radio) {
      this.setState({ radio: false });
    } else {
      this.setState({ radio: true });
    }
  };
  checkField = () => {
    if (
      this.state.isCity &&
      this.state.isAddress1 &&
      this.state.isaddress2 &&
      this.state.isStreet
    ) {
      return true;
    } else {
      return false;
    }
  };
  setTrue = () => {};
  onSelectItem = (index, type) => {
    if (type === 'State') {
      this.setState({
        selectedStateIndex: index,
        state: index,
      });
    } else if (type === 'Country') {
      const statesList = this.props.countries[index].states.map((state) => {
        return { label: state.name, value: state.abbreviation };
      });
      this.setState({
        selectedStateIndex: index,
        country: this.props.countries[index].abbreviation,
        statesList: statesList,
      });
    }
  };
  render() {
    const { goBack } = this.props.navigation;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        enabled
        behavior="padding">
        <ScrollView style={s.scrollview} keyboardShouldPersistTaps="always">
          <View style={[styles.view]}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  name="close"
                  size={30}
                  color="gray"
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
            </View>
            {!this.props.route.params.setting ? (
              <View style={styles.mainheading}>
                <Text style={styles.h1}>Edit Address</Text>
                <Text style={styles.h2}>Please update your address</Text>
              </View>
            ) : (
              <View style={styles.mainheading}>
                <Text style={styles.h1}>Add Address</Text>
                <Text style={styles.h2}>Address Fetch From Google Map</Text>
              </View>
            )}

            <View
              style={[
                styles.fieldsview,
                Platform.OS === 'ios' ? { zIndex: 1 } : {},
              ]}>
              <Text style={{ margin: 12 }}>City</Text>

              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderColor: color.lightGrey1,
                  borderWidth: 0.3,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={this.state.city}
                />
              </View>
              <Text style={{ margin: 12 }}>Town</Text>

              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderColor: color.lightGrey1,
                  borderWidth: 0.3,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={this.state.street}
                />
              </View>
              <Text style={{ margin: 12 }}>Current Address</Text>

              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderColor: color.lightGrey1,
                  borderWidth: 0.3,
                  paddingBottom: 20,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  editable={false}
                  numberOfLines={5}
                  value={this.state.address1}
                />
              </View>
            </View>
            {this.props.route.params.setting ? (
              <View style={{}}>
                <TouchableOpacity
                  style={[
                    s.buttonbox(color.black, color.black, 'flex-end', '90%'),
                    ,
                    { flexDirection: 'row' },
                  ]}
                  // disabled={!this.checkField()}
                  onPress={this.saveAddress}>
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
                <TouchableOpacity
                  style={[
                    this.checkField()
                      ? s.buttonbox(color.black, color.black, 'flex-end', '90%')
                      : s.buttonbox(color.gray, color.gray, 'flex-end', '90%'),
                    { flexDirection: 'row' },
                  ]}
                  disabled={!this.checkField()}
                  onPress={this.editAddress}>
                  {this.state.isCliked && (
                    <Spinner
                      style={s.buttonLoader}
                      isVisible={true}
                      size={20}
                      type="FadingCircleAlt"
                      color={color.brandRed}
                    />
                  )}

                  <Text style={s.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* {this.props.route.params.setting ? (
          <View>
            <TouchableOpacity
              style={
                this.checkField()
                  ? s.buttonbox(color.black, color.black, 'flex-end', '90%')
                  : s.buttonbox(color.gray, color.gray, 'flex-end', '90%')
              }
              disabled={!this.checkField()}
              onPress={this.saveAddress}>
              <Text style={s.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={s.buttonbox(color.black, color.black, 'flex-end', '90%')}
              //disabled={!this.checkField()}
              onPress={this.editAddress}>
              <Text style={s.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        )} */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countries: state.AddressReducer.countries,
    countriesDropdown: state.AddressReducer.countriesDropdown,
  };
};

const mapDispatchToProps = {
  getCountriesAction: Actions.getCountriesAction,
  saveAddressAction: Actions.saveAddressAction,
  editAddressAction: Actions.editAddressAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: color.white,
    marginBottom: 5,
    paddingBottom: 5,
  },
  input: {
    backgroundColor: color.white,
    alignSelf: 'center',
    fontSize: 15,
    width: '95%',
    padding: 10,
  },
  header: {
    flex: 1,
    alignContent: 'stretch',
    height: 50,
  },
  mainheading: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
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
  fieldsview: {
    marginBottom: 50,
  },
});
