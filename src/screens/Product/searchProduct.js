/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { s, color } from '../../libs/styles';
import { SearchProductsCart, Search, Header } from '../../components';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';

class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horizental: false,
      search: false,
      searchtoggle: false,
      products: [],
      distanceFromEnd: 0,
      isLoading: false,
      page: 1,
    };
    this.searchProduct();
  }
  searchProduct = async () => {
    if (this.props.route.params.hotcategory) {
      if (this.props.route.params.category_id) {
        const res = await this.props.getProductByCategoryIdAction({
          categoryId: this.props.route.params.category_id.toString(),
          page: this.state.page,
          perPage: 15,
        });
      }
    } else if (this.props.route.params.savesearch) {
      console.log(this.props.route.params, 12341123);
      const res = await this.props.getProductByKeywordAction({
        keyword: this.props.route.params.productName,
        page: this.state.page,
        perPage: 15,
        saveMySearches: this.state.searchtoggle,
      });
    } else if (this.props.route.params.searchProduct) {
      const res = await this.props.getProductByKeywordAction({
        keyword: this.props.route.params.productName,
        page: this.state.page,
        perPage: 15,
      });
    } else if (this.props.route.params.justArrived) {
      const res = await this.props.getAllRecentProductsAction({
        page: this.state.page,
        perPage: 12,
      });
    }
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ width: '31%', marginLeft: 2, marginRight: 2 }}>
        <SearchProductsCart product={item} navigation={this.props.navigation} />
      </View>
    );
  };
  onBlur = async (productName) => {
    this.props.route.params.justArrived = false;
    this.props.route.params.searchProduct = true;
    // console.log(productName);
    this.setState({ search: true });
    const res = await this.props.getProductByKeywordAction({
      keyword: productName,
      page: this.state.page,
      perPage: 15,
      saveMySearches: this.state.searchtoggle,
    });
    // console.log(res, 11);
  };
  switchToogle = () => {
    this.setState({ searchtoggle: !this.state.searchtoggle });
  };
  render() {
    const { navigate } = this.props.navigation;
    const on = color.primary;
    const off = color.lightGrey3;
    const neutral = color.lightGrey2;
    const sky = color.sky;
    return (
      <ScrollView>
        <View style={styles.container}>
          <SettingHeader
            title="Products"
            backgroundColor=""
            color={color.lightGrey}
          />

          <Search navigation={this.props.navigation} onBlur={this.onBlur} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: '10%',
              marginRight: '10%',
            }}>
            <Text style={s.save_search}>Save Search</Text>
            <Switch
              trackColor={{ false: neutral, true: on }}
              // thumbColor={this.props.isEnabled ? color.black : off}
              onValueChange={this.switchToogle}
              value={this.state.searchtoggle}
            />
          </View>

          {!this.props.route.params.category_id || this.state.search ? (
            <View>
              {this.props.route.params.searchProduct || this.state.search ? (
                <View>
                  {(this.props.searchproducts &&
                    this.props.searchproducts.length) > 0 ? (
                    <FlatList
                      data={this.props.searchproducts}
                      renderItem={this.renderItem}
                      numColumns={3}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  ) : (
                    <View style={s.NaTextView}>
                      <Text>There is no product</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  {this.props.route.params.justArrived &&
                  this.props.getAllRecentproducts &&
                  this.props.getAllRecentproducts.length > 0 ? (
                    <FlatList
                      data={this.props.getAllRecentproducts}
                      renderItem={this.renderItem}
                      numColumns={3}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  ) : (
                    <View style={s.NaTextView}>
                      <Text>There is no product</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View>
              {this.props.productsbycategoryid &&
              this.props.productsbycategoryid.length > 0 ? (
                <FlatList
                  data={this.props.productsbycategoryid}
                  renderItem={this.renderItem}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <View style={s.NaTextView}>
                  <Text>There is no product</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state.ProductReducer.searchedProducts);
  return {
    productsbycategoryid: state.ProductReducer.productsbycategoryid,
    searchproducts: state.ProductReducer.searchedProducts,
    getAllRecentproducts: state.ProductReducer.getAllRecentProducts,
  };
};

const mapDispatchToProps = {
  getProductByCategoryIdAction: Actions.getProductByCategoryIdAction,
  getProductByKeywordAction: Actions.getProductByKeywordAction,
  getAllRecentProductsAction: Actions.getAllRecentProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imageStack: {
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
  data: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 15,
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
