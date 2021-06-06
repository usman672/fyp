import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import ProfileHeader from '../../components/header/userProfileHeader';
import VerticalSeparator from '../../components/separators/verticalSeparator';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardView from 'react-native-cardview';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';
import storage from '../../libs/storage';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions, StackActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

import {
  logoutAction,
  getUserInfoAction,
} from '../../redux/actions/userActions';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    //this.userr();
    this.state = {
      image: '',
      isimage: false,
      isSeller: '',
      userName: '',
      isHostel: false,
      isShop: false,
      isJobs: false,
      hId: '',
      photo: '',
      name: '',
      longitude: '',
      latitude: '',
      address: '',
      user: '',
    };
    this.setSeller();
  }
  setSeller = async () => {
    const user = await storage._retrieveData('user');
    // console.log(user, 90909090);
    await this.setState({
      userName: JSON.parse(user).data.user.name,
    });
    await this.setState({
      image: JSON.parse(user).data.user.photo,
    });
    if (JSON.parse(user).data.hostel) {
      this.setState({
        isHostel: true,
      });
    }
    if (JSON.parse(user).data.shop) {
      this.setState({
        isShop: true,
      });
    }
    if (JSON.parse(user).data.job) {
      this.setState({ isJobs: true });
    }
  };
  signout = async () => {
    await this.props.logoutAction();
    this.props.navigation.navigate('Main');
  };
  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      this.setSeller();
    });
  }
  userr = async () => {
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);
    this.setState({ user: user });
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
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          image_code: `data:${response.type};base64,${response.data}`,
          image: response.uri,
          isimage: true,
        });
      }
    });
  };
  isSeller = async (type) => {
    const user = await storage._retrieveData('user');

    if (type == 0) {
      if (this.state.isHostel) {
        console.log('click');
        this.props.navigation.navigate('sellings', {
          name: JSON.parse(user).data.hostel.name,
          hId: JSON.parse(user).data.hostel._id,
          address: JSON.parse(user).data.hostel.address,
          photo: JSON.parse(user).data.hostel.photo,
          longitude: JSON.parse(user).data.hostel.longitude,
          latitude: JSON.parse(user).data.hostel.latitude,
        });
      } else this.props.navigation.navigate('Profile', { setting: false,type:'hostel' });
    } else if (type == 1) {
      if (this.state.isShop)
        this.props.navigation.navigate('notifications', {
          name: JSON.parse(user).data.shop.name,
          hId: JSON.parse(user).data.shop._id,
          address: JSON.parse(user).data.shop.address,
          photo: JSON.parse(user).data.shop.photo,
          longitude: JSON.parse(user).data.shop.longitude,
          latitude: JSON.parse(user).data.shop.latitude,
        });
      else
        this.props.navigation.navigate('Profile', {
          setting: false,
          type: 'shop',
        });
    } else if (type == 2) {
      if (this.state.isJobs)
        this.props.navigation.navigate('notifications', {
          name: JSON.parse(user).data.jobs.name,
          hId: JSON.parse(user).data.jobs._id,
          address: JSON.parse(user).data.jobs.address,
          photo: JSON.parse(user).data.jobs.photo,
          longitude: JSON.parse(user).data.jobs.longitude,
          latitude: JSON.parse(user).data.jobs.latitude,
        });
      else
        this.props.navigation.navigate('twillio', {
          setting: false,
          type: 'job',
        });
    }
  };
  render() {
    return (
      <View style={[s.scrollview]}>
        <ProfileHeader
          navigation={this.props.navigation}
          btnText="My Store"
          goTo="store"
        />
        <ScrollView style={[s.scrollview]}>
          <View style={s.scrollview}>
            <View style={styles.row}>
              <ImageBackground
                imageStyle={{ borderRadius: 50 }}
                style={styles.image}
                source={{ uri: this.state.image }}>
                <TouchableOpacity style={styles.editExternal} disabled={true} />
              </ImageBackground>
              <Text style={styles.titleSize}>{this.state.userName}</Text>
            </View>
            {this.state.isSeller === 'true' && (
              <CardView
                style={styles.infoCard}
                cardElevation={neomorph.elevation}
                cornerRadius={neomorph.cornerRadius}>
                <View style={styles.profileDetails}>
                  <View style={styles.detailsView}>
                    <Text style={styles.upperDetails}>
                      {this.state.user.followings}
                    </Text>
                    <Text style={styles.lowerDetails}> FOLLOWING</Text>
                  </View>
                  <View style={styles.detailsView}>
                    <Text style={styles.upperDetails}>
                      {this.state.user.followers}
                    </Text>
                    <Text style={styles.lowerDetails}> FOLLOWERS</Text>
                  </View>

                  <View style={styles.detailsView}>
                    <Text style={styles.upperDetails}>$48.66</Text>
                    <Text style={styles.lowerDetails}>BALANCE</Text>
                  </View>

                  <View style={styles.detailsView}>
                    <Text style={styles.upperDetails}>$55.45</Text>
                    <Text style={styles.lowerDetails}>IN PROGRESS</Text>
                  </View>
                </View>
              </CardView>
            )}

            <HorizontalSeparator />
            <View style={styles.row}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.user.avgRating}
                fullStarColor={'yellow'}
              />

              <Text style={styles.reviewsText}>
                {this.state.user.reviews} reviews
              </Text>
            </View>
            <View style={styles.optionsList}>
              <HorizontalSeparator />

              <View style={styles.optionsRow}>
                <View style={styles.optionsIcon}>
                  <FontAwesome color={color.lightGrey} name="home" size={30} />
                </View>
                <TouchableOpacity
                  style={styles.optionsName}
                  onPress={() => this.isSeller(0)}>
                  <View>
                    <Text style={styles.optionsTextFont}>
                      {this.state.isHostel ? 'Your Hostel' : 'Add Hostel'}
                    </Text>
                    <HorizontalSeparator />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.optionsRow}>
                <View style={styles.optionsIcon}>
                  <FontAwesome
                    color={color.lightGrey}
                    name="shopping-bag"
                    size={30}
                  />
                </View>
                <TouchableOpacity
                  style={styles.optionsName}
                  onPress={() => this.isSeller(1)}>
                  <View>
                    <Text style={styles.optionsTextFont}>
                      {this.state.isShop ? 'Your Shop' : 'Add Shop'}
                    </Text>
                    <HorizontalSeparator />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.optionsRow}>
                <View style={styles.optionsIcon}>
                  <FontAwesome
                    color={color.lightGrey}
                    name="question-circle"
                    size={30}
                  />
                </View>
                <TouchableOpacity
                  style={styles.optionsName}
                  onPress={() => this.isSeller(2)}>
                  <View>
                    <Text style={styles.optionsTextFont}>
                      {this.state.isJob ? 'Your Jobs' : 'Add Job'}
                    </Text>
                    <HorizontalSeparator />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.optionsRow}>
                <View style={styles.optionsIcon}>
                  <FontAwesome color={color.lightGrey} name="gear" size={30} />
                </View>
                <TouchableOpacity
                  style={styles.optionsName}
                  onPress={() => this.isSeller(2)}>
                  <View>
                    <Text style={styles.optionsTextFont}>Settings</Text>
                    <HorizontalSeparator />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.optionsRow}>
                <View style={styles.optionsIcon}>
                  <FontAwesome
                    color={color.lightGrey}
                    name="remove"
                    size={30}
                  />
                </View>
                <TouchableOpacity
                  style={styles.optionsName}
                  onPress={() => this.signout()}>
                  <View>
                    <Text style={styles.optionsTextFont}>Sign Out</Text>
                    <HorizontalSeparator />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <HorizontalSeparator />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.UserReducer.userInfo,
  };
};
const mapDispatchToProps = {
  logoutAction,
  getUserInfoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
  },
  optionsRow: {
    flexDirection: 'row',
    marginTop: '7%',
    marginLeft: '2%',
  },
  optionsIcon: {
    width: '10%',
  },
  optionsName: {
    marginLeft: 5,
    width: '90%',
  },
  profileDetails: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
  },
  detailsView: {
    width: '23%',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  lowerDetails: {
    marginTop: 5,
    fontSize: 11,
    color: color.white,
  },
  upperDetails: {
    fontWeight: 'bold',
    fontSize: 16,
    color: color.white,
  },
  reviewsText: {
    marginLeft: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },

  image: {
    height: 100,
    width: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconView: {},
  editExternal: {
    width: 100,
    position: 'absolute',
    height: 50,
    backgroundColor: color.transparent,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomColor: color.blackOpacity,
    borderBottomWidth: 25,
    opacity: 0.6,
  },
  editInternal: {
    backgroundColor: color.transparent,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    marginBottom: '5%',
  },

  titleSize: {
    margin: '5%',
    marginTop: '7%',
    fontSize: 24,
    fontWeight: 'bold',
  },
  editColor: {
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  starIcon: {
    color: color.starIcon,
  },
  optionsList: {
    flexDirection: 'column',
    marginTop: '5%',
    marginLeft: '3%',
  },
  optionsTextFont: {
    fontSize: 17,
  },
  infoCard: {
    margin: 10,
    height: 80,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.gray,
  },
});
