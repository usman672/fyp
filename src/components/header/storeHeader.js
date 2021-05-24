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

const StoreHeader = () => {
  const navigation = useNavigation();

  return (
    <CardView style={s.headerCard} cardElevation={neomorph.cardElevation}>
      <View style={styles.main}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('userProfile')}>
            <AntDesign style={styles.icon} name="left" />
          </TouchableOpacity>
        </View>
      </View>
    </CardView>
  );
};

export default StoreHeader;
const styles = StyleSheet.create({
  main: {
    marginLeft: 15,
    justifyContent: 'center',
    height: '8%',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 30,
    color: color.lightGrey,
  },
  title: { marginLeft: 20, fontSize: 24, fontWeight: 'bold' },
});
