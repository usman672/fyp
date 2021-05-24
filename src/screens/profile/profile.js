import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import {
  signupAction,
  imageUploadAction,
  editProfileAction,
} from '../../redux/actions/userActions';
import Dropdown from '../../components/input/dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '../../libs/storage';
var Spinner = require('react-native-spinkit');
class Profile extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      username: '',
      description: '',
      isusername: true,
      isdescription: false,
      setting: false,
      image_code: '',
      isimage: false,
      editable: true,
      image_path: '',
      image: '',
      category: '',
      imageDummy: require('../../assets/hostel.jpg'),
      hostelCategory: [
        { label: 'maleHostel', value: 0 },
        { label: 'femaleHostel', value: 1 },
      ],
    };
    // if (this.props.route.params.setting) {
    //   this.setData();
    // }
  }

  setData = async () => {
    const user = await storage._retrieveData('user');
    this.onChangeUsername(JSON.parse(user).username);
    this.setState({ image_path: JSON.parse(user).image_url });
    this.setState({ image: JSON.parse(user).image_url });
    this.setState({ description: JSON.parse(user).description });
  };
  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };
  editProfile = async () => {
    this.buttonClicked(true);
    if (this.state.isimage) {
      const res_image = await this.props.imageUploadAction({
        image_type: 'user',
        image: this.state.image_code,
      });
      this.setState({ image_path: res_image.data.image });
    }
    const res = await this.props.editProfileAction({
      username: this.state.username,
      description: this.state.description,
      image_url: this.state.image_path,
    });
    this.buttonClicked(false);
    if (res.code === 0) {
      this.props.navigation.navigate('settings');
    }
  };
  pickImage = () => {
    const options = {
      title: 'Image Picker',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          image_code: 'data:' + response.type + `;base64,${response.data}`,
          image: response.uri,
          isimage: true,
        });
      }
    });
  };
  onChangeUsername = (username) => {
    if (username) {
      this.setState({ username: username, isusername: true });
    } else {
      this.setState({ isusername: false });
    }
  };
  onChangeDescription = (description) => {
    if (description) {
      this.setState({ description: description, isdescription: true });
    } else {
      this.setState({ isdescription: false, description: description });
    }
  };
  checkField = () => {
    if (this.state.isusername && !this.state.isCliked) {
      return true;
    } else {
      return false;
    }
  };
  goToAddress = async () => {
    //this.buttonClicked(true);
    if (this.state.isimage) {
      const res_image = await this.props.imageUploadAction({
        image_type: 'user',
        image: this.state.image_code,
      });
      console.log(res_image, 'popopopop');

      if (res_image.code === 0) {
        this.setState({ image_path: res_image.data.image });
      }
    }
    console.log(this.state.image_path, 'imageeee');
    this.props.navigation.navigate('EditAddress', {
      name: this.state.username,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image_path,
      type: this.props.route.params.type,
      setting: true,
    });
    // const res = await this.props.signupAction({
    //   email: this.props.route.params.email,
    //   username: this.props.route.params.username,
    //   password: this.props.route.params.password,
    //   phone: this.props.route.params.number,
    //   countryCode: '1',
    //   description: this.state.description,
    //   image_url: this.state.image_path,
    //   fireBaseToken: fcm,
    //   is_Seller: true,
    //   is_Buyer: false,
    // });
    // this.buttonClicked(false);
    // if (res.code === 0) {
    //   Alert.alert('Success', res.message);
    //   storage._storeData('token', res.data.token.toString());
    //   this.props.navigation.navigate('r', {
    //     setting: false,
    //     number: this.props.route.params.number,
    //     email: this.props.route.params.email,
    //     password: this.props.route.params.password,
    //     username: this.props.route.params.username,
    //     country: '1',
    //   });
    // } else {
    //   setTimeout(() => {
    //     Alert.alert('Error', res.message);
    //   }, 500);
    // }
  };
  removeImage = () => {
    this.setState({
      image_code: false,
      image: false,
      isimage: false,
    });
  };
  onSelect = (user) => {
    console.log(user, 'userrrrrr');
    this.setState({ category: this.state.hostelCategory[user].label });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.view}>
        <SettingHeader
          title="Profile"
          backgroundColor={color.black}
          color={color.white}
        />

        <ScrollView>
          <View>
            <View style={styles.imageRound}>
              <TouchableOpacity
                style={styles.plusIcon}
                onPress={() => {
                  this.pickImage();
                }}>
                {this.state.image === '' ? (
                  <ImageBackground
                    imageStyle={{ borderRadius: 62.5 }}
                    style={[styles.image]}
                    source={this.state.imageDummy}>
                    <TouchableOpacity
                      style={styles.iconOpacity}
                      onPress={() => this.pickImage()}>
                      <Icon name="camera" size={20} color={color.brandRed} />
                    </TouchableOpacity>
                  </ImageBackground>
                ) : (
                  <ImageBackground
                    imageStyle={{ borderRadius: 62.5 }}
                    style={[styles.image]}
                    source={{ uri: this.state.image }}>
                    <TouchableOpacity
                      style={styles.iconOpacity}
                      onPress={() => this.pickImage()}>
                      <Icon name="camera" size={20} color={color.brandRed} />
                    </TouchableOpacity>
                  </ImageBackground>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.field_heading}>
              {this.props.route.params.type == 'shop'
                ? 'Shop Name'
                : 'Hostel Name'}
            </Text>
            <TextInput
              style={styles.username}
              value={this.state.username}
              onChangeText={this.onChangeUsername}
            />
            <Text style={styles.field_heading}>DETAIL DESCRIPTION</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={12}
              value={this.state.description}
              onChangeText={this.onChangeDescription}
            />
            {this.props.route.params.type == 'hostel' && (
              <View
                style={[
                  Platform.OS === 'ios' ? { zIndex: 1111 } : {},
                  { marginTop: 10, width: '98%', alignSelf: 'center' },
                ]}>
                <Dropdown
                  zndex={1111}
                  options={this.state.hostelCategory}
                  default={this.state.category}
                  onSelect={this.onSelect}
                  placeholder="Select Category"
                />
              </View>
            )}
            {!this.props.route.params.setting ? (
              <View>
                <TouchableOpacity
                  style={[
                    this.checkField()
                      ? s.buttonbox(color.black, color.black, 'flex-end', '30%')
                      : s.buttonbox(color.gray, color.gray, 'flex-end', '30%'),
                    { flexDirection: 'row' },
                  ]}
                  disabled={!this.checkField()}
                  onPress={() => this.goToAddress()}>
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
                    <Text style={s.buttonText}>Next</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={[
                    this.checkField()
                      ? s.buttonbox(color.black, color.black, 'flex-end', '30%')
                      : s.buttonbox(color.gray, color.gray, 'flex-end', '30%'),
                    { flexDirection: 'row' },
                  ]}
                  disabled={!this.checkField()}
                  onPress={this.editProfile}>
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
                    <Text style={s.buttonText}>Update</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  signupAction,
  imageUploadAction,
  editProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  header: {
    alignContent: 'stretch',
    backgroundColor: color.primary,
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 13,
    color: color.white,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  imagegrid: {
    flexDirection: 'row',
    top: 10,
    bottom: 10,
    backgroundColor: color.white,
    height: 50,
    marginBottom: 10,
  },
  image: {
    height: 125,
    width: 125,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  field_heading: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
    color: color.gray,
    fontSize: 15,
  },
  username: {
    backgroundColor: color.white,
    marginTop: 5,
    marginBottom: 10,
    height: 60,
    alignItems: 'center',
    padding: 15,
    fontSize: 15,
  },
  input: {
    backgroundColor: color.white,
    fontSize: 15,
    height: 200,
    padding: 15,
  },
  imageRound: {
    marginTop: 30,
  },
  iconOpacity: {
    height: 30,
    width: 30,
    left: 90,
    bottom: 10,
    backgroundColor: color.black,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
