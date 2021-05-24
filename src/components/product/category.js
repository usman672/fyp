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
const Categories = (props) => {
  const navigation = useNavigation();
  return (
    <View style={s.productcardView}>
      <CardView
        style={s.productCard}
        cardElevation={neomorph.elevation}
        cornerRadius={neomorph.cornerRadius}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchProduct', {
              category_id: props.category._id,
              hotcategory: true,
            })
          }>
          <Image
            style={styles.image}
            source={{ uri: props.category.image_url }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View>
          <Text style={s.sellProductDec} numberOfLines={1}>
              {props.category.name}
          </Text>
        </View>
      </CardView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  imageView: {
    height: 100,
    width: '100%',
    alignSelf: 'center',
  },
  image: {
    height: 100,
    width: '100%',
    alignSelf: 'center',
    borderRadius: neomorph.cornerRadius,
  },
});
