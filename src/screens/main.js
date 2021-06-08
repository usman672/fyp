import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  AsyncStorage,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { s, color, neomorph } from '../libs/styles';
export default class Main extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.text}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.logintext}>Log in</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderColor:color.brandRed,borderWidth:1,paddingLeft:15,paddingRight:15,borderRadius:5}}>
          <Text style={{fontSize:40,color:color.brandRed,fontWeight:'bold'}}>FAR</Text>
          <Text style={{fontSize:40,color:color.brandRed,backgroundColor:'black',borderRadius:18,height:36,width:36,textAlign:'center',borderColor:color.brandRed,borderWidth:5}}></Text>
          <Text style={{fontSize:40,color:color.brandRed,fontWeight:'bold'}}>SHGAH</Text>
          
          
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.signupbtn}
              onPress={() => this.props.navigation.navigate('signup')}>
              <Text style={styles.logintext}>Sign up with Email + SMS</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PDFExample', {
                title: 'About Tipitops',
                source:
                  'https://tipitops-images.s3.amazonaws.com/documents/Guidelines.pdf',
              })
            }>
            <Text style={styles.footerl1}>Learn More About Faroshgah</Text>
          </TouchableOpacity>
          <Text style={styles.footerl2}>
            By siging up or logging in, you agree to our
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PDFExample', {
                  title: 'Terms & Conditions',
                  source:
                    'https://tipitops-images.s3.amazonaws.com/documents/Terms.pdf',
                })
              }>
              <Text style={styles.footerl3}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text> & </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PDFExample', {
                  title: 'Privacy Policy',
                  source:
                    'https://tipitops-images.s3.amazonaws.com/documents/Privacy.pdf',
                })
              }>
              <Text style={styles.footerl3}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  btn: {
    borderWidth: 0.5,
    borderColor: color.brandRed,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  signupbtn: {
    borderWidth: 0.5,
    borderColor: color.brandRed,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 7,
  },
  logintext: {
    color: color.brandRed,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  text: {
    color: color.brandRed,
    fontFamily: 'Avenir',
    padding: 4,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 25,
    width: '90%',
  },
  footer: {
    alignItems: 'center',
  },
  footerl1: {
    color: color.brandRed,
    fontFamily: 'Avenir',
    paddingBottom: 30,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  footerl2: {
    color: color.brandRed,
    fontFamily: 'Avenir',
    fontSize: 12,
  },
  footerl3: {
    color: color.brandRed,
    fontFamily: 'Avenir',
    paddingBottom: 20,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});
