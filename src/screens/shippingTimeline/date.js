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

export default class Dates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
    };
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    that.setState({
      //Setting the value of the date time
      date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ' PM',
    });
  }
  render() {
    return (
      <View style={styles.main}>
        <View
          style={{
            paddingBottom: this.props.padding,
            flexDirection: 'row',
            marginTop: '2%',
          }}>
          <MaterialIcons style={styles.starIcon} name="access-time" size={20} />
          <Text>
            {this.props.text} {this.state.date}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
