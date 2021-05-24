/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { s, color } from '../../libs/styles';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageStack}>
            <Image
              source={require('../../assets/mobile.jpg')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.data}>
            <View>
              <Text style={styles.name}>Face mask X 6</Text>
              <Text style={styles.time}>Posted 10 mint ago</Text>
              <Text style={styles.amount}>$40</Text>
            </View>
            <View>
              <Icon name="heart-circle-outline" size={35}/>
              <Text>0 Likes</Text>
            </View>
          </View>
          <TouchableOpacity
            style={s.buttonbox(color.black, color.black, 'flex-end', '50%')}>
            <Text style={s.buttonText}>Add to cart </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imageStack: {
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
  data: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 15,
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
