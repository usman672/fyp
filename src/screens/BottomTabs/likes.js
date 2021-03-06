import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { s } from '../../libs/styles';
import { Search, Header } from '../../components';
import { getAllRecentProductsAction } from '../../redux/actions/productAction';
import { connect } from 'react-redux';
import storage from '../../libs/storage';
import ReviewCard from '../../components/buyer/reviewCard';
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
      badgeCount: 0,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    this.setSeller();
  }
  getShops = async () => {
    await this.props.getAllRecentProductsAction({ search: '' });
  };
  setSeller = async () => {
    const user = await storage._retrieveData('user');
    await this.setState({
      userName: JSON.parse(user).data.user.name,
    });
    await this.setState({
      image: JSON.parse(user).data.user.photo,
    });
    console.log('jkljsdnsdjuinfksduijkisdnkhsidhkisdkih');
    this.getShops();
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
    //await this.props.getAllRecentProductsAction({ search: productName });
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
          data={this.props.getAllRecentProducts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            // eslint-disable-next-line prettier/prettier
            <ReviewCard
              type="shops"
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
    getAllRecentProducts: state.ProductReducer.getAllRecentProducts,
  };
};
const mapDispatchToProps = {
  getAllRecentProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({});
