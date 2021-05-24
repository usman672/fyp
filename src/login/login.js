import React, { Component } from 'react';
import {StyleSheet,Text,View} from 'react-native';

export default class login extends Component {

  static navigationOptions = {
    header : null
  };

  constructor(props) {    
    super(props);
  }

  componentWillMount() {}
  
  render() {
    return (
      <View>
        <Text>Login Screen </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
