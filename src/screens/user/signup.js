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
import Icon2 from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { s, color } from '../../libs/styles';
import { Input, PasswordInput } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import {
  verifyEmailAndUsernameAction,
  imageUploadAction,
} from '../../redux/actions/userActions';

var Spinner = require('react-native-spinkit');

class SignUp extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.togglePassword = this.togglePassword.bind(this);

    this.state = {
      isCliked: false,
      username: '',
      email: '',
      password: '',
      imageDummy: require('../../assets/dummy.png'),
      ispassword: false,
      image_code: '',
      isimage: false,
      image_path: '',
      image: '',

      isusername: false,
      isemail: false,
      showPassword: true,
    };
  }
  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };
  pickImage = async () => {
    const options = {
      title: 'Image Picker',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const res_image = await this.props.imageUploadAction({
          image_type: 'user',
          image: 'data:' + response.type + `;base64,${response.data}`,
        });
        console.log(res_image);
        this.setState({ image_path: res_image.data.image });

        this.setState({
          image: response.uri,
          isimage: true,
        });
      }
    });
  };
  onChangeusername = (newText) => {
    if (newText.length > 3) {
      this.setState({ username: newText, isusername: true });
    } else {
      this.setState({ isusername: false });
    }
  };
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
  signup = async () => {
    this.buttonClicked(true);
    const fcm = await AsyncStorage.getItem('device_token');

    const res = await this.props.signupAction({
      email: this.props.route.params.email,
      name: this.props.route.params.username,
      password: this.props.route.params.password,
    });
    this.buttonClicked(false);
    if (res.success) {
      Alert.alert('Success', 'SignUp Successfully');
      storage._storeData('token', res.data.token.toString());
      this.props.navigation.navigate('login');
    } else {
      setTimeout(() => {
        Alert.alert('Error', res);
      }, 500);
    }
  };

  onChangePassword = (password) => {
    if (password.length > 6) {
      this.setState({ password: password, ispassword: true });
    } else {
      this.setState({ ispassword: false });
    }
  };
  checkField = () => {
    if (
      this.state.ispassword &&
      this.state.isusername &&
      this.state.isemail &&
      !this.state.isCliked
    ) {
      return true;
    }
  };

  checkuser = async () => {
    console.log(this.state.image_path);
    this.props.navigation.navigate('Otp', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      photo: this.state.image_path,
    });
    // this.buttonClicked(true);
    // const res = await this.props.verifyEmailAndUsernameAction({
    //   email: this.state.email,
    //   username: this.state.username,
    // });
    // this.buttonClicked(false);
    // if (res.code == 0) {
    //   this.props.navigation.navigate('Otp', {
    //     email: this.state.email,
    //     username: this.state.username,
    //     password: this.state.password,
    //   });
    // } else {
    //   Alert.alert('Error', res.message);
    // }
  };

  render() {
    return (
      <ScrollView style={[s.scrollview]} keyboardShouldPersistTaps="always">
        <SettingHeader
          title="SignUp"
          backgroundColor={color.black}
          color={color.white}
        />
        <View style={styles.imageRound}>
          <TouchableOpacity
            style={styles.plusIcon}
            onPress={() => {
              this.pickImage();
            }}
          >
            {this.state.image === '' ? (
              <ImageBackground
                imageStyle={{ borderRadius: 62.5 }}
                style={[styles.image]}
                source={this.state.imageDummy}
              >
                <TouchableOpacity
                  style={styles.iconOpacity}
                  onPress={() => this.pickImage()}
                >
                  <Icon2 name="camera" size={20} color={color.brandRed} />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{ borderRadius: 62.5 }}
                style={[styles.image]}
                source={{ uri: this.state.image }}
              >
                <TouchableOpacity
                  style={styles.iconOpacity}
                  onPress={() => this.pickImage()}
                >
                  <Icon2 name="camera" size={20} color={color.brandRed} />
                </TouchableOpacity>
              </ImageBackground>
            )}
          </TouchableOpacity>
        </View>

        <Input
          heading="Your Email"
          placeholder="name@example.com"
          ref="email"
          isValid={this.state.isemail}
          onChange={this.onChangeEmail}
        />
        <Input
          heading="Your Username"
          placeholder="4-20 character username"
          ref="username"
          isValid={this.state.isusername}
          onChange={this.onChangeusername}
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
          style={[
            this.checkField()
              ? s.buttonbox(color.black, color.black, 'flex-end', '30%')
              : s.buttonbox(color.gray, color.gray, 'flex-end', '30%'),
            { flexDirection: 'row' },
          ]}
          disabled={!this.checkField()}
          onPress={() => this.checkuser()}
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
            <Text style={s.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  verifyEmailAndUsernameAction,
  imageUploadAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
    justifyContent: 'flex-end',
    alignSelf: 'center',
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
