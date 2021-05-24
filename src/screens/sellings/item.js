import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import Item from '../../components/sellings/Item';
import Button from '../../components/sellings/Button';
import { color } from '../../libs/styles.js';
import SettingHeader from '../../components/header/settingHeader';
function Sell(props) {
  return (
    <ScrollView style={styles.container}>
      <SettingHeader
        title="Sell An Item"
        backgroundColor={color.black}
        color={color.white}
      />
      <View style={styles.box}>
        <View style={styles.i1Row}>
          <Image
            source={require('../../assets/mobile.jpg')}
            resizeMode="stretch"
            style={styles.i1}
          />
          <Image
            source={require('../../assets/mobile.jpg')}
            resizeMode="stretch"
            style={styles.i2}
          />
          <Image
            source={require('../../assets/mobile.jpg')}
            resizeMode="stretch"
            style={styles.i3}
          />
        </View>
        <View style={styles.i4Row}>
          <Image
            source={require('../../assets/mobile.jpg')}
            resizeMode="stretch"
            style={styles.i4}
          />
          <Image
            source={require('../../assets/mobile.jpg')}
            resizeMode="stretch"
            style={styles.i5}
          />
        </View>
        <Text style={styles.description}>Description</Text>
      </View>
      <View style={styles.phoneRow}>
        <Text style={styles.phone}>iPhone Xs</Text>
        <Text style={styles.date}>02/2020</Text>
      </View>
      <Text style={styles.cardPhone}>iPhone Xs</Text>
      <Text style={styles.cardPhone1}>card description ....</Text>
      <Item name="Details" left="Phone" right="hello" />
      <Item name="Delivery" left="ships" right="21323" />
      <Item name="Pricing" left="Sell your price" right="$222" />
      <Button
        name="Update"
        style={{
          height: 50,
          margin: 10,
          backgroundColor: color.primary,
          color: 'white',
        }}
      />
      <Button
        name="Delete"
        style={{
          height: 50,
          margin: 10,
          backgroundColor: color.lightGrey3,
          color: color.black,
          borderColor: color.black,
          borderWidth: 2,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    height: 279,
    backgroundColor: color.lightGrey3,
    alignSelf: 'center',
  },
  i1: {
    width: 94,
    height: 92,
  },
  i2: {
    width: 94,
    height: 92,
    marginLeft: 23,
  },
  i3: {
    width: 94,
    height: 92,
    marginLeft: 23,
  },
  i1Row: {
    height: 92,
    flexDirection: 'row',
    marginTop: 3,
    marginLeft: 16,
    marginRight: 16,
  },
  i4: {
    width: 94,
    height: 92,
  },
  i5: {
    width: 94,
    height: 92,
    marginLeft: 23,
  },
  i4Row: {
    height: 92,
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 16,
    marginRight: 133,
  },
  description: {
    color: color.black,
    fontSize: 16,
    marginTop: 30,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  phone: {
    color: color.black,
  },
  date: {
    color: color.black,
    marginLeft: 200,
  },
  phoneRow: {
    height: 16,
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 18,
    marginRight: 26,
  },
  cardPhone: {
    color: '#121212',
    marginTop: 37,
    marginLeft: 18,
  },
  cardPhone1: {
    marginTop: 12,
    marginLeft: 18,
  },
  detailsBox2: {
    width: '100%',
    height: 67,
    marginTop: 70,
  },
  details3: {
    fontSize: 16,
    marginTop: 24,
    marginLeft: 18,
  },
});

export default Sell;
