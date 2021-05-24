import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from 'react-native-vector-icons/EvilIcons';
const { width, height } = Dimensions.get('window');
import Button from './Button.js';
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';
import moment from 'moment';

import { useNavigation } from '@react-navigation/native';

const SellingProduct = (props) => {
  const navigation = useNavigation();

  function checkimage(address) {
    // console.log(props.sourse,"source")
    if (address.length > 0) {
      return true;
    } else {
      return true;
    }
  }

  return (
    <View style={styles.imageRow}>
      {checkimage(props.source) ? (
        <ImageBackground
          source={props.source}
          resizeMode="stretch"
          style={styles.image}>
          {props.status ? (
            <View style={styles.price}>
              <Text style={styles.status}>{props.status}</Text>
            </View>
          ) : (
            <View>
              <Text />
            </View>
          )}
        </ImageBackground>
      ) : (
        <Text />
      )}

      <View style={styles.descriptionColumn}>
        <Text style={styles.description}>{props.name}</Text>
        <View style={styles.iconRow}>
          <Heart name="heart" style={styles.iconLike} />
          <Text style={styles.likes}>{props.likes}</Text>
          <Icon name="alarm-multiple" style={styles.icon} />
          <Text style={styles.time}>
            {moment(props.date).format('DD MMM YYYY')}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.priceDollar}>${props.price}</Text>
          {props.completed ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('orderStatus', {
                  params: 'completed',
                })
              }
              style={s.Orderbutton(
                color.black,
                color.black,
                'flex-end',
                '80%',
              )}>
              <Text style={s.buttonText}>View Order</Text>
            </TouchableOpacity>
          ) : (
            <Text />
            // <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate('orderStatus', {
            //       params: 'delivery',
            //     })
            //   }
            //   style={s.Orderbutton(
            //     color.black,
            //     color.black,
            //     'flex-end',
            //     '80%',
            //   )}>
            //   <Text style={s.buttonText}>View Order</Text>
            // </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
export default SellingProduct;
const styles = StyleSheet.create({
  image: {
    width: 111,
    height: 105,
    borderRadius: 3,
    transform: [
      {
        rotate: '-0.03deg',
      },
    ],
    overflow: 'hidden',
  },
  iconLike: {
    color: 'rgba(155,155,155,1)',
    fontSize: 23,
  },
  likes: {
    color: 'rgba(155,155,155,1)',
    marginTop: 0,
    marginLeft: 10,
  },
  price: {
    width: 46,
    height: 27,
    backgroundColor: 'rgba(255,102,0,1)',
  },
  status: {
    color: 'rgba(255,255,255,1)',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 5,
  },
  description: {
    color: '#121212',
    fontSize: 16,
  },
  icon: {
    color: 'rgba(155,155,155,1)',
    fontSize: 23,
    marginLeft: '15%',
  },
  time: {
    color: 'rgba(155,155,155,1)',
    marginLeft: 12,
  },
  priceDollar: {
    fontSize: 20,

    marginLeft: 4,
  },
  iconRow: {
    height: 27,
    flexDirection: 'row',
    marginTop: 7,
    marginRight: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 37,
    marginTop: 7,
    marginRight: 13,
  },
  descriptionColumn: {
    width: 190,
    marginLeft: 14,
    marginBottom: 52,
  },
  imageRow: {
    height: 105,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 33,
    marginRight: 93,
  },
});
