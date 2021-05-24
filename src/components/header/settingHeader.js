import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';

const SettingHeader = (props) => {
  const navigation = useNavigation();
  const { goBack } = navigation;
  const [count, setCount] = useState(
    props.title === 'FOR SELLER TO RECEIVE EARNINGS' ? 15 : 22,
  );
  navigate = () => {
    console.log(props.title)
    if (props.title == 'Rooms'||props.title == 'Add Room')
      navigation.navigate('sellItem', { isEdit: false });
    else if (props.title == 'Shops'|| props.title == 'Add Product' )
      navigation.navigate('bank', { isEdit: false });
  };
  return (
    <CardView cardElevation={neomorph.cardElevation}>
      <View style={[styles.main, { backgroundColor: color.black }]}>
        <View style={styles.backView}>
          <TouchableOpacity onPress={() => goBack()}>
            <AntDesign style={styles.icon} color={color.brandRed} name="left" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={{ color: color.white, fontSize: count }}>
            {props.title}
          </Text>
        </View>
        {(props.title === 'Shops' ||
          props.title === 'Rooms' ||
          props.title === 'Jobs') && (
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.myStoreBtn}
              onPress={() => navigate()}>
              <Text style={styles.myStoreText}>ADD</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </CardView>
  );
};
export default SettingHeader;

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
  },
  main: {
    width: (100 * s.width) / 100,
    height: 60,
    flexDirection: 'row',
  },
  myStoreBtn: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 5,
    width: 85,
    backgroundColor: color.brandRed,
  },
  myStoreText: {
    fontSize: 14,
    color: color.white,
  },
  backView: {
    width: (25 * s.width) / 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '2%',
  },
  titleView: {
    width: (45 * s.width) / 100,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
