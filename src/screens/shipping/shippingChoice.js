import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { s, color } from '../../libs/styles';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import CircleIcon from 'react-native-vector-icons/Feather';
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';

export default class ShippingChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio1: true,
      radio2: '',
    };
  }
  check1 = () => {
    this.setState({ radio1: true, radio2: false });
    this.props.callback({
      radio1: this.state.radio1,
      radio2: false,
    });
  };
  check2 = () => {
    this.setState({ radio1: false, radio2: true });
    this.props.callback({
      radio1: this.state.radio1,
      radio2: true,
    });
  };

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.heading}>1. Hows do you want ship your order</Text>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <TouchableOpacity
            onPress={() => this.check1()}
            style={{ alignSelf: 'center' }}>
            {this.state.radio1 ? (
              <Icon name="check-circle" size={25} color={color.primary} />
            ) : (
              <CircleIcon name="circle" size={25} color={color.primary} />
            )}
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.mainPoint}>Prepaid Label</Text>
            <Text style={styles.description}>
              We'll email a label with shipping protaction.
            </Text>
          </View>
        </View>
        <FlatListItemSeparator />
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <TouchableOpacity
            onPress={() => this.check2()}
            style={{ alignSelf: 'center' }}>
            {this.state.radio2 ? (
              <Icon name="check-circle" size={25} color={color.primary} />
            ) : (
              <CircleIcon name="circle" size={25} color={color.primary} />
            )}
          </TouchableOpacity>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.mainPoint}>Shipping on your own</Text>
            <Text style={styles.description}>
              For big , bulky items. No shipping protaction
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: color.white,
    margin: 10,
  },
  heading: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  mainPoint: {
    fontWeight: 'bold',
  },
  description: {
    color: color.gray,
  },
});
