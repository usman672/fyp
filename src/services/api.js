import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
// import * as RootNavigation from '../../App';
// import * as React from 'react';
// import { Navigate } from '../utils/responsive';
import store from '../redux/store/index';
import { markLogedout } from '../redux/actions/userActions';

export const api = async (url, method, token, body, isFormData = false) => {
  // const signout = async () => {
  //   await store.dispatch(markLogedout);
  // };
  let headers;
  if (isFormData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }
  if (token) {
    const userToken = await AsyncStorage.getItem('token');
    headers.Authorization = 'Bearer ' + userToken;
  }

  let structure = {
    url: url,
    method: method,
    headers: headers,
  };

  if (method === 'GET') {
    structure.params = body;
  } else {
    structure.data = body;
  }
  return axios(structure)
    .then((resp) => {
      console.log(resp)
      return resp.data;
    })
    .catch((err) => {
      console.log(err.response.data)
      return err;
    });
};
