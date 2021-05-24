import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { s } from '../../../libs/styles';
import CardLikes from '../../../components/mylikes/CardLikes';
import { getLikeProductAction } from '../../../redux/actions/productAction';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';
import PTRView from 'react-native-pull-to-refresh';

class MyLikes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.likesProduct();
  }

  likesProduct = async () => {
    const res = await this.props.getLikeProductAction();
    if (res.code === 0) {
    }
  };
  componentWillMount() {
    this.props.usersLikedProducts;
    this.props.navigation.addListener('focus', (payload) => {
      this.likesProduct();
    });
  }
  renderListingItem = ({ item }) => {
    return (
      <View style={{ width: '50%' }}>
        <CardLikes product={item} navigation={this.props.navigation}/>
      </View>
    );
  };
  _refresh = () =>{
    this.likesProduct();
  }

  render() {
    return (
      <View>
        <PTRView onRefresh={this._refresh}>
          <FlatList
            data={this.props.usersLikedProducts}
            renderItem={this.renderListingItem}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </PTRView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersLikedProducts: state.ProductReducer.usersLikedProducts,
  };
};

const mapDispatchToProps = {
  getLikeProductAction: Actions.getLikeProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikes);

const styles = StyleSheet.create({});
