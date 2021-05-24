import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export default class BuyerProduct extends Component {
  checkimage = (address) => {
    if (address) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <View style={styles.imageRow}>
        {this.checkimage(this.props.image) ? (
          <ImageBackground
            source={this.props.image}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Text />
        )}
        <View style={styles.descriptionColumn}>
          <Text style={styles.description}>{this.props.name}</Text>
          <View style={styles.iconRow}>
            <Icon name="alarm-multiple" style={styles.icon} />
            <Text style={styles.time}>
              {moment(this.props.date).format('DD MMM YYYY')}
            </Text>
          </View>
          <View>
            {!this.props.completed && (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('orderStatus', {
                    params: this.props.order,
                  })
                }
                style={s.Orderbutton(
                  color.black,
                  color.black,
                  'flex-end',
                  '80%',
                )}>
                <Text style={s.buttonText}>View Order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  image: {
    width: 111,
    height: 105,
    borderRadius: 3,
    transform: [
      {
        rotate: '-0.03deg',
      },
    ],
    // overflow: 'hidden',
  },
  price: {
    width: 46,
    height: 27,
    backgroundColor: 'rgba(255,102,0,1)',
  },
  status: {
    color: 'white',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 5,
  },
  description: {
    color: '#121212',
    fontSize: 16,
  },
  icon: {
    color: 'rgba(155,155,155,1)',
    fontSize: 25,
  },
  time: {
    color: 'rgba(155,155,155,1)',
    marginLeft: 12,
    marginTop: 6,
  },
  iconRow: {
    height: 27,
    flexDirection: 'row',
    marginTop: 7,
    marginRight: 13,
  },
  descriptionColumn: {
    width: 190,
    marginLeft: 14,
    marginBottom: 52,
  },
  imageRow: {
    height: 105,
    flexDirection: 'row',
    margin: 10,
  },
});
