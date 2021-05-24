import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ColorPropType,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';
import { useNavigation } from '@react-navigation/native';

const ListingProduct = (props) => {
  const navigation = useNavigation();
  const [iconName, changeIconn] = useState('hearto');
  const changeIcon = () => {
    if (iconName === 'hearto') {
      changeIconn('heart');
    } else {
      changeIconn('hearto');
    }
  };
  const checkimage = (address) => {
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
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('itemDetail', {
                product: props.product,
              })
            }>
            {/* {checkimage(props.product.image_urls) ? (
              <Image
                style={styles.image}
                source={{ uri: props.product.image_urls[0].image_url }}
                resizeMode="stretch"
              />
            ) : (
              <Text />
            )} */}
            <ImageBackground
              style={styles.image}
              source={getImage()}>
              <View style={styles.contentColumn}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                />
                <View>
                  {props.product.sold && <Text style={styles.sold}>Sold</Text>}
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View>
            <Text>${props.product.price}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="hearto" color={color.brandRed} size={20} />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('sellItem', {
                  product: props.product,
                  isEdit: true,
                });
              }}
              style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardView>
    </View>
  );
};
export default ListingProduct;

const styles = StyleSheet.create({
  imageView: {
    height: 100,
    width: '100%',
    alignSelf: 'center',
    alignContent: 'stretch',
  },
  image: {
    height: 100,
    width: '100%',
  },
  footer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sold: {
    color: color.white,
    backgroundColor: color.orangeOpacity,
    width: (30 * s.width) / 100,
    textAlign: 'center',
    fontSize: 16,
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 25,
    borderRadius: 5,
    backgroundColor: color.black,
  },
  buttonText: {
    fontSize: 15,
    color: color.white,
  },
});
