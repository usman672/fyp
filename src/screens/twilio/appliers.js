import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { s, color } from '../../libs/styles';
import { Search, Header } from '../../components';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getCartProductsAction } from '../../redux/actions/cartAction';
import { myJobsAction } from '../../redux/actions/bankAction';
import { searchHostelsAction } from '../../redux/actions/productAction';
import SettingHeader from '../../components/header/settingHeader';

import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '../../libs/storage';
import JobsCard from '../../components/buyer/jobsCard';
class Appliers extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      image: '',
      userName: '',
      badgeCount: 0,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  componentWillMount() {}

  render() {
    const { index, routes } = this.state;
    return (
      <View style={[s.scrollview]}>
        <SettingHeader title={'Appliers'} color={color.lightGrey} />
        <FlatList
          style={{ width: '100%', height: '70%' }}
          data={this.props.route.params.appliers}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <JobsCard
              type="appliers"
              navigation={this.props.navigation}
              job={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default Appliers;

const styles = StyleSheet.create({});
