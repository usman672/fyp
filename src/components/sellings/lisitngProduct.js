import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import storage from '../../libs/storage';

import Icon from 'react-native-vector-icons/EvilIcons';
const { width, height } = Dimensions.get('window');
import moment from 'moment';
import Button from './Button.js';
// import { useNavigation } from '@react-navigation/native';
import Actions from '../../redux/actions';
import { deleteRoomAction } from '../../redux/actions/productAction';
import { inProgrssSellAction } from '../../redux/actions/orderAction';
import { connect } from 'react-redux';

class ListingProduct extends Component {
  // navigation = useNavigation();
  constructor(props) {
    super(props);
    this.state = {
      userHostelId: null,
      shopIdL: null,
    };
    this.setSeller();
  }

  setSeller = async () => {
    const user = await storage._retrieveData('user');
    if (JSON.parse(user).data.hostel)
      await this.setState({
        userHostelId: JSON.parse(user).data.hostel._id,
      });
    if (JSON.parse(user).data.shop)
      await this.setState({
        shopId: JSON.parse(user).data.shop._id,
      });
  };
  checkimage = (address) => {
    if (address.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  getImage = () => {
    let path = require('../../assets/room.jpg');
    console.log(this.props.type, 'ttyptptpyp');
    if (this.props.type === 'shops') {
      if (this.props.product.image.length > 0)
        return { uri: this.props.product.image[0].image_url };
    } else if (this.props.product.img.length > 0)
      return { uri: this.props.product.img[0].image_url };

    console.log(this.props.product.image);
    return path;
  };
  render() {
    if (this.props.type == 'hostel') {
      console.log(this.props.product, '3333');
      return (
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('itemDetail', {
                item: this.props.product,
              })
            }
          >
            <Image
              style={styles.image}
              source={this.getImage()}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.name}>
            Room # {this.props.product.roomNumber}
          </Text>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.date}>2 Seats Available</Text>

            <Text style={styles.date}>
              Price per seat : {this.props.product.price}
            </Text>
          </View>
          {this.state.userHostelId == this.props.id && (
            <View style={styles.cupertinoButtonPurpleRow}>
              <Button
                style={styles.cupertinoButtonPurple}
                name="Delete"
                color={color.white}
                productChange={this.props.productChange}
                product={this.props.product._id}
                nav={this.props.type}
                type="delete"
                index={this.props.index}
              />

              <Button
                style={styles.edit}
                name="Edit"
                color={color.white}
                productChange={this.props.productChange}
                product={this.props.product}
                type="edit"
                nav={this.props.type}
                index={this.props.index}
              />
            </View>
          )}
        </View>
      );
    } else if (this.props.type == 'shops') {
      console.log(this.props.product, '2222');
      return (
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('shopItemDetail', {
                item: this.props.product,
              })
            }
          >
            <Image
              style={styles.image}
              source={this.getImage()}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.name}>
            Room # {this.props.product.roomNumber}
          </Text>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.date}>2 Seats Available</Text>

            <Text style={styles.date}>
              Price per seat : {this.props.product.price}
            </Text>
          </View>
          {this.state.shopId == this.props.id && (
            <View style={styles.cupertinoButtonPurpleRow}>
              <Button
                style={styles.cupertinoButtonPurple}
                name="Delete"
                color={color.white}
                productChange={this.props.productChange}
                product={this.props.product._id}
                nav={this.props.type}
                type="delete"
                index={this.props.index}
              />

              <Button
                style={styles.edit}
                name="Edit"
                color={color.white}
                productChange={this.props.productChange}
                product={this.props.product}
                type="edit"
                nav={this.props.type}
                index={this.props.index}
              />
            </View>
          )}
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  deleteRoomAction,
  inProgrssSellAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ListingProduct);

const styles = StyleSheet.create({
  //   box: {
  //     width: '50%',
  //   },
  image: {
    width: 160,
    height: 141,
    borderRadius: 5,
    marginTop: 15,
    marginLeft: 10,
  },
  name: {
    color: '#121212',
    marginTop: 5,
    marginLeft: 10,
  },
  icon: {
    color: 'rgba(155,155,155,1)',
    fontSize: 23,
    marginLeft: 25,
  },
  likes: {
    color: 'rgba(155,155,155,1)',
    marginTop: 0,
  },
  date: {
    color: 'rgba(155,155,155,1)',
    fontSize: 14,
    marginTop: 3,
    marginLeft: 9,
  },
  cupertinoButtonPurple: {
    height: 27,
    backgroundColor: color.black,
    color: color.white,
    width: 80,
  },
  edit: {
    height: 27,
    width: 70,
    backgroundColor: color.black,
    marginLeft: 10,
  },
  cupertinoButtonPurpleRow: {
    height: 27,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 9,
    marginRight: 7,
  },
});
