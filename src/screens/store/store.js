import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
import SettingHead from '../../components/header/settingHeader';

export default class FullScreenImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeller: '',
      latitude: 37.78825,
      longitude: -122.4324,
    };
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <View style={styles.container}>
        <SettingHead
          title="Live Location"
          backgroundColor=""
          color={color.lightGrey}
        />

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            latitude: parseFloat(this.props.route.params.latitude),
            longitude: parseFloat(this.props.route.params.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followUserLocation={true}
          pitchEnabled={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          minZoomLevel={10} // default => 0
          maxZoomLevel={45} // default => 20
          enableZoomControl={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}>
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.props.route.params.latitude),
              longitude: parseFloat(this.props.route.params.longitude),
            }}
            description={'This is a marker in React Natve'}>
            <Image
              source={require('../../assets/marker.jpg')}
              style={{ height: 30, width: 30, borderRadius: 23 }}
            />
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: s.height - 60,
    width: s.width,
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
