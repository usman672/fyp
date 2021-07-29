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
import storage from '../../libs/storage';

import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import {
  verifyEmailAndUsernameAction,
  imageUploadAction,
  signupAction,
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
    this.setSeller();
  }
  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };
  setSeller = async () => {
    console.log('user', 'erferjiofjeroijferjggerjggtrtrvtrgrnho');

    const user = await storage._retrieveData('user');
    console.log(user, 'erferjiofjeroijferjggerjggtrtrvtrgrnho');

    await this.setState({
      username: JSON.parse(user).data.user.name,
    });
    await this.setState({
      image: JSON.parse(user).data.user.photo,
      image_path: JSON.parse(user).data.user.photo,

      email: JSON.parse(user).data.user.email,
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

    const res = await this.props.signupAction('update', {
      name: this.state.username,
      photo: this.state.image_path,
    });
    this.buttonClicked(false);
    if (res.success) {
      Alert.alert('Success', 'Updated Successfully');
    } else {
      setTimeout(() => {
        Alert.alert('Error', 'Something went wrong with data');
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
          heading="."
          placeholder="name@example.com"
          ref="email"
          value={this.state.email}
          isValid={this.state.isemail}
          onChange={this.onChangeEmail}
        />
        <Input
          heading="User Name"
          placeholder="4-20 character username"
          ref="username"
          value={this.state.username}
          isValid={this.state.isusername}
          onChange={this.onChangeusername}
        />
        <TouchableOpacity
          style={[
            s.buttonbox(color.black, color.black, 'flex-end', '30%'),
            { flexDirection: 'row' },
          ]}
          onPress={() => this.signup()}
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
            <Text style={s.buttonText}>Update</Text>
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
  signupAction,
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
