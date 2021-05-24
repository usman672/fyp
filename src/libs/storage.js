import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key.toString(), value);
    } catch (error) {
    }
  };
  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key.toString());
      if (value !== null) {
        return value;
      }
    } catch (error) {
    }
    return 0;
  };
}
const storage = new Storage();
export default storage;
