import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Switch,
  Alert,
} from 'react-native';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import { Dropdown } from '../../components';
import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/AntDesign';
import { InputWithoutHeading, Picker } from '../../components';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import { addHelpQueryAction } from '../../redux/actions/helpQueryAction';

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      descripition: '',
      isdescription: false,
      isemail: false,
      email: '',
      selectedSubject: '',
      selectedSubjectIndex: 0,
      subject: [
        { name: 'QUERIES' },
        { name: 'FEEDBACK' },
        { name: 'MONEY RELATED' },
        { name: 'OTHERS' },
      ],
      iosSubject: [
        { label: 'QUERIES', value: 0 },
        { label: 'FEEDBACK', value: 1 },
        { label: 'MONEY RELATED', value: 2 },
        { label: 'OTHERS', value: 3 },
      ],
    };
  }
  onSelectItem = (index, type) => {
    this.setState({
      selectedSubjectIndex: index,
    });
    this.setState({
      selectedSubject: this.state.subject[index].name,
    });
  };
  addHelpQuery = async () => {
    // console.log(this.state.descripition);
    const res = await this.props.addHelpQueryAction({
      type: this.state.subject[this.state.selectedSubjectIndex].name,
      message: this.state.descripition,
    });
    // ('res..................', res);
    if (res.code == 0) {
      this.props.navigation.navigate('HelpCenter');
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.message);
      }, 500);
    }
  };
  onChangeEmail = (email) => {
    if (email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        this.setState({ isemail: false });
      } else {
        this.setState({ email: email, isemail: true });
      }
    } else {
      this.setState({ isemail: false });
    }
  };
  onChangeDescription = (desc) => {
    console.log(desc,2323);
    if (desc) {
      this.setState({ descripition: desc, isdescription: true });
    } else {
      this.setState({ isdescription: false });
    }
  };
  checkfield = () => {
    if (this.state.isdescription) {
      return true;
    }
  };
  render() {
    return (
      <View style={[s.scrollview]}>
        <SettingHeader
          title="Help Center"
          backgroundColor=""
          color={color.lightGrey}
        />
        <ScrollView style={s.scrollview}>
          <View
            style={[
              styles.container,
              Platform.OS === 'ios' ? { zIndex: 11 } : {},
            ]}>
            <View style={styles.main}>
              <Text style={styles.heading}>Contact Us</Text>
              <InputWithoutHeading
                heading="Your Email"
                placeholder="name@example.com"
                ref="email"
                isValid={this.state.isemail}
                onChange={this.onChangeEmail}
              />
              {Platform.OS === 'ios' ? (
                <Dropdown
                  zIndex={111}
                  heading=""
                  placeholder="Select Reason"
                  default={this.state.selectedColorIndex}
                  list={this.state.iosSubject}
                  onSelect={this.onSelectItem}
                />
              ) : (
                <Picker
                  heading=""
                  list={this.state.subject}
                  onSelect={this.onSelectItem}
                  selectedState={this.state.selectedSubjectIndex}
                />
              )}
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.describe}
                onChangeText={(desc2) => this.onChangeDescription(desc2)}
                defaultValue={this.state.text}
                maxLength={500}
                placeholder={
                  'Please describe the issues (minimum 20 characters)'
                }
                placeholderTextColor={color.lightGrey2}
                underlineColorAndroid={color.lightGrey2}
              />
              <Text style={styles.note}>
                Please Don't provide sensitive personal info (e.g. credit card
                number). Up to 500 characters
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                disabled={!this.checkfield()}
                style={
                  this.checkfield()
                    ? s.buttonbox(color.black, color.black, 'center', '80%')
                    : s.buttonbox(color.gray, color.gray, 'center', '80%')
                }
                onPress={this.addHelpQuery}>
                <Text style={s.buttonText}>Contact us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addHelpQueryAction: Actions.addHelpQueryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);

const styles = StyleSheet.create({
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
  },
  describe: {
    color: color.lightGrey,
    width: '90%',
    height: '100%',
    textAlignVertical: 'top',
    fontSize: 16,
    alignSelf: 'center',
  },
  note: {
    margin: 10,
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
