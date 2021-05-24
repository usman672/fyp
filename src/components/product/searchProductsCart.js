import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { s, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview';
import { color } from '../../libs/styles';

export default class SearchProductsCart extends Component {
  checkimage = (address) => {
    if (address.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  getImage = () => {
    let path = require('../../assets/dummyProduct.png');
    if (this.props.product.image_urls.length > 0)
      return { uri: this.props.product.image_urls[0].image_url };
    else return path;
  };
  render() {
    return (
      <View style={s.productcardView}>
        <CardView
          style={s.productCard}
          cardElevation={neomorph.elevation}
          cornerRadius={neomorph.cornerRadius}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('itemDetail', {
                product: this.props.product,
              })
            }>
            {this.checkimage(this.props.product.image_urls) ? (
              <View style={{ borderRadius: 10 }}>
                <Image style={styles.image} source={this.getImage()} />
                {this.props.product.sold && (
                  <View style={styles.sold}>
                    <Text style={styles.soldText}>Sold</Text>
                  </View>
                )}
              </View>
            ) : (
              <Text />
            )}
          </TouchableOpacity>
          <View style={styles.contentColumn}>
            <Text style={styles.price}>${this.props.product.price}</Text>
            {this.props.product.freeDelivery && (
              <Icon name="truck" size={20} style={styles.tag} />
            )}
          </View>
        </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    height: 130,
    width: 100,
    alignSelf: 'center',
    alignContent: 'stretch',
  },
  image: {
    height: 120,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  footer: {
    marginLeft: 10,
    marginBottom: 5,
  },
  contentColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: color.black,
    alignSelf: 'flex-start',
    padding: 5,
  },
  tag: {
    color: color.black,
    padding: 5,
  },
  sold: {
    color: color.white,
    backgroundColor: color.orangeOpacity,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  soldText: {
    color: color.white,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
  },
});
