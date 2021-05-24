import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import Picker from '../../../components/input/withoutDesignPicker';
import {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
} from '../../../utils/responsive.js';
import { s, color } from '../../../libs/styles';
import CardSaved from '../../../components/mylikes/CardSaved';
import { Dropdown } from '../../../components';
import { savedSearchAction } from '../../../redux/actions/productAction';
import { connect } from 'react-redux';
import Actions from '../../../redux/actions';

class SavedSearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuest: '',
      selectedSubjectIndex: 0,
      options: [{ name: 'All' }, { name: 'Weekly' }, { name: 'Monthly' }],
      iosOptions: [
        { label: 'All', value: 0 },
        { label: 'Weekly', value: 1 },
        { label: 'Monthly', value: 2 },
      ],
      selectedOptionIndex: 0,
      option: 'monthly',
    };
    this.getSavedSearch();
  }
  componentDidMount() {
    listenToOrientationChange(this);
  }

  componentWillUnMount() {
    removeOrientationChange();
  }
  getSavedSearch = async () => {
    // this.setState({ isGuest: await AsyncStorage.getItem('token') });
    // if (this.state.isGuest.toString() !== null) {
    const res = await this.props.savedSearchAction({
      filter: this.state.option.toLowerCase(),
      page: 1,
      perPage: 50,
    });
  };
  // };
  onSelectItem = async (index, type) => {
    if (type === 'options') {
      this.setState({
        selectedOptionIndex: index,
        option: this.state.options[index].name,
      });
    }
    this.getSavedSearch();
  };
  onSelectIOSItem = async (index, type) => {
    this.setState({
      selectedOptionIndex: index,
      option: this.state.options[index].name,
    });
    this.getSavedSearch();
  };

  searchesList = (item) => {
    return (
      <CardSaved name={item.item.keyword} navigation={this.props.navigation} />
    );
  };
  render() {
    return (
      <ScrollView style={[s.scrollview]}>
        <View style={styles.box}>
          <View style={styles.boxInternal}>
            <Text style={styles.savedSearches}>Saved Searches</Text>
            <View style={styles.pickerView}>
              {Platform.OS === 'ios' ? (
                <Dropdown
                  zIndex={111}
                  heading=""
                  default={this.state.selectedColorIndex}
                  list={this.state.iosOptions}
                  onSelect={this.onSelectIOSItem}
                />
              ) : (
                <Picker
                  heading="options"
                  list={this.state.options}
                  onSelect={this.onSelectItem}
                  selectedState={this.state.selectedOptionIndex}
                />
              )}
            </View>
          </View>
        </View>
        <FlatList
          data={this.props.searchedSaved}
          renderItem={this.searchesList}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchedSaved: state.ProductReducer.searchedSaved,
  };
};
const mapDispatchToProps = {
  savedSearchAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);

const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
  boxInternal: {
    height: heightToDp('8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '5%',
  },
  savedSearches: {
    color: color.black,
    fontSize: widthToDp('5.5%'),
  },
  edit: {
    color: color.primary,
    fontSize: widthToDp('5%'),
  },
  pickerView: {
    width: '42%',
    justifyContent: 'center',
  },
});
