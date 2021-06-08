import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { AirbnbRating } from 'react-native-ratings';
import { s, color } from '../../libs/styles';
import CardView from 'react-native-cardview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clockRunning } from 'react-native-reanimated';
import itemDetails from '../../screens/buyProduct/itemDetails';

export default class JobsCard extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {job}=this.props;
    console.log(job,'oooooooooooooooooooooooooooooooo');
    return (
      <CardView
        style={[
          styles.cardStyle,
          {
            shadowOpacity: 0.4,
            shadowColor: '#ADB6D4',
          },
        ]}
        cardElevation={15}
        cornerRadius={7}>
        <View>
        <View style={styles.upperbutton}>
            <Text style={styles.upperButtonText}>Company : {job.company ? job.company : 'Tridev'} </Text>
          </View>
          <View style={styles.upperLayer}>
            <Text style={styles.upperLeftText}>{job.title ? job.title : 'React Developer'}</Text>
            <Text style={styles.upperRightText}>{moment(job.created_at).format('DD/MM/YY')}</Text>
          </View>
          <View style={styles.lowerLayer}>
            <View style={styles.locationView}>
              <MaterialIcons
                size={16}
                color={color.brandRed}
                name="location-on"
              />
              <Text style={styles.lowerLeftText}> {job.address ? job.address: 'Gulberg, Lahore'}</Text>
            </View>

            <Text style={styles.lowerRightText}>{job.employmentType ? job.employmentType : 'Full Time' }</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.applyText}>Apply </Text>
          </View>
        </View>
      </CardView>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    alignSelf: 'center',
    width: s.width - 20,
    margin: 5,
   padding:5
  },
  upperLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  lowerLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  upperLeftText: {
    fontSize: 17,
  },
  upperRightText: {
    color: color.brandRed,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerLeftText: {
    fontSize: 14,
  },
  upperbutton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor:color.brandRed,
    borderWidth:0.5,
    borderRadius:20
  },
  upperButtonText:{
    color:color.brandRed,
    fontSize:15,
    fontWeight:'bold'
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: color.brandRed,
    marginTop:10
  },
  applyText: {
    color: color.white,
    fontSize: 16,
    
  },
});
