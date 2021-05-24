import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../libs/styles.js';
class Balance extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.imageRow}>
            <Image
              source={require('../../assets/mobile.jpg')}
              resizeMode="stretch"
              style={styles.image}
            />
          </View>
          <View style={styles.rightRow}>
            <View style={styles.nameColumn}>
              <Text style={styles.name}>Sales earnings</Text>
              <Text style={styles.dateTime}>03/02/2020 3:22 PM</Text>
            </View>
            <Text style={styles.balance1}>$83.22</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    height: 76,
    backgroundColor: color.white,
    flexDirection: 'row',
    marginTop: '2%',
  },
  image: {
    width: 81,
    height: 76,
  },
  name: {
    color: color.lightGrey,
    fontSize: 19,
  },
  dateTime: {
    color: color.lightGrey2,
    fontSize: 14,
    marginTop: 5,
  },
  nameColumn: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  balance1: {
    color: color.lightGrey,
    fontSize: 19,
    textAlign: 'center',
    alignSelf: 'center',
  },
  imageRow: {
    width: '20%',
    height: 76,
    flexDirection: 'row',
  },
});

export default Balance;
