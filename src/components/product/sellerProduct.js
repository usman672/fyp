import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';
import { useNavigation } from '@react-navigation/native';

const SellerProduct = (props) => {
  const navigation = useNavigation();

  return (
    <View style={s.productcardView}>
      <CardView
        style={s.productCard}
        cardElevation={neomorph.elevation}
        cornerRadius={neomorph.cornerRadius}>
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchProduct')}>
            <Image
              style={styles.image}
              source={props.source}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={s.sellProductDec}>{props.name}</Text>
        </View>
      </CardView>
    </View>
  );
};

export default SellerProduct;
const styles = StyleSheet.create({
  imageView: {
    height: 120,
    width: '100%',
    alignSelf: 'center',
   // alignContent: 'stretch',
  },
  image: {
    height: 120,
    width: '100%',
    alignSelf: 'center',
  },
});
