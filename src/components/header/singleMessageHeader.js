import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';

const SingleMessageHeader = () => {
  const navigation = useNavigation();
  const { goBack } = navigation;

  return (
    <CardView
      style={[s.headerCard, { backgroundColor: color.black }]}
      cardElevation={neomorph.cardElevation}>
      <View style={styles.main}>
        <View style={styles.backView}>
          <TouchableOpacity style={styles.iconOpacity} onPress={() => goBack()}>
            <AntDesign style={styles.icon} name="left" />
          </TouchableOpacity>
        </View>
        <View style={styles.imgView}>
          <Image
            style={[styles.headerItem, styles.headerImage]}
            source={require('../../assets/mobile.jpg')}
          />
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Taylor</Text>
        </View>
      </View>
    </CardView>
  );
};
export default SingleMessageHeader;

const styles = StyleSheet.create({
  headerItem: {
    marginRight: 5,
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  icon: {
    fontSize: 30,
    color: color.brandRed,
    margin: 10,
  },
  iconOpacity: {
    marginLeft: 5,
  },
  main: {
    width: (100 * s.width) / 100,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backView: {},
  imgView: {
    marginRight: 10,
  },

  titleView: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  title: { fontSize: 24, color: color.white },
});
