import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { s, color } from '../../libs/styles.js';
import BuyerProduct from '../buyer/buyerProduct';
import LoadMore from '../../components/loader/loadMore';

import { completeBuyAction } from '../../redux/actions/orderAction';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          status: 'sold',
          description: 'this product is nice',
        },
        {
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          status: 'sold',
          description: 'this product is nice',
        },
        {
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          status: 'sold',
          description: 'this product is nice',
        },
        {
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          status: 'sold',
          description: 'this product is nice',
        },
        {
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          status: 'sold',
          description: 'this product is nice',
        },
        {
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          status: 'sold',
          description: 'this product is nice',
        },
      ],
      horizental: false,
      isEmpty: false,
      isLoading: false,
      page: this.props.page + 1,
    };
    this.getorders();
  }
  getorders = async () => {
    const res = await this.props.completeBuyAction({
      userType: 'buyer',
      keyword: 'done',
      page: this.state.page,
      perPage: 1,
    });
  };
  LoadMoreData = async ({ distanceFromEnd }) => {
    if (!this.state.isEmpty) {
      await this.setState({ isLoading: true });
      await this.setState({ page: this.state.page + 1 });
      const res = await this.props.completeBuyAction({
        userType: 'buyer',
        keyword: 'done',
        page: this.state.page,
        perPage: 1,
      });

      if (!res.data.orders.length > 0) {
        this.setState({ isEmpty: true });
        await this.setState({ isLoading: false });
      }
    }
  };
  getImage = (item) => {
    let path = require('../../assets/dummyProduct.png');
    if (item.product.image_urls.length > 0)
      return { uri:item.product.image_urls[0].image_url };
    else return path;
  };
  renderbuyItem = ({ item }) => {
    // for (let i = 0; i <= item.products.length; i++) {
    // console.log( item, 'completed buyer');
    return (
      <View>
        <BuyerProduct
          image={this.getImage(item)}
          name={item.product.name}
          date={item.product.createdAt}
          navigation={this.props.navigation}
          completed={true}
        />
      </View>
    );
    // }
  };
  render() {
    return (
      <FlatList
        data={this.props.completedbuyOrder}
        renderItem={this.renderbuyItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.01}
        onEndReached={(distanceFromEnd) => this.LoadMoreData(distanceFromEnd)}
        bounces={false}
        ListFooterComponent={() => (
          <LoadMore isLoading={this.state.isLoading} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 111,
    height: 105,
    borderRadius: 3,
    transform: [
      {
        rotate: '-0.03deg',
      },
    ],
    overflow: 'hidden',
  },
  price: {
    width: 111,
    height: 25,
    backgroundColor: color.brandRedOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    color: color.white,
    textAlign: 'center',
    fontSize: 14,
  },
  description: {
    color: '#121212',
    fontSize: 16,
  },
  icon: {
    color: 'rgba(155,155,155,1)',
    fontSize: 25,
  },
  time: {
    color: 'rgba(155,155,155,1)',
    marginLeft: 12,
    marginTop: 6,
  },
  iconRow: {
    height: 27,
    flexDirection: 'row',
    marginTop: 7,
    marginRight: 13,
  },
  descriptionColumn: {
    width: 190,
    marginLeft: 14,
    marginBottom: 52,
  },
  imageRow: {
    height: 105,
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 33,
    marginRight: 93,
  },
});
const mapStateToProps = (state) => {
  return {
    completedbuyOrder: state.OrderReducer.completedbuyOrder,
    page: state.OrderReducer.buyerCompletedPage,
  };
};

const mapDispatchToProps = {
  completeBuyAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
