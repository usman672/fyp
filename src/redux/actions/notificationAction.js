import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  notificationSetting,
  getNotificationSettings,
  getNotifications,
} from '../../services/apiList';



export const getNotificationsAction = () => {
  return async (dispatch) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getNotifications();
    // console.log(res,"notification");
    if (res.success) {
       console.log(res, 'Notifications List');
      dispatch({
        type: types.NOTIFICATIONSLIST,
        payload: {
          notificationsList: res.data,
        },
      });
    }
    return res;
    // dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
  };
};
