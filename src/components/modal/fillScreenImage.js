import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ImageBackground,
  StatusBar
} from 'react-native';
import {s, color, neomorph} from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import MapView from 'react-native-maps';
export default class FullScreenImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeller: '',
    };
      StatusBar.setHidden(true);
  }
  render() {
    return (
      <Modal animationType="slide" transparent={true} isVisible={true}>
       
  
        {/* <ImageBackground
          source={{uri: this.props.uri}}
          resizeMode="cover"
          style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => this.props.visibleFalse()}>
            <Icon name="left" size={25} color="white" />
          </TouchableOpacity>4piotg
        </ImageBackground>
         */}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: s.height - 60,
    width: s.width,
    backgroundColor: 'white',
  },
  zoomImage: {
    width: '100%',
    height: '93%',
  },
  header: {
    height: 40,
    margin: 10,
    backgroundColor: 'black',
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
