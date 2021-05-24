import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { s, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import CardView from 'react-native-cardview';
import { color } from '../../libs/styles';
import { useNavigation } from '@react-navigation/native';

const BuyProduct = (props) => {
  const navigation = useNavigation();
  const checkimage = (address) => {
    // // (address);
    if (address.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const getImage = () => {
    let path = require('../../assets/dummyProduct.png');
    if (props.product.image_urls.length > 0)
      return { uri: props.product.image_urls[0].image_url };
    else return path;
  };

  return (
    <View style={s.productcardView}>
      <CardView
        style={s.productCard}
        cardElevation={neomorph.elevation}
        cornerRadius={neomorph.cornerRadius}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('itemDetail', {
              product: props.product,
            })
          }>
          <ImageBackground style={styles.image} source={getImage()}>
            <View style={styles.contentColumn}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.price}>${props.product.price}</Text>
                {props.product.freeDelivery ? (
                  <Icon
                    name="truck"
                    size={20}
                    color={color.white}
                    style={{
                      backgroundColor: color.blackOpacity,
                      padding: 5,
                    }}
                  />
                ) : (
                  <Text />
                )}
              </View>
              <View>
                {props.product.sold && <Text style={styles.sold}>Sold</Text>}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </CardView>
    </View>
  );
};
export default BuyProduct;
const styles = StyleSheet.create({
  imageView: {
    height: 130,
    width: 100,
    alignSelf: 'center',
    alignContent: 'stretch',
  },
  sold: {
    color: color.white,
    backgroundColor: color.orangeOpacity,
    width: (30 * s.width) / 100,
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    height: 120,
    width: '100%',
    alignSelf: 'center',
  },
  footer: {
    marginLeft: 10,
    marginBottom: 5,
  },
  price: {
    alignItems: 'flex-end',
    paddingTop: 100,
  },
  contentColumn: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
  },
  price: {
    color: 'white',
    backgroundColor: color.blackOpacity,
    alignSelf: 'flex-start',
    padding: 5,
  },
});
