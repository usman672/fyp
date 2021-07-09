import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { s, color, neomorph } from '../../libs/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  onChange = (searchText) => {
    this.setState({ data: searchText });

  };
  render() {
    return (
      <View style={styles.container}>
        <CardView
          style={s.inputCard}
          cardElevation={neomorph.elevation}
          cornerRadius={neomorph.cornerRadius}>
          <Icon name="search1" style={styles.searchIcon} />
            <TextInput
              style={s.inputField}
              ref={this.props.ref}
              autoFocus={false}
              placeholder="Looking For ..."
              placeholderTextColor={color.gray}
              onChangeText={(searchText) => this.props.onBlur(searchText)}
            />
         
        </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius:10,
    margin:10,
    
  },
  searchIcon: {
    fontSize: 25,
    paddingRight: 10,
    color: color.gray,
  },
});
