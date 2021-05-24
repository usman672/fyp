import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getCountries,
  saveAddress,
  editAddress,
  getUser,
} from '../../services/apiList';
import storage from '../../libs/storage';
export const getCountriesAction = () => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    let countries = await getCountries();

    if (countries.code === 0) {
      var countriesDropdown = countries.data.countries.map((country, index) => {
        return { label: country.name, value: index };
      });
      dispatch({
        type: types.COUNTRIES,
        payload: {
          countries: countries.data.countries,
          countriesDropdown: countriesDropdown,
        },
      });
    }
    dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return countries;
  };
};

export const saveAddressAction = (data) => {
  return async (dispatch, getState) => {
    // dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await saveAddress(data);
  
    console.log(data)
    if (res.success) {
     await getUser();
  
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const editAddressAction = (data) => {
  return async (dispatch, getState) => {
    // dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await editAddress(data);
    await getUser();

    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
