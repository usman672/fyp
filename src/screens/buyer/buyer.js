import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { s, color } from '../../../src/libs/styles';
import Completed from '../../components/buyer/completed';
import InProgress from '../../components/buyer/inProgress';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SettingHeader from '../../components/header/settingHeader';
export default class BuyerScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'inProgress', title: 'In Progress' },
        { key: 'completed', title: 'Done' },
      ],
    };
  }

  initialLayout = { width: Dimensions.get('window').width };

  renderScene = SceneMap({
    inProgress: () => <InProgress navigation={this.props.navigation} />,
    completed: () => <Completed navigation={this.props.navigation} />,
  });

  renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route }) => (
        <Text style={[s.tabTitle]}>{route.title}</Text>
      )}
      indicatorStyle={s.activeTab}
      style={{ backgroundColor: color.white }}
    />
  );

  render() {
    const { index, routes } = this.state;
    return (
      <View style={[s.scrollview]}>
        <SettingHeader
          title="Buying Detail"
          backgroundColor={color.black}
          color={color.white}
        />
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={{ index, routes }}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={this.initialLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
