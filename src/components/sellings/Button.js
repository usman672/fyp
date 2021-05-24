import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={() =>
          this.props.productChange(
            this.props.product,
            this.props.type,
            this.props.index,
            this.props.nav,
          )
        }>
        <Text
          style={{ fontSize: this.props.fontSize, color: this.props.color }}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
  },
  edit: {
    fontSize: 17,
  },
});

export default Button;
