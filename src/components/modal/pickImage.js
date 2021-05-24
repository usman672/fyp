import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { s, color } from '../../libs/styles';
import ImagePicker from 'react-native-image-crop-picker';
import Actions from '../../redux/actions';
import { imageUploadAction } from '../../redux/actions/imageUploadAction';
import AsyncStorage from '@react-native-community/async-storage';

class PickImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: [],
      paths: [],
    };
  }
  onCamera = () => {
    ImagePicker.openCamera({
      includeBase64: true, // for base 64 string
      quality: 0.1,
      compressImageQuality: 0.1,
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    }).then((image) => {
      var imageCamera = [];
      imageCamera[0] = image;
      if (!this.props.multiple) {
        var edit = { imageEdit: image, edit: 'edit', index: this.props.index };
        // console.log(edit.imageEdit.data);
        this.props.setImage(edit);
      } else if (this.props.index === 9) {
        this.props.setImage(imageCamera);
        this.props.navigation.navigate('sellItem', {
          uris: imageCamera,
        });
      } else {
        this.props.setImage(imageCamera);
      }
    });
  };
  openLibrary = () => {
    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    }).catch(e => {
    });
    if (this.props.index === 9) {
      this.props.setImage();
    }
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: this.props.multiple,
      quality: 0.1,
      mediaType: 'photo',
    }).then((image) => {
      var j = 0;
      if (!this.props.multiple) {
        var edit = { imageEdit: image, edit: 'edit', index: this.props.index };
        // console.log(edit.imageEdit.data);
        this.props.setImage(edit);
      } else {
        image.map((i) => {
          this.state.uri.push(i);
          j++;
          return { uri: i.path };
        });
        if (this.props.index === 9) {
          this.props.setImage('imageCamera');
          this.props.navigation.navigate('sellItem', {
            uris: image,
          });
        } else this.props.setImage(this.state.uri);
      }
    });
  };
  onCancel = () => {
    this.props.setImage(1);
  };
  render() {
    return (
      <Modal animationType="slide" transparent={true} isVisible={true}>
        <View style={[s.pickerModal]}>
          <View style={[s.pickerCard]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.panelTitle}>List New Item</Text>
              <Text style={styles.panelSubtitle}>Quality Image Required</Text>
            </View>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={this.onCamera}>
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={this.openLibrary}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton}
              onPress={this.onCancel}>
              <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  imageUploadAction: Actions.imageUploadAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickImageModal);
const styles = StyleSheet.create({
  panelHeader: {
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: color.black,
  },
  panelSubtitle: {
    fontSize: 14,
    color: color.lightGrey2,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    height: 45,
    borderRadius: 10,
    backgroundColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
    width: '80%',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: color.white,
  },
});
