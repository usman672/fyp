import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';
import ImgToBase64 from 'react-native-image-base64';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { s, color } from '../../libs/styles';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import { imageUploadAction } from '../../redux/actions/imageUploadAction';
import AsyncStorage from '@react-native-community/async-storage';
import { PickImageModal } from '../../components/modal/pickImage';

class SellItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      image: '',
    };
  }
  pickImage = () => {
    if (this.props.imageUri !== '') this.props.toggle('edit', this.props.index);
    else this.props.toggle();
  };
  setImage = () => {
    if (this.props.imageUri !== '') {
      return (
        <View style={styles.contentColumn}>
          <Text style={styles.price}>Edit</Text>
        </View>
      );
    } else if (this.props.next === 1) {
      return (
        <View style={styles.addNew}>
          <EvilIcons size={50} color={color.brandRed} name="camera" />
          <Text style={styles.addText}>Add upto 8 photos</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  editable = () => {
    if (this.props.next === 1) {
      return false;
    } else if (this.props.imageUri === '') {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.itemsView}
        onPress={this.pickImage}
        disabled={this.editable()}>
        <ImageBackground
          imageStyle={{ borderRadius: 5, backgroundColor: color.white }}
          style={styles.item}
          width={200}
          resizeMode="cover"
          source={{ uri: this.props.imageUri }}>
          {this.setImage()}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  imageUploadAction: Actions.imageUploadAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SellItem);

const styles = StyleSheet.create({
  contentColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  price: {
    color: color.white,
    backgroundColor: color.blackOpacity,
    alignSelf: 'flex-end',
    padding: 2,
    fontSize: 12,
  },
  itemsView: {
    height: (23 * s.width) / 100,
    width: (23 * s.width) / 100,
    marginTop: '2%',
  },
  item: {
    flex: 1,
    marginLeft: '5%',
  },
  addNew: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    textAlign: 'center',
    color: color.brandRed,
  },
});
