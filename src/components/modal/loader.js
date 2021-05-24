import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import { s, color } from '../../libs/styles';
var Spinner = require('react-native-spinkit');

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewModal: false,
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isLoading}>
        <View style={[s.modal]}>
          <View style={[s.loaderCard]}>
            <Spinner
              style={styles.spinner}
              isVisible={true}
              size={80}
              type="ThreeBounce"
              color={color.red}
            />
            <Text style={styles.headingText}>{this.props.message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.LoaderReducer.isLoading,
    message: state.LoaderReducer.message,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);

const styles = StyleSheet.create({
  headingText: {
    color: color.red,
    fontSize: 18,
  }
});
