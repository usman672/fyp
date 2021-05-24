import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import CustomSeparator from '../../components/separators/customSeparator';

export default class Description extends Component {
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
          heightt={3}
          colorr={color.lightGrey3}
          margintop={25}
          width={0}
        />
        <View style={styles.descriptionView}>
          <Text style={styles.generalColor}>Description</Text>
          <View style={styles.descriptionTextView}>
            <Text style={styles.descriptionColor}>
              {this.props.descriptionOne}
              {this.props.descriptionTwo}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionView: {
    flexDirection: 'column',
    width: '90%',
    marginLeft: 20,
    marginTop: '10%',
    //backgroundColor: 'red',
  },
  descriptionTextView: {
    marginTop: '5%',
  },
  descriptionColor: {
    color: color.nearGray,
    fontSize: 15,
  },
  generalColor: {
    color: color.lightGrey2,
    fontSize: 15,
  },
});
