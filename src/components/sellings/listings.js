import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Button from './Button.js';
const { width, height } = Dimensions.get('window');
import { color } from '../../libs/styles.js';
import ListingProduct from './lisitngProduct';
import { ListingLoader } from '../../components';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/index';
import { LoadMore } from '../../components';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersProducts: [],
      horizental: false,
      // page: this.props.page + 1,
      refresh: 0,
      isEmpty: false,
      isLoading: true,
      rooms: this.props.rooms,
    };
    this.getListingProduct();
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      (payload) => {
        this.getListingProduct();
      },
    );
  }

  componentDidUnmount() {
    this.focusListener.remove();
  }
  getListingProduct = async () => {
    console.log('callllllllllllllllllllllled', this.props.id);
    if (this.props.type == 'hostel') {
      console.log('jjjjjjj');
      const res = await this.props.getUserRoomsAction(this.props.id);
      console.log(res);
    } else if (this.props.type == 'shops') {
      const res = await this.props.getProductsAction(this.props.id);
    }
  };
  productChange = async (product, type, index, nav) => {
    if (type === 'delete') {
      if (this.props.type == 'hostel') {
        const res = await this.props.deleteRoomAction(product, index);
        if (res.success) {
          console.log(res);
          this.setState({ refresh: 0 });
        }
      } else if (this.props.types == 'shops') {
        const res = await this.props.deleteProductAction(product, index);
        if (res.success) {
          console.log(res);
          this.setState({ refresh: 0 });
        }
      }
    } else if (type === 'edit') {
      if (nav == 'hostel') {
        this.props.navigation.navigate('sellItem', {
          product: product,
          isEdit: true,
        });
      } else if (nav == 'shops') {
        this.props.navigation.navigate('bank', {
          product: product,
          isEdit: true,
        });
      }
    }
  };
  renderSellListingItem = ({ item, index }) => {

    return (
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ListingProduct
          product={item}
          index={index}
          type={this.props.type}
          id={this.props.id}
          navigation={this.props.navigation}
          productChange={this.productChange}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={
            this.props.type == 'hostel'
              ? this.props.rooms
              : this.props.usersProducts
          }
          renderItem={this.renderSellListingItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.ProductReducer.products, 'ercercec');
  return {
    rooms: state.ProductReducer.rooms,
    usersProducts: state.ProductReducer.usersProducts,
  };
};

const mapDispatchToProps = {
  getUserRoomsAction: Actions.getUserRoomsAction,
  deleteRoomAction: Actions.deleteRoomAction,
  getProductsAction: Actions.getProductsAction,
  deleteProductAction: Actions.deleteProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);

const styles = StyleSheet.create({
  container: {
  },
  box: {
    // height: height,
    //   width: '50%',
  },
  image: {},
  name: {
    color: '#121212',
    marginTop: 18,
    marginLeft: 9,
  },
  icon: {
    color: 'rgba(155,155,155,1)',
    fontSize: 23,
    marginLeft: 25,
  },
  likes: {
    color: 'rgba(155,155,155,1)',
    marginTop: 0,
    marginLeft: 10,
  },
  date: {
    color: 'rgba(155,155,155,1)',
    fontSize: 11,
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
    marginTop: 20,
    marginLeft: 9,
    marginRight: 7,
  },
  loader: {
    marginTop: 16,
    alignItems: 'center',
    padding: 30,
  },
});
