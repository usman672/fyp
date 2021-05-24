import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { s, color } from '../../libs/styles.js';
import { inProgrssBuyAction } from '../../redux/actions/orderAction';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import BuyerProduct from '../buyer/buyerProduct';
import LoadMore from '../../components/loader/loadMore';

class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
      page: this.props.page + 1,
    };
    this.getorders();
  }
  getorders = async () => {
    const res = await this.props.inProgrssBuyAction({
      userType: 'buyer',
      keyword: 'inprogress',
      page: this.state.page,
      perPage: 6,
    });
  };

  doOperation = async () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2500);
  };
  getImage = (item) => {
    let path = require('../../assets/dummyProduct.png');
    if (item.product.image_urls.length > 0)
      return { uri:item.product.image_urls[0].image_url };
    else return path;
  };
  renderbuyItem = ({ item }) => {
    return (
      <View>
        <BuyerProduct
          image={this.getImage(item)}
          name={item.product.name}
          date={item.product.createdAt}
          navigation={this.props.navigation}
          order={item}
          completed={false}
        />
      </View>
    );
  };
  LoadMoreData = async ({ distanceFromEnd }) => {
    if (!this.state.isEmpty) {
      await this.setState({ isLoading: true });
      await this.setState({ page: this.state.page + 1 });
      const res = await this.props.inProgrssBuyAction({
        userType: 'buyer',
        keyword: 'inprogress',
        page: this.state.page,
        perPage: 6,
      });

      if (!res.data.orders.length > 0) {
        this.setState({ isEmpty: true });
      }
      await this.setState({ isLoading: false });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.inprogressbuyOrder}
          renderItem={this.renderbuyItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={(distanceFromEnd) => this.LoadMoreData(distanceFromEnd)}
          bounces={false}
          ListFooterComponent={() => (
            <LoadMore isLoading={this.state.isLoading} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'rgba(61,53,53,1)',
    fontSize: 30,
    marginTop: 113,
  },
  description1: {
    color: 'rgba(155,155,155,1)',
    fontSize: 15,
    marginTop: 21,
  },
  description2: {
    color: 'rgba(155,155,155,1)',
    fontSize: 15,
    marginTop: 16,
  },
  lineStyle: {
    backgroundColor: '#A2A2A2',
    height: 3,
    marginTop: 40,
    color: 'rgba(155,155,155,1)',
    width: '50%',
  },
});

const mapStateToProps = (state) => {
  console.log(state.OrderReducer.inProgressBuyerPage)
  return {
    inprogressbuyOrder: state.OrderReducer.inprogressbuyOrder,
    page: state.OrderReducer.inProgressBuyerPage,
    
  };
};

const mapDispatchToProps = {
  inProgrssBuyAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
// export default InProgress;
