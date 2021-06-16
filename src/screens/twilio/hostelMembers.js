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

import SettingHeader from '../../components/header/settingHeader';

import { connect } from 'react-redux';
import Actions from '../../redux/actions';

import JobsCard from '../../components/buyer/jobsCard';
class HostelMembers extends Component {
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

  async componentWillMount () {
   await this.props.getHostelMembersAction();
  }
  
  render() {
    const { index, routes } = this.state;
     return (
      <View style={[s.scrollview]}>
       <SettingHeader
          title={'Appliers'}
          color={color.lightGrey}

        />
         <FlatList
          style={{ width: '100%', height: '70%' }}
          data={this.props.hostelMembers}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <JobsCard
              type="members"
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



const mapStateToProps = (state) => {
    return {hostelMembers: state.BankReducer.hostelMembers,};
  };
  
  const mapDispatchToProps = {
    getHostelMembersAction: Actions.getHostelMembersAction,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HostelMembers);

const styles = StyleSheet.create({});
