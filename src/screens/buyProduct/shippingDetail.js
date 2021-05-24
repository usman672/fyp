import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSeparator from '../../components/separators/customSeparator';
export default class ShippingDetail extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View>
        <CustomSeparator
          heightt={10}
          colorr={color.lightGrey3}
          margintop={20}
          width={'100%'}
        />
        <View style={styles.shippingDetailView}>
          <View style={styles.shippingLeftView}>
            <Text style={styles.generalColor}>Shipping </Text>
            <TouchableOpacity style={styles.questionMark}>
              <Text style={styles.questionColor}>?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shippingRightView}>
            <Text style={styles.rightText}>
              Nationwide Shipping | {'\n'} Free
            </Text>
          </View>
        </View>
        <View style={styles.shippingDetailView}>
          <View style={styles.shippingLeftView}>
            <Text style={styles.generalColor}>Category </Text>
          </View>
          <View style={styles.shippingRightView}>
            <Text style={styles.rightTextBlue}>{this.props.category}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shippingLeftView: {
    marginTop: '10%',
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'flex-start',
  },
  shippingRightView: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
    marginLeft: 15,
  },
  shippingDetailView: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 20,
  },

  questionMark: {
    backgroundColor: color.lightGrey2,
    borderRadius: 8,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionColor: {
    color: color.white,
  },
  generalColor: {
    color: color.lightGrey2,
    fontSize: 15,
  },
  rightText: {
    color: color.black,
    fontSize: 15,
  },
  rightTextBlue: {
    color: color.primary,
    fontSize: 15,
  },
});
