import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import { s, color } from '../../libs/styles';
var Spinner = require('react-native-spinkit');

const ListingLoader = (props) => {
  return (
    <View style={{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner
        style={styles.spinner}
        isVisible={true}
        size={20}
        type="FadingCircleAlt"
        color={color.brandRed}
      />
    </View>
  );
};

export default ListingLoader;

const styles = StyleSheet.create({
  headingText: {
    color: color.red,
    fontSize: 18,
  },
});
