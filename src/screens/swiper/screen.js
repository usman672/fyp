import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View, // Container component
  Image,
} from 'react-native';
import { s, color } from '../../libs/styles';
import Swiper from './swiper';

export default class Screen extends Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../../assets/intro/1.png')}
            resizeMode="stretch"
          />
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../../assets/intro/2.png')}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../../assets/intro/3.png')}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={require('../../assets/intro/4.png')}
            resizeMode="stretch"
          />
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'white',
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  image: {
    width: (95 * s.width) / 100,
    height: (75 * s.height) / 100,
  },
});
AppRegistry.registerComponent('Screen', () => Screen);
