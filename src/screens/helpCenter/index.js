import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from 'react-native';
import { s, color } from '../../libs/styles';
import SettingHeader from '../../components/header/settingHeader';
import HorizontalSeparator from '../../components/separators/horizontalSeparator';
import Icon from 'react-native-vector-icons/AntDesign';
export default class HelpCenter extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={s.scrollview}>
        <SettingHeader
          title="Help Center"
          backgroundColor=""
          color={color.lightGrey}
        />
        <ScrollView style={[s.scrollview]}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: `Buyer Hasn't Rated Me`,
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/The_buyer_hasn_t_rated_me.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Buyer Hasn't Rated Me</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Terms & Condtions',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Terms.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Terms</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>

          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Privacy Policy',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Privacy.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Privacy</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>

          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Account Suspension',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Account_Suspension.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Account Suspension</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'How It Works?',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/How_it_works_.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>How It Works?</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Prohibited Conduct',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Prohibited_Conduct.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Prohibited Conduct</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Trust & Safety',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Trust_Safety.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Trust + Safety</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Sales Tax For Buyers',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Sales_Tax_for_Buyers.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Sales Tax For Buyers</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'Guidelines',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Guidelines.pdf',
              })
            }>
            <View style={styles.row}>
              <Text style={styles.heading}>Guidelines</Text>
              <Icon name="right" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <HorizontalSeparator />
          <View style={styles.footer}>
            <Text style={styles.heading}>Need More Help?</Text>
            <TouchableOpacity
              style={s.buttonbox('black', 'black', 'center', '30%')}
              onPress={() => this.props.navigation.navigate('ContactUs')}>
              <Text style={s.buttonText}>Contact us</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hideLabel: {
    fontSize: 16,
    color: color.lightGrey,
  },
  row: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 17,
    alignSelf: 'center',
  },
  icon: {
    color: color.black,
    alignSelf: 'center',
    marginRight: 5,
  },
  footer: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 10,
  },
});
