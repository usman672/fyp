import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
var Spinner = require('react-native-spinkit');
import { s, color, neomorph } from '../../libs/styles';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import Picker from '../../components/input/withoutDesignPicker';
var isLoading = false;
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      position: '',
      experience: '',
      selectedJobType: 'Senior',
      salary: '',
      location: '',
      description: '',
      isPositon: false,
      isExperience: false,
      isJobCat: false,
      isSalary: false,
      isLocation: false,
      isDescription: false,
      statesList: [],
      selectedEmpType: 'Full Time',
      companyName: '',
      isCompanyName: false,
      empType: [
        { name: 'Full Time', value: 0 },
        { name: 'Part Time', value: 1 },
        { name: 'Remoter', value: 2 },
      ], jobType: [
        { name: 'Senior', value: 0 },
        { name: 'junior', value: 1 },
        { name: 'intern', value: 2 },
      ],
      countriesList: [],
    };

   }

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };
  onSelectEmpType = (index, type) => {
    console.log(this.state.empType[index].name, 'efergft45g  ', index);
    this.setState({
      selectedEmpType: this.state.empType[index].name,
    });
  };
  onSelectJobType = (index, type) => {
    console.log(this.state.jobType[index].name, 'efergft45g  ', index);
    this.setState({
      selectedJobType: this.state.jobType[index].name,
    });
  };
  editAddress = async () => {};
  saveJob = async () => {
    this.buttonClicked();
    console.log({
      title: this.state.position,
      description: this.state.description,
      salary: parseInt(this.state.salary),
      jobType: this.state.jobCat,
      experience: this.state.experience,
      address: this.state.location,
    });
    const res = await this.props.postJobAction({
      title: this.state.position,
      description: this.state.description,
      salary: parseInt(this.state.salary),
      jobType: this.state.selectedJobType,
      experience: this.state.experience,
      address: this.state.location,
      company: this.state.companyName,
      employmentType:this.state.selectedEmpType
    });
    if (res) {
      console.log(res);
    }
  };

  onChangeposition = (newText) => {
    console.log(newText);
    if (newText) {
      this.setState({ position: newText, isPositon: true });
    } else {
      this.setState({ position: newText, isPossiton: false });
    }
  };
  onChangeExperience = (newText) => {
    console.log(newText);
    if (newText) {
      this.setState({ experience: newText, isExperience: true });
    } else {
      this.setState({ experience: newText, isExperience: false });
    }
  };

  onChangeSalary = (newText) => {
    console.log(newText);
    if (newText) {
      this.setState({ salary: newText, isSalary: true });
    } else {
      this.setState({ salary: newText, isSalary: false });
    }
  };
  onChangeLocation = (newText) => {
    console.log(newText);
    if (newText) {
      this.setState({ location: newText, isLocation: true });
    } else {
      this.setState({ location: newText, isLocation: false });
    }
  };
  onChangeDescription = (newText) => {
    console.log(newText);
    if (newText) {
      this.setState({ description: newText, isDescription: true });
    } else {
      this.setState({ description: newText, isDescription: false });
    }
  };

  onChangeCompanyName = (newText) => {
    console.log(newText);
    if (newText) {
      this.setState({ companyName: newText, isCompanyName: true });
    } else {
      this.setState({ companyName: newText, isCompanyName: false });
    }
  };

  checkField = () => {
    if (
      this.state.isDescription &&
      this.state.isLocation &&
      this.state.isSalary &&
      this.state.isExperience &&
      this.state.isPositon &&
      this.state.isCompanyName
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { goBack } = this.props.navigation;

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: color.white,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        enabled
        behavior="padding">
        <ScrollView style={s.scrollview} keyboardShouldPersistTaps="always">
          <View style={[styles.view]}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  name="close"
                  size={30}
                  color="gray"
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.mainheading}>
              <Text style={styles.h1}>POST JOB </Text>
              <Text style={styles.h2}>Please post your job</Text>
            </View>

            <View
              style={[
                styles.fieldsview,
                Platform.OS === 'ios' ? { zIndex: 1 } : {},
              ]}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={{ margin: 12, width: '50%' }}>Job Title</Text>
                <Text style={{ margin: 12, width: '30%' }}> Job type</Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  width: '95%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '55%',
                    borderColor: color.lightGrey1,
                    borderWidth: 0.3,
                    borderRadius: 5,
                    paddingBottom: 2,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeposition}
                    value={this.state.position}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    width: '40%',
                    borderColor: color.lightGrey1,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    paddingBottom: 2,
                    alignSelf: 'center',
                  }}>
                  <Picker
                    heading=""
                    list={this.state.jobType}
                    onSelect={this.onSelectJobType}
                    selectedState={this.state.selectedJobType}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={{ margin: 12, width: '50%' }}>
                  Employment Type
                </Text>
                <Text style={{ margin: 12, width: '30%' }}>Salary</Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  width: '95%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '55%',
                    borderColor: color.lightGrey1,
                    borderWidth: 0.3,
                    borderRadius: 5,
                    paddingBottom: 2,
                    alignSelf: 'center',
                  }}>
                  <Picker
                    heading=""
                    list={this.state.empType}
                    onSelect={this.onSelectEmpType}
                    selectedState={this.state.selectedEmpType}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    width: '40%',
                    borderColor: color.lightGrey1,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    paddingBottom: 2,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={this.onChangeSalary}
                    value={this.state.salary}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={{ margin: 12, width: '50%' }}>Company Name</Text>
                <Text style={{ margin: 12, width: '30%' }}> Experience </Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  width: '95%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '55%',
                    borderColor: color.lightGrey1,
                    borderWidth: 0.3,
                    borderRadius: 5,
                    paddingBottom: 2,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={styles.input}
                    value={this.state.companyName}
                    onChangeText={this.onChangeCompanyName}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    width: '40%',
                    borderColor: color.lightGrey1,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    paddingBottom: 2,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={this.onChangeExperience}
                    value={this.state.experience}
                  />
                </View>
              </View>
              <Text style={{ margin: 12 }}>Location</Text>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderColor: color.lightGrey1,
                  borderWidth: 0.3,
                  borderRadius: 5,
                  paddingBottom: 2,
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  value={this.state.location}
                  onChangeText={this.onChangeLocation}
                />
              </View>

              <Text style={{ margin: 12 }}>Detail Description</Text>

              <View
                style={{
                  backgroundColor: 'white',
                  width: '95%',
                  borderColor: color.lightGrey1,
                  borderWidth: 0.3,
                  paddingBottom: 20,
                  borderRadius: 5,
                  paddingBottom: 2,
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  numberOfLines={6}
                  onChangeText={this.onChangeDescription}
                  value={this.state.description}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{}}>
          <TouchableOpacity
            style={[
              this.checkField()
                ? s.buttonbox(color.black, color.black, 'flex-end', '90%')
                : s.buttonbox(color.gray, color.gray, 'flex-end', '90%'),
              { flexDirection: 'row' },
            ]}
            disabled={!this.checkField()}
            onPress={this.saveJob}>
            {this.state.isCliked && (
              <Spinner
                style={s.buttonLoader}
                isVisible={true}
                size={20}
                type="FadingCircleAlt"
                color={color.brandRed}
              />
            )}
            <Text style={s.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  postJobAction: Actions.postJobAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: color.white,
    marginBottom: 5,
    paddingBottom: 5,
  },
  pickerView: {
    width: '95%',
    alignSelf: 'center',
    borderColor: color.lightGrey1,
    borderWidth: 0.3,
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: color.white,
    alignSelf: 'center',
    fontSize: 15,
    width: '95%',
    padding: 10,
  },
  header: {
    flex: 1,
    alignContent: 'stretch',
    height: 50,
  },
  mainheading: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  h2: {
    fontSize: 15,
    alignSelf: 'center',
  },
  checkbox: {
    borderRadius: 1,
  },
  checkboxText: {
    alignSelf: 'center',
    fontSize: 15,
  },
  fieldsview: {
    marginBottom: 50,
  },
});
