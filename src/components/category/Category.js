import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { color } from '../../libs/styles';

class Category extends Component {
  render() {
    return (
      <View style={styles.dressAllStack}>
        <Text style={styles.dressAll}></Text>
        <View style={styles.box}>
          <View style={styles.typeRow}>
            <Text style={styles.type}>{this.props.item.name}</Text>
            <Icon name={this.props.nameIcon} style={styles.icon}></Icon>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dressAll: {
    color: color.primary,
  },
  box: {
    borderWidth: 1,
    borderColor: color.lightGrey2,
    borderBottomWidth: 2,
    borderTopWidth: 0,
    flexDirection: 'row',
  },
  type: {
    color: color.darkgray,
    fontSize: 15,
  },
  icon: {
    color: color.primary,
    fontSize: 30,
    width: 40,
  },
  typeRow: {
    height: 41,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:25,
    flex: 1,
  },
  dressAllStack: {
    width: '100%',
    height: 75,
  },
});

export default Category;
