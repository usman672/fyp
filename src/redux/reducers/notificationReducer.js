import * as types from '../types';

const initialState = {
  notificationsList: [],

};

function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    
    case types.NOTIFICATIONSLIST:
      return {
        ...state,
        notificationsList: action.payload.notificationsList,
      };
  }

  return state;
}
export default NotificationReducer;
