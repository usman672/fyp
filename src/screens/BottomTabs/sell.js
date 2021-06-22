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
import { getJobsAction } from '../../redux/actions/bankAction';
import { connect } from 'react-redux';
import storage from '../../libs/storage';
import JobsCard from '../../components/buyer/jobsCard';
class Home extends Component {
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
    this.setSeller();
  }

  setSeller = async () => {
    const user = await storage._retrieveData('user');
    console.log(user, 'sjfji');
    await this.setState({
      userName: JSON.parse(user).data.user.name,
    });
    await this.setState({
      image: JSON.parse(user).data.user.photo,
    });
    this.getAllJobs();
  };

  getAllJobs = async () => {
    await this.props.getJobsAction({ search: '' });
  };

  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      this.setSeller();
    });
  }
  onBlur = async (productName) => {
    console.log(productName, 'PK12HABB0050207900414403');
    await this.props.getJobsAction(productName);
  };
  render() {
    const { index, routes } = this.state;
    return (
      <View style={[s.scrollview]}>
        <Header
          badgeCount={this.state.badgeCount}
          image={this.state.image}
          userName={this.state.userName}
          navigation={this.props.navigation}
        />
        <Search navigation={this.props.navigation} onBlur={this.onBlur} />
        <FlatList
          style={{ width: '100%', height: '70%' }}
          data={this.props.allJobs}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <JobsCard
              type="shops"
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
  console.log(state.BankReducer.allJobs.length, 'jefojsoefiojsioj');
  return {
    allJobs: state.BankReducer.allJobs,
  };
};
const mapDispatchToProps = {
  getJobsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({});
