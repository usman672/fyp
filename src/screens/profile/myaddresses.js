/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ColorPropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
export default class MyAddresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: true,
    };
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.view}>
          <SettingHeader
            title="Address"
            backgroundColor={color.black}
            color={color.white}
          />
          <Text style={styles.field_heading}>Address Where You Live</Text>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              justifyContent: 'space-between',
            }}>
            {!this.props.route.params.setting ? (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.listtext}>Please add your address</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.listtext}>Please edit your address</Text>
              </View>
            )}
            {!this.props.route.params.setting ? (
              <TouchableOpacity
                style={s.buttonbox(color.white, color.black, 'flex-end', '15%')}
                onPress={() =>
                  this.props.navigation.navigate('EditAddress', {
                    setting: this.state.setting,
                  })
                }>
                <Text style={s.buttonBlackText}>ADD</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={s.buttonbox(color.white, color.black, 'flex-end', '15%')}
                onPress={() =>
                  this.props.navigation.navigate('EditAddress', {
                    setting: false,
                  })
                }>
                <Text style={s.buttonBlackText}>EDIT</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.field_heading}>
            Buyer's address will be used for Tax calculation.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: 'white',
    height: 50,
  },
  headerText: {
    margin: 10,
    // color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  field_heading: {
    marginTop: 20,
    marginLeft: '5%',
    marginBottom: 20,
    color: color.lightGrey2,
  },
  listtext: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: '8%',
  },
});
