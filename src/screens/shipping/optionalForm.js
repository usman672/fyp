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

export default class OptionalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      length: this.props.length,
      width: this.props.width,
      height: this.props.height,
    };
  }
  render() {
    return (
      <View style={styles.form}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>
            3. How big is your item? (optional)
          </Text>
          <Text style={styles.description}>
            Note: Shipping corriers charges based on weight and size.
          </Text>
        </View>
        <View style={styles.lines}>
          <Text style={styles.mainPoint}>Item lenght</Text>
          <View style={{ flexDirection: 'row', marginRight: 5 }}>
            <TextInput
              style={styles.input}
              defaultValue={this.state.length}
              keyboardType="numeric"
              placeholder="0"
              onChange={(lenght) => {
                this.props.onchange(lenght.nativeEvent.text, 'lenght');
              }}
            />
            <Text style={styles.text}>in</Text>
          </View>
        </View>
        <FlatListItemSeparator />
        <View style={styles.lines}>
          <Text style={styles.mainPoint}>Item width</Text>
          <View style={{ flexDirection: 'row', marginRight: 5 }}>
            <TextInput
              style={styles.input}
              defaultValue={this.state.width}
              keyboardType="numeric"
              placeholder="0"
              onChange={(width) => {
                this.props.onchange(width.nativeEvent.text, 'width');
              }}
            />
            <Text style={styles.text}>in</Text>
          </View>
        </View>
        <FlatListItemSeparator />
        <View style={styles.lines}>
          <Text style={styles.mainPoint}>Item height</Text>
          <View style={{ flexDirection: 'row', marginRight: 5 }}>
            <TextInput
              style={styles.input}
              defaultValue={this.state.height}
              keyboardType="numeric"
              placeholder="0"
              onChange={(height) => {
                this.props.onchange(height.nativeEvent.text, 'height');
              }}
            />
            <Text style={styles.text}>in</Text>
          </View>
        </View>
        <FlatListItemSeparator />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.description}>Don't know the item size?</Text>
          <Text style={styles.text2}>Check out our guide</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: color.white,
    margin: 10,
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  mainPoint: {
    fontWeight: 'bold',
    margin: 10,
  },
  description: {
    color: color.gray,
  },
  headingView: {
    marginLeft: 5,
    padding: 5,
  },
  input: {
    width: 60,
    backgroundColor: color.lightGrey3,
    color: color.primary,
    textAlign: 'right',
  },
  text: {
    color: color.primary,
    alignSelf: 'center',
    margin: 5,
  },
  text2: {
    color: color.primary,
  },
  lines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});
