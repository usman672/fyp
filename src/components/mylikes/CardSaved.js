import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { color } from '../../libs/styles';
import {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
} from '../../utils/responsive.js';
import { useNavigation } from '@react-navigation/native';

const CardSaved = (props) => {
  // componentDidMount() {
  //   listenToOrientationChange(this);
  // }

  // componentWillUnMount() {
  //   removeOrientationChange();
  // }
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SearchProduct', {
            savesearch: true,
            searchProduct: true,
            productName: props.name,
          })
        }>
        <View style={styles.cardRow}>
          <View style={styles.cardInternal}>
            <View style={styles.nameColumn}>
              <Text style={styles.name}>{props.name}</Text>
              {/* <Text style={styles.description}>{props.name}</Text> */}
            </View>
            <View style={styles.box}>
              {/* <Text style={styles.textInBox}>{props.count}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardRow: {
    width: '100%',
  },
  cardInternal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: color.lightGrey3,
    borderBottomWidth: heightToDp('0.3%'),
    height: 85,
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  name: {
    color: color.primary,
    fontWeight: 'bold',
    fontSize: widthToDp('4%'),
  },
  description: {
    color: color.lightGrey,
    fontSize: widthToDp('3%'),
    marginTop: heightToDp('0.3%'),
  },
  nameColumn: {
    justifyContent: 'center',
  },
  textInEclipse: {
    position: 'absolute',

    color: color.white,
  },
  textInBox: {
    color: color.primary,
    textAlign: 'center',
  },
});

export default CardSaved;
