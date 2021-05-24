import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { s, color } from '../../libs/styles';
var Spinner = require('react-native-spinkit');
import storage from '../../libs/storage';

class CardConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewModal: false,
      cardinfo: '',
    };
    this.getuser();
  }

  getuser = async () => {
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);
    this.setState({ cardinfo: user.bankData.card.last4 });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isLoading}>
        <View style={[s.modal]}>
          <View style={[s.loaderCardinfo]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Confirm payment
            </Text>
            <Text
              style={{
                fontSize: 15,
                alignSelf: 'center',
                padding: 20,
                textAlignments: 'center',
                textAlign: 'center',
              }}>
              We are going to charge ${this.props.total} from this Card
            </Text>
            <Text>**** **** **** {this.state.cardinfo}</Text>
            <Text>Are you agree</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.confirm()}
                  style={{ alignSelf: 'flex-start', padding: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.cancel()}
                  style={{ alignSelf: 'flex-end', padding: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <Text style={styles.headingText}>{this.props.message}</Text> */}
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardConfirmation);

const styles = StyleSheet.create({
  headingText: {
    color: color.red,
    fontSize: 18,
  },
});
