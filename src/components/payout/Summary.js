import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../libs/styles.js';
import SummaryCard from './SummaryCard';
function Summary(props) {
  return (
    <View style={styles.container}>
      <SummaryCard name="Current balance" price="$57" />
      <SummaryCard name="Free" price="$2" />
      <SummaryCard name="Deposit amount" price="$6.3" />
      <SummaryCard name="Processing time" price="updates" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Summary;
