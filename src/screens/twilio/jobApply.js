
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
var Spinner = require('react-native-spinkit');
import { s, color, neomorph } from '../../libs/styles';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import DocumentPicker from 'react-native-document-picker';
import { uploadPdf } from '../../services/apiList';
import RNFetchBlob from 'rn-fetch-blob';
import RNImageToPdf from 'react-native-image-to-pdf';
 

var isLoading = false;
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      resume: null,
      pdf:null,
    };
  }

  

  saveJob=async()=>{
    this.setState({isCliked:true})
    const res = await uploadPdf(this.state.pdf,this.props.route.params.job._id);
  
    if(res.success){
      this.props. navigation.navigate('tabnavigator', {
        screen: 'sell'
      });
    }else{
      Alert.alert('Message',res.error)
    }
    this.setState({isCliked:false})
  
  }

  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };

  checkField = () => {
    if (this.state.pdf) {
      return true;
    } else {
      return false;
    }
  };

  pickImage = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
     
      let pdf={
        'uri':res.uri,
        'name':res.name,
        'type':'application/pdf',
      };


      this.setState({pdf:pdf})

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
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
                  color={color.white}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.mainheading}>
              <Text style={styles.h1}>Upload CV </Text>
              <Text style={styles.h2}>
                Please upload your resume from device
              </Text>
            </View>
            <View style={styles.imageRound}>
              <TouchableOpacity
                style={styles.plusIcon}
                onPress={() => {
                  this.pickImage();
                }}>
                <Text style={[styles.h1, { fontSize: 40 }]}>+ </Text>
                <Text style={[styles.h1, { fontSize: 18 }]}>{!this.state.pdf ? 'Upload CV' : 'Update'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{}}>
          <TouchableOpacity
            style={[
              this.checkField()
                ? s.buttonbox(color.brandRed, color.brandRed, 'flex-end', '90%')
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
                color={color.white}
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

  plusIcon: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    backgroundColor: color.brandRed,
    marginTop: '40%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: color.brandRed,
  },
  mainheading: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
    backgroundColor: color.brandRed,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    color: color.white,
  },
  h2: {
    fontSize: 15,
    alignSelf: 'center',
    color: color.white,
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
