import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../libs/styles';
import SwitchFun from './Switch';
import {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
} from '../../utils/responsive.js';
export default class NotificationsComponent extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
    };
  }

  componentDidMount() {
    listenToOrientationChange(this);
  }

  componentWillUnMount() {
    removeOrientationChange();
  }

  switchToogleEvent = (value) => {
    this.setState({ value });
    // console.log(value);
    this.props.setNotificationSetting(this.props.variable, value);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardUpper}>
            <Text style={styles.title}>{this.props.heading}</Text>
          </View>
          <Text style={styles.description}>{this.props.detail}</Text>
          <View style={styles.switchTextRow}>
            <Text style={styles.switchText}>Push</Text>
            <SwitchFun
              isEnabled={this.props.value}
              style={styles.switch}
              switchToogle={this.switchToogleEvent}
            />
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
  card: {
    width: widthToDp('100%'),
    height: heightToDp('23%'),
    backgroundColor: color.white,
    marginBottom: widthToDp('0.5%'),
  },
 
  title: {
    color: color.gray,
    fontSize: widthToDp('6%'),
    fontWeight: 'bold',
    marginTop: heightToDp('2%'),
    marginLeft: widthToDp('5%'),
  },
  description: {
    color: color.black,
    fontSize: widthToDp('4%'),
    marginTop: heightToDp('2%'),
    width: widthToDp('91%'),
    marginLeft: widthToDp('5%'),
  },
  switchText: {
    color: color.lightGrey,
    marginTop: heightToDp('0.2%'),
    fontSize: widthToDp('5%'),
    marginRight: widthToDp('70%'),
  },
  switchTextRow: {
    flexDirection: 'row',
    width: widthToDp('88%'),
    marginLeft: widthToDp('5%'),
  },
});
