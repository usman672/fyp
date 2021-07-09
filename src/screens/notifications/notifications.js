import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { s, color } from '../../../src/libs/styles';
import storage from '../../../src/libs/storage';
import Listing from '../../components/sellings/listings.js';
import Completed from '../../components/sellings/completed';
import InProgress from '../../components/sellings/inProgress';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SettingHeader from '../../components/header/settingHeader';
import MapView from '../../components/modal/fillScreenImage';

export default class BuyerScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isMap: false,
      image: null,
      address: '',
      name: '',
      isOwner: false,
      routes: [
        { key: 'listings', title: 'Listing' },
        { key: 'inProgress', title: 'In Progress' },
        { key: 'completed', title: 'Done' },
      ],
    };
    this.setSeller();
  }
  setSeller = async () => {
    const user = await storage._retrieveData('user');
  console.log(JSON.parse(user).data.shop._id,this.props.route.params.hId)
    if (JSON.parse(user).data.shop._id)
      if (JSON.parse(user).data.shop._id == this.props.route.params.hId) {
        await this.setState({ isOwner: true });
    
      }
  };
  toggleMap = () => {
    this.setState({ isMap: !this.state.isMap });
  };

  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      this.setSeller();
    });
  }
  initialLayout = { width: Dimensions.get('window').width };

  render() {
    const { index, routes } = this.state;
    return (
      <ScrollView style={[s.scrollview,styles.container]}>
        <SettingHeader
          title={this.state.isOwner ? 'Shops' : 'Shop'}
          backgroundColor={this.state.isOwner}
          color={color.lightGrey}
        />
        <View style={styles.box}>
          <View style={styles.imageRow}>
            <Image
              source={this.props.route.params.photo ? {uri:this.props.route.params.photo} : require('../../assets/shop.jpg')}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={styles.nameColumn}>
              <Text style={styles.name}>{this.props.route.params.name}</Text>
              <Text style={styles.price}>03041566666</Text>
              <Text numberOfLines={2} style={styles.delivery}>
                {this.props.route.params.address}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 10,
              alignSelf: 'center',
              flexDirection: 'row',
              margin: 10,
              width: '96%',
              justifyContent: 'space-between',
            }}
          >
            
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: '47%',  
                  borderRadius: 10,
                  backgroundColor: 'black',
                }}
                onPress={() =>
                  this.props.navigation.navigate('BuyerRating', {
                    hId: this.props.route.params.hId,
                    photo: this.props.route.params.photo,
                    isOwner:this.state.isOwner,
                    type: 'shops',
                  })
                }
              >
                <Text
                  style={{
                    color: 'white',
                  }}
                >
                  {this.state.isOwner ? 'Reviews' : 'Rate Shop'}
                </Text>
              </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                width: '47%',
                borderRadius: 10,
                backgroundColor: 'black',
              }}
              onPress={() =>
                this.props.navigation.navigate('store', {
                  longitude: this.props.route.params.longitude,
                  latitude: this.props.route.params.latitude,
                })
              }
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                Locate Shop
              </Text>
            </TouchableOpacity>
          </View>
          </View>
          <Listing
            navigation={this.props.navigation}
            id={this.props.route.params.hId}
            type="shops"
          />
      

        {this.state.isMap && <MapView />}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
  },
  box: {
    backgroundColor: color.white,
    borderWidth: 0,
    borderColor: color.gray,
    borderRadius: 4,
    elevation: 2,
    margin: 5,
    shadowOpacity: 0.01,
    alignSelf: 'center',
    width: '95%',
  },
  image: {
    width: '30%',
    height: 110,
    marginLeft: 10,
  },
  name: {
    color: color.lightGrey,
    fontSize: 20,
  },
  price: {
    color: color.black,
    fontSize: 18,
    marginTop: 5,
  },
  delivery: {
    color: color.lightGrey2,
    marginTop: 5,
    paddingRight: 20,
  },
  deliveryDescription: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 25,
  },
  deliveryTime: {
    color: color.lightGrey2,
    marginTop: 5,
    fontSize: 10,
  },
  nameColumn: {
    width: '60%',
    marginLeft: 31,
  },
  imageRow: {
    flexDirection: 'row',
  },
  icon: {
    left: 88,
    color: color.lightGrey,
    fontSize: 30,
  },
  boxStack: {
    width: '95%',
    height: 140,
    alignSelf: 'center',
    marginTop: 5,
  },
});
