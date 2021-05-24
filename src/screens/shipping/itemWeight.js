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

export default class ItemWeight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: this.props.weight,
      oz: this.props.oz,
    };
  }
  render() {
    return (
      <View style={styles.form}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>2. How much does your weight item?</Text>
          <Text style={styles.description}>
            Remember to add some weight for packing
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.mainPoint}>Item Weight</Text>
          <View style={{ flexDirection: 'row', marginRight: 5 }}>
            <TextInput
              style={styles.input}
              defaultValue={this.state.weight + ''}
              keyboardType="numeric"
              placeholder="0"
              onChange={(weight) =>
                this.props.onchange('lb', weight.nativeEvent.text)
              }
            />
            <Text style={styles.text}>lb</Text>
            <TextInput
              style={styles.input}
              defaultValue={this.state.oz + ''}
              keyboardType="numeric"
              placeholder="0"
              onChange={(weight) =>
                this.props.onchange('oz', weight.nativeEvent.text)
              }
            />
            <Text style={styles.text}>oz</Text>
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
});
