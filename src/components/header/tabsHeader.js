import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';
import AsyncStorage from '@react-native-community/async-storage';

const TabsHeader = (props) => {
  const navigation = useNavigation();
  console.log('ppoo',props)
      
  async function setNavigation() {
    //const userToken = await AsyncStorage.getItem('token');
    // if (userToken === null) {
    //   setTimeout(() => {
    //     Alert.alert(' ', 'You are not logged in');
    //   }, 500);
    // } else {
      
      navigation.navigate('userProfile');
   // }
  }
  return (
    <CardView
      style={[s.headerCard, { backgroundColor: color.black }]}
      cardElevation={neomorph.cardElevation}>
      <View style={s.row}>
        <View style={[s.row]}>
          <TouchableOpacity onPress={setNavigation}>
            <Image
              style={[styles.headerItem, styles.headerImage]}
              source={{ uri: props.image }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{props.userName}</Text>
        </View>
      </View>
    </CardView>
  );
};
export default TabsHeader;
const styles = StyleSheet.create({
  headerImage: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 25,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
  },
});
