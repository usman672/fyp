import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Textarea from 'react-native-textarea';
import Picker from '../../components/input/withoutDesignPicker';
import Payout from '../../components/payout/Payout';
import SellItem from '../../components/item/SellItem';
import { Dropdown } from '../../components';
import IconArrow from 'react-native-vector-icons/AntDesign';
import CustomSeparator from '../../components/separators/customSeparator';
import { s, color } from '../../libs/styles.js';
import SettingHeader from '../../components/header/settingHeader';
import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import PickImageModal from '../../components/modal/pickImage';
import storage from '../../libs/storage';
var Spinner = require('react-native-spinkit');

class sellItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCliked: false,
      switchValue: 0,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      length: 0,
      oz: 0,
      visible: false,
      refresh: 0,
      room: 1,
      seater: 1,
      flag: 0,
      price: '',
      description1: '',
      description2: '',
      description1length: 0,
      description2length: 0,
      color: 'Orange',
      category: '',
      multiple: true,
      editIndex: -1,
      selectedIndex: 0,
      hId: '',
      selectedColorIndex: 0,
      selectCategory: '',
      shipsFrom: '',
      sellingFee: '0.0',
      youEarn: '0.0',
      radio_props: [
        { label: 'Yes', value: 0 },
        { label: 'No', value: 1 },
      ],
      cat: [
        { name: '1 Seater', value: 0 },
        { name: '2 Seater', value: 1 },
        { name: '3 Seater', value: 2 },
        { name: '4 Seater', value: 3 },
        { name: '5 Seater', value: 4 },
      ],

      rooms: [
        { name: 'Room 1', value: 0 },
        { name: 'Room 2', value: 1 },
        { name: 'Room 3', value: 2 },
        { name: 'Room 4', value: 3 },
        { name: 'Room 5', value: 4 },
      ],
      images: [
        { imageUri: '', index: 0 },
        { imageUri: '', index: 1 },
        { imageUri: '', index: 2 },
        { imageUri: '', index: 3 },
        { imageUri: '', index: 4 },
        { imageUri: '', index: 5 },
        { imageUri: '', index: 6 },
        { imageUri: '', index: 7 },
      ],
      pickerColors: [
        { name: 'Orange' },
        { name: 'Yellow' },
        { name: 'Green' },
        { name: 'Blue' },
        { name: 'Indigo' },
        { name: 'Violet' },
        { name: 'Purple' },
        { name: 'Pink' },
        { name: 'Silver' },
        { name: 'Gold' },
        { name: 'Beige' },
        { name: 'Brown' },
        { name: 'Grey' },
        { name: 'Black' },
        { name: 'White' },
      ],
      colors: [
        { label: 'Orange', value: 0 },
        { label: 'Yellow', value: 1 },
        { label: 'Green', value: 2 },
        { label: 'Blue', value: 3 },
        { label: 'Indigo', value: 4 },
        { label: 'Violet', value: 5 },
        { label: 'Purple', value: 6 },
        { label: 'Pink', value: 7 },
        { label: 'Silver', value: 8 },
        { label: 'Gold', value: 9 },
        { label: 'Beige', value: 10 },
        { label: 'Brown', value: 11 },
        { label: 'Grey', value: 12 },
        { label: 'Black', value: 13 },
        { label: 'White', value: 14 },
      ],
      image_urls: [],
      image_uris: [],
    };
    this.setState({ selectCategory: 'Select Category' });
    this.getCategories();
    if (this.props.route.params.isEdit) {
      this.setEditableData();
    } else {
      //   this.setImage(this.props.route.params.uris);
    }
  }
  buttonClicked = (clicked) => {
    this.setState({
      isCliked: clicked,
    });
  };

  componentWillMount() {
    this.props.navigation.addListener('focus', (payload) => {
      this.setState({ category: this.props.route.params.categoryid });
      this.setState({ selectCategory: this.props.route.params.categoryName });
    });
  }
  setEditableData = async () => {
    const copied_Images_path = [...this.state.images];
    const copied_Images_uris = [...this.state.image_uris];
    const copied_Images_urls = [...this.state.image_urls];

    for (let i = 0; i < this.props.route.params.product.img.length; i++) {
      copied_Images_uris[i] = this.props.route.params.product.img[i].image_url;
      copied_Images_urls[i] = {
        image_url: this.props.route.params.product.img[i].image_url,
      };
      copied_Images_path[i].imageUri = this.props.route.params.product.img[
        i
      ].image_url;
    }
    await this.setState({ images: copied_Images_path });
    await this.setState({ image_urls: copied_Images_urls });
    await this.setState({ image_uris: copied_Images_uris });
    await this.setState({
      length: this.props.route.params.product.img.length,
    });
    await this.setState({
      description2: this.props.route.params.product.description,
    });
    var index = this.state.rooms.findIndex(
      (x) => x.value == this.props.route.params.product.roomNumber,
    );
    var index2 = this.state.cat.findIndex(
      (x) => x.value == this.props.route.params.product.seater,
    );

    console.log(
      index,
      index2,
      this.props.route.params.product.roomNumber,
      this.props.route.params.product.seater,
    );
    await this.setState({
      selectedColorIndex: index - 1,
      room: this.props.route.params.product.roomNumber,
    });
    await this.setState({
      selectedIndex: index2 - 1,
      seater: this.props.route.params.product.seater,
    });

    await this.setState({
      price: this.props.route.params.product.price,
    });
  };
  toggleSwitch1 = (value) => {
    this.setState({ switchValue: value });
  };

  onSelectItem = (index, type) => {
    console.log(this.state.rooms[index].name, 'efergft45g  ', index);
    this.setState({
      selectedColorIndex: index,
      room: index + 1,
    });
  };
  onSelectItem2 = (index, type) => {
    console.log(this.state.cat[index].name, 'efergft45g  ', index);
    this.setState({
      selectedIndex: index,
      seater: index + 1,
    });
  };

  getCategories = async () => {
    const res = await this.props.getAllCategoriesAction();
    const user = await storage._retrieveData('user');
    await this.setState({
      hId: JSON.parse(user).data.hostel._id,
    });
  };
  toggle = (value, index) => {
    if (value === 'edit') {
      this.state.multiple = false;
      this.state.editIndex = index;
    } else {
      this.state.multiple = true;
    }
    this.setState({ visible: true });
  };
  check = () => {
    if (this.props.route.params.isEdit) {
      this.props.navigation.navigate('ShippingInfo', {
        switchValue: this.state.switchValue,
        weight: this.props.route.params.product.weight,
        length: this.props.route.params.product.length,
        width: this.props.route.params.product.width,
        height: this.props.route.params.product.height,
        edit: true,
      });
    } else {
      this.props.navigation.navigate('ShippingInfo', {
        switchValue: this.state.switchValue,
        weight: this.state.weight,
        length: this.state.length,
        width: this.state.width,
        height: this.state.height,
        oz: this.state.oz,
      });
    }
  };
  imageUpload = async (imageString) => {
    const res = await this.props.imageUploadAction({
      image_type: 'user',
      image: 'data:' + imageString.mime + ';base64,' + imageString.data,
    });
    return res;
  };
  setImage = async (imageList) => {
    console.log('state.............', imageList.length);
    if (imageList === 1) {
      this.setState({ visible: false });
    } else if (imageList.edit === 'edit') {
      this.setState({ visible: false });
      const res = await this.imageUpload(imageList.imageEdit);
      if (res.code === 0) {
        this.state.image_urls[imageList.index] = { image_url: res.data.image };
        this.state.images[imageList.index].imageUri = imageList.imageEdit.path;
      } else {
        setTimeout(() => {
          Alert.alert('Error', res.message);
        }, 500);
      }
      this.setState({ refresh: 0 });
    } else {
      this.setState({ visible: false });
      for (let i = 0; i < imageList.length; i++) {
        this.state.image_uris.push(imageList[i].path);
      }
      for (let i = 0; i < imageList.length; i++) {
        if (this.state.length <= 8) {
          this.state.images[this.state.length].imageUri = this.state.image_uris[
            this.state.length
          ];
          await this.setState({ refresh: 0 });
          const res = await this.imageUpload(imageList[i]);
          if (res.code === 0) {
            // console.log('url');
            var path = { image_url: res.data.image };
            this.state.image_urls.push(path);
          } else {
            setTimeout(() => {
              Alert.alert('Error', res.message);
            }, 500);
          }
          this.state.length += 1;
        }
      }
    }
  };

  addProduct = async () => {
    // console.log(this.state.image_urls);
    this.buttonClicked(true);
    const res = await this.props.addRoomsAction(
      {
        img: this.state.image_urls,
        description: this.state.description2,
        seater: this.state.seater,
        remaining_seats: parseInt(this.state.seater),
        price: this.state.price,
        roomNumber: this.state.room,
        floor: '2',
      },
      this.state.hId,
    );
    this.buttonClicked(false);
    // console.log(res,"item page");
    if (res.success) {
      Alert.alert('Success', 'Room Added Successfully');
      this.props.navigation.navigate('sellings');
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.error);
      }, 500);
    }
  };
  editProduct = async () => {
    this.buttonClicked(true);
    const res = await this.props.editRoomAction(
      {
        img: this.state.image_urls,
        description: this.state.description2,
        seater: this.state.seater,
        price: this.state.price,
        roomNumber: this.state.room,
        floor: '2',
      },
      this.props.route.params.product._id,
    );
    this.buttonClicked(false);
    if (res.success) {
      this.props.navigation.navigate('sellings');
    } else {
      setTimeout(() => {
        Alert.alert('Error', res.error);
      }, 500);
    }
  };
  onChangeDescription1 = async (desc) => {
    await this.setState({ description1: desc });
    await this.setState({
      description1length: this.state.description1.length,
    });
  };
  onChangeDescription2 = (desc) => {
    this.setState({ description2: desc });
  };
  onChangeUnitPrice = (price) => {
    // console.log('rojorj');
    price = parseFloat(price);
    let sellingFee = (price / 100) * 15;
    sellingFee = sellingFee.toFixed(2);
    const youEarn = price - sellingFee;
    this.setState({ price: price, youEarn: youEarn, sellingFee: sellingFee });
  };

  placeImages = () => {
    let flag = 0;
    return this.state.images.map((element) => {
      if (element.imageUri !== '') {
        return (
          <SellItem
            imageUri={element.imageUri}
            next={9}
            index={element.index}
            setImage={this.setImage}
            toggle={this.toggle}
          />
        );
      } else if (flag == 0) {
        flag = 1;
        return (
          <SellItem
            imageUri={element.imageUri}
            next={flag}
            index={element.index}
            setImage={this.setImage}
            toggle={this.toggle}
          />
        );
      } else {
        return (
          <SellItem
            imageUri={element.imageUri}
            next={0}
            index={element.index}
            setImage={this.setImage}
            toggle={this.toggle}
          />
        );
      }
    });
  };
  getDescription1length = () => {
    return this.state.description1length;
  };
  onSelect = (color) => {};
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        enabled
        keyboardVerticalOffset={55}
        behavior="padding"
      >
        <View style={s.scrollview}>
          <SettingHeader
            title="Add Room"
            backgroundColor=""
            color={color.lightGrey}
          />

          <ScrollView>
            <View style={styles.descriptionViewParent}>
              <View style={styles.descriptionViewChild}>
                <View style={styles.scrollDesign}>
                  {this.state.refresh === 0 && this.placeImages()}
                </View>
                <View style={styles.descriptionTextView}>
                  <Text style={styles.descriptionText}>Description</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputView}>
              <View style={styles.inputViewInternal}>
                <View style={styles.wordLimit}>
                  <Text style={styles.limitText}>
                    {this.getDescription1length()}/40
                  </Text>
                </View>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.describe}
                  value={this.state.description2}
                  onChangeText={(desc2) => this.onChangeDescription2(desc2)}
                  defaultValue={this.state.text}
                  maxLength={500}
                  placeholder={'Describe your room (20+ words)'}
                  placeholderTextColor={color.lightGrey2}
                  underlineColorAndroid={color.lightGrey2}
                />
              </View>
            </View>
            <Payout title="Details" />
            <View
              style={[
                styles.categoryMainExternal,
                Platform.OS === 'ios' ? { zIndex: 1 } : {},
              ]}
            >
              <View
                style={[
                  styles.categoryMainInternal,
                  Platform.OS === 'ios' ? { zIndex: 11 } : {},
                ]}
              >
                {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('category')}>
                  <Amount
                    left="Category"
                    Right={this.state.selectCategory}
                    rightColor={color.lightGrey}
                    icon={true}
                  />
                </TouchableOpacity> */}
                {Platform.OS === 'ios' ? (
                  <Dropdown
                    zIndex={111}
                    heading=""
                    placeholder="Select Color"
                    default={this.state.selectedColorIndex}
                    list={this.state.colors}
                    onSelect={this.onSelectItem}
                  />
                ) : (
                  <Picker
                    heading=""
                    list={this.state.rooms}
                    onSelect={this.onSelectItem}
                    selectedState={this.state.selectedColorIndex}
                  />
                )}

                <CustomSeparator
                  heightt={1}
                  colorr={color.lightGrey2}
                  margintop={'2%'}
                  width={'100%'}
                />
                {Platform.OS === 'ios' ? (
                  <Dropdown
                    zIndex={111}
                    heading=""
                    placeholder="Select Color"
                    default={this.state.selectedColorIndex}
                    list={this.state.colors}
                    onSelect={this.onSelectItem}
                  />
                ) : (
                  <Picker
                    heading=""
                    list={this.state.cat}
                    onSelect={this.onSelectItem2}
                    selectedState={this.state.selectedIndex}
                  />
                )}
              </View>
            </View>
            <Payout title="Pricing" />
            <View style={styles.categoryMainExternal}>
              <View style={styles.categoryMainInternal}>
                <View
                  style={{
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '95%',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: color.black,
                      alignSelf: 'center',
                      width: '50%',
                    }}
                  >
                    Set Price
                  </Text>
                  <View
                    style={{
                      width: '30%',
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                    }}
                  >
                    <TextInput
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        fontSize: 18,
                        textAlign: 'right',
                      }}
                      placeholder="0.0"
                      maxLength={10}
                      value={this.state.price}
                      keyboardType="numeric"
                      onChangeText={(price) => this.onChangeUnitPrice(price)}
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 18 }}>$</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 20, marginTop: 20 }}>
              {this.props.route.params.isEdit ? (
                <TouchableOpacity
                  style={s.buttonbox(color.black, color.black, 'center', '90%')}
                  onPress={() => this.editProduct()}
                >
                  <Text style={s.buttonText}>
                    {this.state.isCliked && (
                      <Spinner
                        style={s.buttonLoader}
                        isVisible={true}
                        size={20}
                        type="FadingCircleAlt"
                        color={color.brandRed}
                      />
                    )}
                    Edit
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={s.buttonbox(color.black, color.black, 'center', '90%')}
                  onPress={() => this.addProduct()}
                >
                  <Text style={s.buttonText}>
                    {this.state.isCliked && (
                      <Spinner
                        style={s.buttonLoader}
                        isVisible={true}
                        size={20}
                        type="FadingCircleAlt"
                        color={color.brandRed}
                      />
                    )}
                    Listing
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {this.state.visible && (
              <PickImageModal
                setImage={this.setImage}
                multiple={this.state.multiple}
                index={this.state.editIndex}
              />
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  addRoomsAction: Actions.addRoomsAction,
  editRoomAction: Actions.editRoomAction,
  imageUploadAction: Actions.imageUploadAction,
  getAllCategoriesAction: Actions.getAllCategoriesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(sellItem);

const styles = StyleSheet.create({
  descriptionViewParent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightGrey3,
  },
  descriptionViewChild: {
    width: (97 * Math.round(Dimensions.get('window').width)) / 100,
    marginTop: '3%',
  },
  selectCategoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionTextView: {
    marginTop: '8%',
    marginLeft: '2%',
    paddingBottom: '5%',
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wordLimit: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  limitText: {
    marginRight: 10,
    color: color.lightGrey4,
  },
  sell: {
    color: color.black,
    width: '100%',
    height: 55,
    fontSize: 16,
  },
  describe: {
    color: color.lightGrey,
    width: '90%',
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  categoryMainExternal: {
    backgroundColor: color.white,
  },
  categoryMainInternal: {
    marginLeft: 15,
  },
  categoryText: {
    fontSize: 17,
    color: color.black,
  },
  selectCategoryOpacity: {
    width: '65%',
  },
  categoryView: {
    width: '25%',
  },
  selectCategory: {
    color: color.lightGrey,
    fontSize: 17,
  },
  icon: {
    color: color.lightGrey2,
    fontSize: 30,
  },
  categoryRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 60,
  },
  inputView: {
    backgroundColor: color.white,
    paddingBottom: 30,
  },
  inputViewInternal: {
    marginLeft: 20,
  },
  standardShipping: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },
  standardShippingTextRight: {
    fontSize: 17,
    color: color.lightGrey,
  },
  standardShippingTextLeft: {
    fontSize: 17,
    color: color.black,
  },
  freeDeliver: {
    marginTop: 12,
    paddingBottom: 5,
    fontSize: 17,
  },
  orText: { color: color.lightGrey, textAlign: 'center' },
  orView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
  },
  scrollDesign: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: (95 * Math.round(Dimensions.get('window').width)) / 100,
  },
  buttonText: {
    color: color.brandRed,
  },
});
