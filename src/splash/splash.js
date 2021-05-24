import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class splash extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('tabnavigator');
    }, 2000);
  }

  render() {
    return (
      <View>
        <Text>Splash </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
