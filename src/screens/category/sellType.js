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
import Search from '../../components/header/search.js';
import Category from '../../components/category/Category.js';
import SettingHeader from '../../components/header/settingHeader';

class type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesCopy: this.props.route.params,
    };
  }
  search = async (searchText) => {
    await this.setState({ categoriesCopy: [] });
    for (var i = 0; i < this.props.route.params.length; i++) {
      if (
        this.props.route.params[i].name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) {
        this.setState({
          categoriesCopy: [
            ...this.state.categoriesCopy,
            this.props.route.params[i],
          ],
        });
      }
    }
    if (!searchText) {
      await this.setState({ categoriesCopy: this.props.route.params });
    }
  };
  renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('bank', {
            categoryid: item.item._id,
            categoryName: item.item.name,
          })
        }>
        <Category item={item.item} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={s.scrollview}>
        <SettingHeader title="" backgroundColor="" color={color.lightGrey} />

        <ScrollView style={styles.container}>
          <Search search={this.search} type="category" />
          <Text style={styles.text1}>Category</Text>
          <Text style={styles.listing1}>Listing in: Women</Text>
          <FlatList
            data={this.state.categoriesCopy}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

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

export default type;
