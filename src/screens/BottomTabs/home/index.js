import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { s, color } from '../../../libs/styles';
import { Search, Header } from '../../../components';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getCartProductsAction } from '../../../redux/actions/cartAction';
import { getHostelsAction } from '../../../redux/actions/userActions';
import { searchHostelsAction } from '../../../redux/actions/productAction';

import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '../../../libs/storage';
import ReviewCard from '../../../components/buyer/reviewCard';
import Loader from '../../../components/loader/listingLoader';

class Home extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      image: '',
      userName: '',
      isLoading: false,
      badgeCount: 0,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    this.setSeller();
  }
  getHostels = async () => {
    await this.props.getHostelsAction({ search: '' });
  };
  setSeller = async () => {
    const user = await storage._retrieveData('user');
    console.log(user, 'kpokpokpokpok');
    this.setState({
      userName: JSON.parse(user).data.user.name,
    });
    this.setState({
      image: JSON.parse(user).data.user.photo,
    });
    this.getHostels();
  };

  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      //   this.getCartProducts();
      this.setSeller();
      //   this.setState({ badgeCount: this.props.cartProducts.length });
    });
  }

  onBlur = async (productName) => {
    console.log(productName);
    await this.props.getHostelsAction({ search: productName });
  };
  render() {
    const { index, routes } = this.state;
    return (
      <View style={[s.scrollview]}>
        <Header
          badgeCount={this.state.badgeCount}
          image={this.state.image}
          userName={this.state.userName}
          navigation={this.props.navigation}
        />
        <Search navigation={this.props.navigation} onBlur={this.onBlur} />
        <FlatList
          style={{ width: '100%', height: '70%' }}
          data={this.props.hostels}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ReviewCard
              type="hostels"
              navigation={this.props.navigation}
              review={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hostels: state.UserReducer.hostels,
  };
};
const mapDispatchToProps = {
  getHostelsAction,
  searchHostelsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({});
