/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import stripe from 'tipsi-stripe';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import Actions from '../../redux/actions';
import storage from '../../libs/storage';
import JobsCard from '../../components/buyer/jobsCard'

var Spinner = require('react-native-spinkit');

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isUpdate: this.props.route.params.setting,
    };
  }

  componentDidMount() {}

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };


 

  render() {

    const {job}=this.props.route.params;
    console.log(job,'job')
    return (
      <View style={{ flex: 1,backgroundColor:color.white }}>
        <ScrollView  keyboardShouldPersistTaps="always">
          <View style={styles.view}>
            <SettingHeader
              title="Job Description"
              backgroundColor={color.black}
              color={color.white}
            />
            <JobsCard
              type="not"
              navigation={this.props.navigation}
              job={this.props.route.params.job}
            />
            <View  style={styles.main}>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Detail</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.answerText}>
                {job.description}
              </Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Company Name</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.answerText}> {job.company} </Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Job Title</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.answerText}> {job.title}</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Employment Type</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.answerText}> {job.employmentType} </Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Job Type</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.answerText}>{job.jobType}</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Location</Text>
            </View>
            <View style={styles.titleTextView}>
              <Text style={styles.answerText}>{job.address} </Text>
            </View>
            </View>
          </View>
        </ScrollView>
  
       <TouchableOpacity style={styles.button} onPress={()=>this.pay()}> 
            <Text style={styles.applyText}>Apply </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addCardAction: Actions.addCardAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
  titleTextView: {
    width: '95%',
    padding: 5,
  },
  main:{
    width:'95%',
    alignSelf:'center',

  },
  titleText: {
    fontSize: 17,
    color: color.brandRed,
    width:'90%',

  },
  answerText:{
    fontSize:15,
    color:color.lightGrey
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: color.brandRed,
  },
  applyText: {
    color: color.white,
    fontSize: 16,
    
  },
});
