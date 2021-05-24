import * as types from '../types';

const initialState = {
  notificationSetting: [],
  notificationsList: [],
  page: 0,
};

function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATIONSETTINGINFO:
      return {
        ...state,
        notificationSetting: action.payload.notificationinfo,
      };
    case types.NOTIFICATIONSLIST:
      state.notificationsList = state.notificationsList.concat(
        action.payload.notificationsList,
      );
      console.log('compl orders', action.payload.notificationsList);
      state.page = action.payload.page;

      return {
        ...state,
        notificationsList: state.notificationsList,
        page: state.page,
      };
  }

  return state;
}
export default NotificationReducer;
