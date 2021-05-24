import { combineReducers } from 'redux';

import UserReducer from './userReducer';
import LoaderReducer from './loaderReducer';
import AddressReducer from './addressReducer';
import BankReducer from './bankReducer';
import ProductReducer from './productReducer';
import ImageUploadReducer from './imageUploadReducer';
import CategoriesReducer from './categoriesReducer';
import AddHelpQueryReducer from './helpQueryReducer';
import CartReducer from './cartReducer';
import OrderReducer from './orderReducer';
import NotificationReducer from './notificationReducer';
const appReducer = combineReducers({
  UserReducer,
  LoaderReducer,
  AddressReducer,
  BankReducer,
  ProductReducer,
  ImageUploadReducer,
  CategoriesReducer,
  AddHelpQueryReducer,
  CartReducer,
  OrderReducer,
  NotificationReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'SIGNOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;