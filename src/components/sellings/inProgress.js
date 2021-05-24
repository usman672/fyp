import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { s, color } from '../../libs/styles';
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';
import SellingProduct from './sellingProject';
import { connect } from 'react-redux';
import { inProgrssSellAction } from '../../redux/actions/orderAction';
import Actions from '../../redux/actions';
import { LoadMore } from '../../components';

class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          likes: '4',
          price: 44,
          status: '',
          completed: false,
        },
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          likes: '5',
          price: 44,
          status: '',
          completed: false,
        },
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/29',
          likes: '6',
          price: 44,
          completed: false,
        },
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          likes: '4',
          price: 44,
          status: '',
          completed: false,
        },
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          likes: '5',
          price: 44,
          status: '',
          completed: false,
        },
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/29',
          likes: '6',
          price: 44,
          status: '',
          completed: false,
        },
        {
          name: 'iphone x',
          source: require('../../assets/mobile.jpg'),
          date: '01/01/19',
          likes: '4',
          price: 44,
          status: '',
          completed: false,
        },
      ],
      isLoading:true,
      horizental: false,
      isEmpty: false,
      page: this.props.page + 1,
    };
  }

  componentDidMount() {
    console.log('outerr');
    this.getorders();
    this.props.navigation.addListener('focus', () => {
      if (this.props.page === 0) this.getorders();
    });
  }
  LoadMoreData = async ({ distanceFromEnd }) => {
    if (!this.state.isEmpty) {
      await this.setState({ isLoading: true });
      await this.setState({ page: this.state.page + 1 });
      const res = await this.props.inProgrssSellAction({
        userType: 'seller',
        keyword: 'inprogress',
        page: this.state.page,
        perPage: 6,
      });

      if (!res.data.orders.length > 0) {
        this.setState({ isEmpty: true });
        await this.setState({ isLoading: false });
      }
    }
  };
  getorders = async () => {
    console.log('hello');
    const res = await this.props.inProgrssSellAction({
      userType: 'seller',
      keyword: 'inprogress',
      page: this.state.page,
      perPage: 6,
    });
  };

  getImage = (item) => {
    let path = require('../../assets/dummyProduct.png');
    if (item.image_urls.length > 0)
      return { uri: item.image_urls[0].image_url };
    else return path;
  };
  renderSellListingItem = ({ item }) => {
    return (
      <View style={{ width: '100%' }}>
        <SellingProduct
          likes={item.product.likes.length}
          price={item.product.price}
          status={item.product.status}
          source={this.getImage(item.product)}
          name={item.product.name}
          date={item.product.createdAt}
        />

        <FlatListItemSeparator />
      </View>
    );
  };
  render() {
    return (
      <FlatList
        data={this.props.inprogresssellOrder}
        renderItem={this.renderSellListingItem}
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
  iconLike: {
    color: 'rgba(155,155,155,1)',
    fontSize: 23,
  },
  likes: {
    color: 'rgba(155,155,155,1)',
    marginTop: 0,
    marginLeft: 10,
  },
  price: {
    width: 111,
    height: 25,
    backgroundColor: color.orangeOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 14,
  },
  description: {
    color: '#121212',
    fontSize: 16,
  },
  icon: {
    color: 'rgba(155,155,155,1)',
    fontSize: 23,
    marginLeft: '15%',
  },
  time: {
    color: 'rgba(155,155,155,1)',
    marginLeft: 12,
  },
  priceDollar: {
    fontSize: 20,
    marginLeft: 4,
  },
  iconRow: {
    height: 27,
    flexDirection: 'row',
    marginTop: 7,
    marginRight: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 37,
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
    marginTop: 10,
    marginLeft: 33,
    marginRight: 93,
  },
});
const mapStateToProps = (state) => {
  return {
    inprogresssellOrder: state.OrderReducer.inprogressellOrder,
    page: state.OrderReducer.inProgressPage,
  };
};

const mapDispatchToProps = {
  inProgrssSellAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
// export default InProgress;
