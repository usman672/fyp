import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from '../../libs/styles';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.detailsBox2}>
          <Text style={styles.details3}>{this.props.name}</Text>
        </View>
        <View style={styles.phoneRow}>
          <Text style={styles.phone}>{this.props.left}</Text>
          <Text style={styles.date}>{this.props.right}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phone: {
    color: color.black,
  },
  date: {
    color: color.primary,
    marginLeft: 100,
  },
  phoneRow: {
    height: 16,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 18,
    marginRight: 26,
  },
  detailsBox2: {
    width: '100%',
    height: 67,
    backgroundColor: color.lightGrey3,
    marginTop: 20,
  },
  details3: {
    color: color.black,
    fontSize: 16,
    marginTop: 24,
    marginLeft: 18,
  },
});
