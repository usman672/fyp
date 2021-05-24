
import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { s, color } from '../../libs/styles';
import Timeline from 'react-native-timeline-flatlist';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dates from '../../screens/shippingTimeline/date';
export default class Shipping extends React.Component {
  constructor(props) {
    super(props);
  }
  checkDates() {
    if (
      this.props.iconName === 'shipping' ||
      this.props.iconName === 'delivery'
    ) {
      return <Dates text=" By" padding={0} />;
    }
    return null;
  }
  matchIcon() {
    if (this.props.iconName === 'shipping') {
      return <Octicons color={color.lightGrey} name="package" size={45} />;
    } else if (this.props.iconName === 'delivery') {
      return <MaterialCommunityIcons name="truck" size={40} />;
    } else if (this.props.iconName === 'rating') {
      return <MaterialCommunityIcons name="truck" size={40} />;
    } else if (this.props.iconName === 'completed') {
      return <Octicons color={color.lightGrey} name="package" size={45} />;
    }
    return null;
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.row}>{this.checkDates()}</View>
        <View style={styles.packView}>
          {this.matchIcon()}

          <View style={styles.packText}>
            <Text style={styles.upperText}>{this.props.upperText}</Text>
            <Text style={styles.lowerText}>{this.props.lowerText}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: '2%',
  },

  packView: {
    marginTop: '3%',
    padding: 15,
    paddingBottom: 20,
    backgroundColor: color.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: '97%',
    flexDirection: 'row',
  },
  packText: {
    marginLeft: 10,
    justifyContent: 'center',
    marginTop: '2%',
    width: '88%',
  },
  upperText: {
    fontSize: 16,
  },
  lowerText: {
    fontSize: 16,
  },
});
