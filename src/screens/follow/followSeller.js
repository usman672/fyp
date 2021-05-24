import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from 'react-native';
import { s, color } from '../../libs/styles';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toggle from '../../components/switch/switch';
import SettingHeader from '../../components/header/settingHeader';
export default class FollowSeller extends Component {
  constructor() {
    super();
    this.state = {
      switch1Value: false,
      soldTag: '',
      array: [
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
          sold: '',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
          sold: '',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
          sold: 'sold',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '23',
          sold: '',
        },
        {
          title: require('../../assets/product4.jpg'),
          price: '266',
          sold: '',
        },
        {
          title: require('../../assets/product3.jpg'),
          price: '23',
          sold: 'sold',
        },
      ],
    };
  }

  hideSoldItems = () => {
    return this.state.array.map((element) => {
      if (element.sold == '')
        return (
          <View style={styles.hide}>
            <View style={styles.itemsView}>
              <ImageBackground
                style={styles.item}
                resizeMode="stretch"
                source={element.title}>
                <View style={styles.contentColumn}>
                  <Text></Text>
                  <Text style={styles.price}>{element.price}</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        );
      return null;
    });
  };
  showAllItems = () => {
    return this.state.array.map((element) => {
      return (
        <View style={styles.itemsView}>
          <ImageBackground
            style={styles.item}
            resizeMode="stretch"
            source={element.title}>
            <View style={styles.contentColumn}>
              {element.sold == '' ? (
                <Text></Text>
              ) : (
                <Text style={styles.sold}>{element.sold}</Text>
              )}
              <Text style={styles.price}>{element.price}</Text>
            </View>
          </ImageBackground>
        </View>
      );
    });
  };
  toggleSwitch1 = (value) => {
    this.setState({ switch1Value: value });
  };

  render() {
    return (
      <View style={s.scrollview}>
        <SettingHeader
          title="Follow Seller"
          backgroundColor=""
          color={color.lightGrey}
        />
        <ScrollView style={[s.scrollview]}>
          <View style={styles.row}>
            <ImageBackground
              imageStyle={{ borderRadius: 50 }}
              style={styles.image}
              source={require('../../assets/mobile.jpg')}></ImageBackground>
            <View style={styles.followView}>
              <Text style={styles.titleSize}>STOP&SHOP</Text>
              <TouchableOpacity style={styles.followOpacity}>
                <Text style={styles.followText}>+ Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
          <HorizontalSeparator />
          <View style={styles.row}>
            <MaterialIcons style={styles.starIcon} name="star" size={30} />
            <MaterialIcons style={styles.starIcon} name="star" size={30} />
            <MaterialIcons style={styles.starIcon} name="star" size={30} />
            <MaterialIcons style={styles.starIcon} name="star" size={30} />
            <MaterialIcons style={styles.starIcon} name="star" size={30} />
            <Text style={styles.reviewsText}> 32 reviews</Text>
          </View>
          <View style={styles.optionsList}>
            <HorizontalSeparator />
          </View>

          <View style={styles.hideRow}>
            <Text style={styles.allItemsText}>All Items</Text>
            <View style={styles.switchRow}>
              <Text style={styles.hideLabel}>Hide Sold Items</Text>
              <Toggle
                toggleSwitch1={this.toggleSwitch1}
                switch1Value={this.state.switch1Value}
              />
            </View>
          </View>
          <View style={styles.allItems}>
            {this.state.switch1Value == false
              ? this.showAllItems()
              : this.hideSoldItems()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
  itemsView: {
    width: '30%',
    marginLeft: '2%',
  },
  allItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: '3%',
    width: (95 * Math.round(Dimensions.get('window').width)) / 100,
  },
  itemsView: {
    width: (30 * Math.round(Dimensions.get('window').width)) / 100,
    height: (30 * Math.round(Dimensions.get('window').width)) / 100 + 20,
    marginTop: '3%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hideLabel: {
    fontSize: 16,
    color: color.lightGrey,
  },
  allItemsText: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

  row: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
  },
  reviewsText: {
    marginLeft: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },

  image: {
    width: 100,
    height: 100,
  },
  item: {
    flex: 1,
  },

  titleSize: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  starIcon: {
    color: color.starIcon,
  },
  optionsList: {
  
  },
  contentColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  price: {
    color: 'white',
    backgroundColor: color.blackOpacity,
    alignSelf: 'flex-start',
    padding: 5,
  },
  sold: {
    color: color.white,
    backgroundColor: color.orangeOpacity,
    width: (30 * Math.round(Dimensions.get('window').width)) / 100,
    textAlign: 'center',
    fontSize: 16,
  },
  followOpacity: {
    borderRadius: 5,
    height: 35,
    width: 100,
    borderColor: color.brandRed,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  followText: {
    fontSize: 16,
    color: color.brandRed,
    fontWeight: 'bold',
  },
  followView: {
    marginLeft: '5%',
  },
});
