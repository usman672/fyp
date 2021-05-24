import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Shoping from '../../components/payout/Shoping';
import { color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';

function Success(props) {
  return (
    <View>
      <SettingHeader title="" backgroundColor="" color={color.lightGrey} />
      <View style={styles.container}>
        <View style={styles.insideContainer}>
          <Icon name="checkbox-marked-circle" style={styles.icon} />
          <Text style={styles.success}>Success!</Text>
          <Text style={styles.description}>
            Dates for Transfer: 03/19 - 05/20
          </Text>
          <Text style={styles.thanks}>
            Transfer funds has been done! Thanks
          </Text>
          <Text style={styles.faq}>Check payout FAQs</Text>
          <Shoping />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    flex: 1,
    width: '100%',
  },
  icon: {
    color: color.primary,
    fontSize: 110,
    alignSelf: 'center',
  },
  success: {
    color: color.black,
    fontSize: 35,
    marginTop: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: color.black,
    fontSize: 21,
    marginTop: 33,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thanks: {
    color: color.black,
    marginTop: 36,
    textAlign: 'center',
  },
  faq: {
    color: color.primary,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Success;
