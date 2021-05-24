import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Balance from '../../components/balance/Balance';
import Button from '../../components/balance/Button';
import { color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';

export default class balance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingHeader
          title="My Balance"
          backgroundColor={color.black}
          color={color.white}
        />
        <View style={styles.box}>
          <Text style={styles.balance}>$83.22</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('payout')}>
            <Text style={styles.type}>Transfer</Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <Button />
          </View>
        </View>
        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => (
            <Balance navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: color.white,
  },
  balance: {
    color: color.gray,
    fontSize: 42,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonView: {
    width: '100%',
    backgroundColor: color.white,
  },
  type: {
    color: color.primary,
    fontSize: 21,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
