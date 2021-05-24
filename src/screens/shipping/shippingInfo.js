import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { s, color } from '../../libs/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import CircleIcon from 'react-native-vector-icons/Feather';
import FlatListItemSeparator from '../../components/separators/horizontalSeparator';
import ShippingChoice from './shippingChoice';
import ItemWeight from './itemWeight';
import OptionalForm from './optionalForm';
import SettingHeader from '../../components/header/settingHeader';

export default class ShippingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio1: true,
      radio2: false,
      weightlb: '',
      weightoz: '',
      weight: '',
      lenght: '',
      width: '',
      height: '',
    };
    if (!this.props.route.params.edit) this.setData();
  }
  setData() {
    console.log("werifioerjho")
    this.setState({
      weight: this.props.route.params.weight,
      oz: this.props.route.params.oz,
      height: this.props.route.params.height,
      width: this.props.route.params.width,
      lenght: this.props.route.params.length,
    });
  }

  getResponse(result) {
    this.setState({ radio1: result.radio1, radio2: result.radio2 });
  }
  getWeight = (unit, data) => {
    if (unit === 'oz') {
      this.setState({ weightoz: data });
    } else if (unit === 'lb') {
      this.setState({ weightlb: data });
    }
    // console.log(this.state.weight, 1213241);
  };
  getsize = (data, type) => {
    console.log("efvioojkevioj")
    if (type === 'lenght') {
      console.log(data, 'len');
      this.setState({ lenght: data });
    } else if (type === 'width') {
      this.setState({ width: data });
    } else if (type === 'height') {
      this.setState({ height: data });
    }
  };
  getComponent = () => {
    if (this.props.route.params.edit) {
      return (
        <>
          <ItemWeight
            weight={Math.trunc(this.props.route.params.weight / 16)}
            oz={this.props.route.params.weight % 16}
            edit={true}
            onchange={this.getWeight}
          />
          <OptionalForm
            height={this.props.route.params.height}
            width={this.props.route.params.width}
            length={this.props.route.params.length}
            edit={true}
            onchange={this.getsize}
          />
        </>
      );
    } else {
      return (
        <>
          <ItemWeight
            weight={this.props.route.params.weight}
            oz={this.props.route.params.oz}
            onchange={this.getWeight}
          />
          <OptionalForm
            height={this.props.route.params.height}
            width={this.props.route.params.width}
            length={this.props.route.params.length}
            onchange={this.getsize}
          />
        </>
      );
    }
  };
  render() {
    return (
      <View style={s.scrollview}>
        <SettingHeader
          title="Shipping"
          backgroundColor=""
          color={color.lightGrey}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
          enabled
          keyboardVerticalOffset={0}
          behavior="padding">
          <ScrollView style={{ flex: 1 }}>
            <View>
              {this.props.route.params.switchValue === 0 ? (
                <ShippingChoice callback={this.getResponse.bind(this)} />
              ) : null}
              {!this.state.radio2 ? (
                <View>{this.getComponent()}</View>
              ) : (
                <View>
                  <Text />
                </View>
              )}
              <TouchableOpacity
                style={s.buttonbox(color.black, color.black, 'center', '90%')}
                onPress={() => {
                  this.props.navigation.navigate('sellItem', {
                    weight:
                      parseFloat(this.state.weightlb * 16) +
                      parseFloat(this.state.weightoz),
                    height: this.state.height,
                    length: this.state.lenght,
                    width: this.state.width,
                    ownshiping: this.state.radio2,
                  });
                }}>
                <Text style={s.buttonText}>
                  {this.state.radio2 ? 'Save' : 'Calculate Shipping'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
