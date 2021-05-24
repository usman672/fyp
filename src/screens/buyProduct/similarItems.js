import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import { s, color } from '../../libs/styles';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toggle from '../../components/switch/switch';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import { similarProductAction } from '../../redux/actions/productAction';

class SimilarItems extends Component {
  constructor() {
    super();
    this.state = {
      switch1Value: false,
      soldTag: '',

      array: [
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '266',
        },
        {
          title: require('../../assets/product3.jpg'),
          price: '23',
        },
      ],
    };
  }
  getImage = (element) => {
    let path = require('../../assets/dummyProduct.png');
    if (element.item.image_urls.length > 0) {
      return { uri: element.item.image_urls[0].image_url };
    } else {
      return path;
    }
  };

  renderItem = (element) => {
    return (
      <View style={styles.itemsView}>
        <TouchableOpacity onPress={() => this.props.page(element)}>
          <ImageBackground
            style={styles.item}
            resizeMode="cover"
            source={this.getImage(element)}>
            {/* <View style={styles.contentColumn}>
              <Text />
              <Text style={styles.price}>${element.item.price}</Text>
            </View> */}
            <View style={styles.contentColumn}>
            <View>
                {element.item.sold && <Text style={styles.sold}>Sold</Text>}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.price}>${element.item.price}</Text>
              </View>
              
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View>
        <View style={styles.main}>
          <Text style={styles.generalColor}>More </Text>

          <FlatList
            data={this.props.similerProduct}
            renderItem={this.renderItem}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    similerProduct: state.ProductReducer.similerProduct,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SimilarItems);

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  sold: {
    color: color.white,
    backgroundColor: color.orangeOpacity,
    width: (30 * s.width) / 100,
    textAlign: 'center',
    fontSize: 16,
  },
  itemsView: {
    width: (30 * s.width) / 100,
    height: (30 * s.width) / 100,
    marginTop: '3%',
    marginLeft: '3%',
  },
  generalColor: {
    color: color.black,
    fontSize: 20,
    marginLeft: '3%',
  },
  allItems: {
    flexDirection: 'row',
    marginTop: '3%',
    width: (100 * Math.round(Dimensions.get('window').width)) / 100,
  },

  item: { width: (30 * s.width) / 100, height: (30 * s.width) / 100 },
  contentColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  price: {
    color: 'white',
    backgroundColor: color.blackOpacity,
    alignSelf: 'flex-start',
    padding: 5,
  },
});
