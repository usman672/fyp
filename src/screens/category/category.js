import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { s, color } from '../../libs/styles';
import Category from '../../components/category/Category.js';
import Search from '../../components/header/search.js';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesCopy: this.props.categories,
    };
  }
  navigateCategory = (item) => {
    if (item.item.hasOwnProperty('subCategories'))
      this.props.navigation.navigate('type', item.item.subCategories);
    else
      this.props.navigation.navigate('bank', {
        categoryid: item.item._id,
        categoryName: item.item.name,
      });
  };
  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.navigateCategory(item)}>
        <Category item={item.item} />
      </TouchableOpacity>
    );
  };
  search = async (searchText) => {
    await this.setState({ categoriesCopy: [] });
    for (var i = 0; i < this.props.categories.length; i++) {
      if (
        this.props.categories[i].name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) {
        this.setState({
          categoriesCopy: [
            ...this.state.categoriesCopy,
            this.props.categories[i],
          ],
        });
      }
    }
    if (!searchText) {
      await this.setState({ categoriesCopy: this.props.categories });
    }
  };
  render() {
    return (
      <View style={s.scrollview}>
        <SettingHeader title="" backgroundColor="" color={color.lightGrey} />
        <ScrollView style={styles.container}>
          <Search search={this.search} type="category" />
          <Text style={styles.text1}>Category</Text>
          <Text style={styles.listing1}>Browse and Select</Text>
          {this.props.categories.length > 0 && (
            <FlatList
              data={this.state.categoriesCopy}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.CategoriesReducer.categories,
  };
};
const mapDispatchToProps = {
  getAllCategoriesAction: Actions.getAllCategoriesAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(category);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listing1: {
    color: color.lightGrey,
    marginLeft: 23,
    fontWeight: 'bold',
  },
  text1: {
    color: color.black,
    fontSize: 24,
    marginLeft: 22,
  },
  rect1: {
    width: 216,
    height: 3,
    backgroundColor: color.darkgray,
    marginTop: 100,
    marginLeft: '24%',
    marginBottom: 10,
  },
});
