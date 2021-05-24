import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../libs/styles.js';
function Detail(props) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.name}>Direct Deposit</Text>
        <View style={styles.iconRow}>
          <Icon name="checkbox-marked-circle" style={styles.icon} />
          <Text style={styles.detail}>
            It is typically takes 5 buisness days for your money to appear in
            your bank account for transfer less than $1000 You will be charged
            a $2 fee
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  box: {
    width: '100%',
    height: 150,
    backgroundColor: color.white,
  },
  name: {
      
    color: color.buttonBlackText,
    fontSize: 18,
    marginTop: 17,
    marginLeft: 74,
  },
  icon: {
    color: color.primary,
    fontSize: 40,
    height: 40,
    marginTop: 5,
    width: 40,
  },
  detail: {
      
    color: color.lightGrey,
    marginLeft: 22,
    marginTop: 10,
  },
  iconRow: {
    height: 100,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 74,
  },
});

export default Detail;
