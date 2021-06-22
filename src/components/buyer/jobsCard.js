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
    const { job } = this.props;
    console.log(job, 'oooooooooooooooooooooooooooooooo');
    if (this.props.type === 'appliers')
      return (
        <CardView
          style={[
            styles.cardStyle,
            {
              shadowOpacity: 0.4,
              shadowColor: color.black,
            },
          ]}
          cardElevation={13}
          cornerRadius={7}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Resume',
                source:
                  ' https://myhostelv1app.herokuapp.com/api/v1/static/' +
                  job.cv,
              })
            }
          >
            <View style={s.row}>
              <View style={[s.row]}>
                <View onPress={this.setNavigation}>
                  <Image
                    source={{ uri: job.photo }}
                    style={[styles.headerItem, styles.headerImage]}
                  />
                </View>
                <Text style={styles.title}>{job.name}</Text>
              </View>
              <View
                style={[
                  styles.button,
                  { width: '35%', height: '70%', borderRadius: 10 },
                ]}
              >
                <Text style={[styles.applyText, { fontSize: 14 }]}>
                  Open Resume{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </CardView>
      );
    else if (this.props.type === 'members') {
      console.log(this.props.job.roommats, 'opop');
      return this.props.job.roommats.map((roomate) => {
        return (
          <CardView
            style={[
              styles.cardStyle,
              {
                shadowOpacity: 0.4,
                shadowColor: color.black,
              },
            ]}
            cardElevation={13}
            cornerRadius={7}
          >
            <View style={s.row}>
              <View style={[s.row]}>
                <View onPress={this.setNavigation}>
                  <Image
                    source={{ uri: roomate.photo }}
                    style={[styles.headerItem, styles.headerImage]}
                  />
                </View>
                <Text style={styles.title}>{roomate.name}</Text>
              </View>
            </View>
          </CardView>
        );
      });
    } else if (this.props.type === 'shops') {
      console.log(job, 'llkmklmkl');
      return (
        <CardView
          style={[
            styles.cardStyle,
            {
              shadowOpacity: 0.4,
              shadowColor: color.black,
            },
          ]}
          cardElevation={13}
          cornerRadius={7}
        >
          <TouchableOpacity disabled={this.props.type === 'not' ? true : false}>
            {this.props.type !== 'myjob' && (
              <View style={styles.upperbutton}>
                <Text style={styles.upperButtonText}>
                  Company : {job.company ? job.company : 'Tridev'}
                </Text>
              </View>
            )}
            <View style={styles.upperLayer}>
              <Text style={styles.upperLeftText}>
                {job.title ? job.title : 'React Developer'}
              </Text>
              <Text style={styles.upperRightText}>
                {moment(job.created_at).format('DD/MM/YY')}
              </Text>
            </View>
            <View style={styles.lowerLayer}>
              <View style={styles.locationView}>
                <MaterialIcons
                  size={16}
                  color={color.brandRed}
                  name="location-on"
                />
                <Text style={styles.lowerLeftText}>
                  {job.address ? job.address : 'Gulberg, Lahore'}
                </Text>
              </View>

              <Text style={styles.lowerLeftText}>
                {job.employmentType ? job.employmentType : 'Full Time'}
              </Text>
            </View>
            {this.props.type !== 'not' && this.props.type !== 'myjobs' && (
              <View style={styles.button}>
                <Text style={styles.applyText}>Apply </Text>
              </View>
            )}
          </TouchableOpacity>
        </CardView>
      );
    } else
      return (
        <CardView
          style={[
            styles.cardStyle,
            {
              shadowOpacity: 0.4,
              shadowColor: color.black,
            },
          ]}
          cardElevation={13}
          cornerRadius={7}
        >
          <TouchableOpacity
            disabled={this.props.type === 'not' ? true : false}
            onPress={
              this.props.type === 'myjobs'
                ? () =>
                    this.props.navigation.navigate('appliers', {
                      appliers: job.appliers,
                    })
                : () =>
                    this.props.navigation.navigate('JobDescription', {
                      job: job,
                    })
            }
          >
            {this.props.type !== 'myjob' && (
              <View style={styles.upperbutton}>
                <Text style={styles.upperButtonText}>
                  Company : {job.company ? job.company : 'Tridev'}
                </Text>
              </View>
            )}
            <View style={styles.upperLayer}>
              <Text style={styles.upperLeftText}>
                {job.title ? job.title : 'React Developer'}
              </Text>
              <Text style={styles.upperRightText}>
                {moment(job.created_at).format('DD/MM/YY')}
              </Text>
            </View>
            <View style={styles.lowerLayer}>
              <View style={styles.locationView}>
                <MaterialIcons
                  size={16}
                  color={color.brandRed}
                  name="location-on"
                />
                <Text style={styles.lowerLeftText}>
                  {job.address ? job.address : 'Gulberg, Lahore'}
                </Text>
              </View>

              <Text style={styles.lowerLeftText}>
                {job.employmentType ? job.employmentType : 'Full Time'}
              </Text>
            </View>
            {this.props.type !== 'not' && this.props.type !== 'myjobs' && (
              <View style={styles.button}>
                <Text style={styles.applyText}>Apply </Text>
              </View>
            )}
          </TouchableOpacity>
        </CardView>
      );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    alignSelf: 'center',
    width: s.width - 20,
    margin: 5,
    padding: 5,
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
    color: color.lightGrey,
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
    color: color.lightGrey,
  },
  upperbutton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: color.brandRed,
    borderWidth: 0.5,
    borderRadius: 20,
  },
  upperButtonText: {
    color: color.brandRed,
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: color.brandRed,
    marginTop: 10,
  },
  applyText: {
    color: color.white,
    fontSize: 16,
  },
  headerItem: {
    marginLeft: 10,
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  cart: {
    marginRight: 15,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: color.lightGrey2,
  },
  icon: {
    fontSize: 30,
    color: color.brandRed,
  },
  myStoreBtn: {
    marginRight: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 100,
    height: 35,
    backgroundColor: color.brandRed,
  },
  myStoreText: {
    fontSize: 20,
    color: color.white,
  },
});
