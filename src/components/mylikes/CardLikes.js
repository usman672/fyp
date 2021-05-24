import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CardView from 'react-native-cardview';
import {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
} from '../../utils/responsive.js';
// import Icon from 'react-native-vector-icons/AntDesign';
import { s, color } from '../../libs/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Example2 extends Component {
  state = {
    iconName: 'hearto',
  };
  changeIcon = () => {
    if (this.state.iconName === 'hearto') {
      this.setState({ iconName: 'heart' });
    } else {
      this.setState({ iconName: 'hearto' });
    }
  };
  checkimage = (address) => {
    if (address.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  getImage = () => {
    console.log(12121);
    let path = require('../../assets/dummyProduct.png');
    console.log(path);

    if (this.props.product.image_urls.length > 0) {
      return { uri: this.props.product.image_urls[0].image_url };
    } else {
      return path;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View flexDirection="row">
            <CardView
              cardElevation={7}
              cardMaxElevation={7}
              cornerRadius={5}
              style={styles.card}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('itemDetail', {
                    product: this.props.product,
                  })
                }>
                <ImageBackground
                  source={this.getImage()}
                  // resizeMode="stretch"
                  style={styles.image}
                  imageStyle={styles.image_imageStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {this.props.product.sold && (
                      <View style={styles.rect}>
                        <Text style={styles.sold}>SOLD</Text>
                      </View>
                    )}
                    {this.props.product.freeDelivery ? (
                      <Icon
                        name="truck"
                        size={20}
                        color={color.white}
                        style={{
                          backgroundColor: color.blackOpacity,
                          padding: 5,
                        }}
                      />
                    ) : (
                      <Text />
                    )}
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${this.props.product.price}</Text>
                <TouchableOpacity onPress={this.changeIcon}>
                  <Icon name="heart" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </CardView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#EEEEEE',
  },
  card: {
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 1,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    margin: 10,
    height: 75,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  image: {
    width: widthToDp('45%'),
    height: heightToDp('20%'),
    borderRadius: widthToDp('2%'),
    overflow: 'hidden',
  },
  rect: {
    width: 71,
    height: 36,
    backgroundColor: color.orange,
  },
  sold: {
    color: color.white,
    paddingTop: heightToDp('1.3%'),
    paddingLeft: widthToDp('5%'),
  },
  price: {
    color: color.black,
    fontSize: widthToDp('4%'),
  },
  icon: {
    color: color.primary,
    fontSize: widthToDp('6%'),
    // height: widthToDp('6%'),
    // width: widthToDp('7%'),
    // marginLeft: widthToDp('25%'),
  },
  priceRow: {
    flexDirection: 'row',
    margin: 10,
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
});
