import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import { s, color } from '../../libs/styles';
import { ListingLoader } from '../../components';
var Spinner = require('react-native-spinkit');

const LoadMore = (props) => {
  return props.isLoading ? (
    <View style={styles.loader}>
      <ListingLoader />
    </View>
  ) : (
    <View style={styles.loader}>
      <Text style={{ color: color.lightGrey }}>There are no more products</Text>
    </View>
  );
};

export default LoadMore;

const styles = StyleSheet.create({
  loader: {
    marginTop: 16,
    alignItems: 'center',
    padding: 30,
  },
});
