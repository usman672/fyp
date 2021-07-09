/*
 * Reducer actions related with login
 */
import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  signin,
  getHostels,
  signup,
  sendOtp,
  verifyOtp,
  changeCurrentPassword,
  forgetPassword,
  changePassword,
  getUser,
  imageUpload,
  getUserInfo,
  addCard,
  editProfile,
  updateBankInfo,
  verifyEmailAndUsername,
  getTwillio,
  checkfollow,
  followUnfollow,
  userLogout,
} from '../../services/apiList';
import storage from '../../libs/storage';
export const signinAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await signin(data);
     if (res.success) {
  
      await AsyncStorage.setItem('token', res.token);

  
      await AsyncStorage.setItem('isLogedin', 'true');
     
      dispatch({
        type: types.SIGNIN,
        payload: {
          isLogedin: true,
        },
      });
      const user = await getUser();

    }
    dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
   // return res;
  };
};
export const verifyEmailAndUsernameAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    // console.log(data,123121);
    const res = await verifyEmailAndUsername(data);
    // console.log(data,1231231);
    if (res.code === 0) {
      AsyncStorage.setItem('isLogedin', 'false');
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};

export const signupAction = (data) => {
  return async (dispatch, getState) => {
    // dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    console.log(data,'gguygggggggggggggggggg')
    const res = await signup(data);
    if (res.success) {
      AsyncStorage.setItem('isLogedin', 'false');
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const getTwillioToken = () => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getTwillio();
    // console.log(res);

    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const sendOtpAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await sendOtp(data);
    if (res && res.code === 0) {
      //  AsyncStorage.setItem('isLogedin', 'true');
    }
    setTimeout(async () => {
      await dispatch(
        await Actions.loaderAction({
          isLoading: false,
          message: 'Please Wait',
        }),
      );
    }, 2000);
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const imageUploadAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await imageUpload(data);
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const verifyOtpAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await verifyOtp(data);
    if (res.code === 0) {
      // AsyncStorage.setItem('isLogedin', 'true');
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const changeCurrentPasswordAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await changeCurrentPassword(data);
    if (res.code === 0) {
      AsyncStorage.setItem('isLogedin', 'true');
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const forgetPasswordAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await forgetPassword(data);
    if (!res.code === 0) {
      AsyncStorage.setItem('isLogedin', 'false');
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const markLogedin = async(dispatch) => {
  console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
  dispatch({
    type: types.SIGNIN,
    payload: {
      isLogedin: true,
    },
  });
};
const cleanStore = async () => {
  await AsyncStorage.setItem('isLogedin', 'false');
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  await AsyncStorage.removeItem('isSeller');
};
export const markLogedout = (dispatch) => {
  console.log(2131);
  cleanStore();
  console.log(9009090);
  dispatch({
    type: types.SIGNIN,
    payload: {
      isLogedin: false,
    },
  });
};

export const changePasswordAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await changePassword(data);
    if (!res.code === 0) {
      AsyncStorage.setItem('isLogedin', 'false');
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const editProfileAction = (data) => {
  return async (dispatch, getState) => {
    // dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await editProfile(data);
    if (res.code === 0) {
      var user = await storage._retrieveData('user');
      user = JSON.parse(user);
      const new_obj = {
        ...user,
        description: data.description,
        username: data.username,
        image_url: data.image_url,
      };

      // console.log('userrr.....', new_obj);
      await storage._storeData('user', JSON.stringify(new_obj));
      dispatch({
        type: types.SIGNIN,
        payload: {
          user: new_obj,
        },
      });
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const updateBankInfoAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await updateBankInfo(data);
    if (res.code === 0) {
      await AsyncStorage.setItem('user', res.data.updatData);
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const logoutAction = () => {
  return async (dispatch, getState) => {
  //  const res = await userLogout();
 

     await AsyncStorage.setItem('isLogedin', 'false');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isSeller');

      dispatch({
        type: types.SIGNIN,
        payload: {
          isLogedin: false,
        },
      });
    }
  
};
export const getUserAction = () => {
  return async (dispatch, getState) => {
    //  dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const user = await getUser();
    if (user.code === 0) {
    }
    // dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
  };
};
export const getHostelsAction = (data) => {
  return async (dispatch, getState) => {
    //  dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getHostels(data);
    console.log('res',res)
    if (res.success) {
      dispatch({
        type: types.GETHOSTELS,
        payload: {
          hostels:res.data
        },
      });
    }
    // dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
  };
};
export const getShopsAction = (data) => {
  return async (dispatch, getState) => {
    //  dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getShops(data);
    console.log('res',res)
    if (res.success) {
      dispatch({
        type: types.GETSHOPS,
        payload: {
          shops:res.data
        },
      });
    }
    // dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
  };
};

export const getUserInfoAction = () => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const user = await getUserInfo();
    if (user.code === 0) {
      // await storage._storeData('user', JSON.stringify(user.data.user));
      dispatch({
        type: types.GETUSERINFO,
        payload: {
          userInfo: user.data,
        },
      });
    }
    /*dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );*/
  };
};

export const addCardAction = (stripeToken, isUpdate) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const data = {
      token: {
        id: stripeToken,
      },
    };
    const res = await addCard(data);
    if (res.code === 0) {
      if (isUpdate) {
        await getUser();
      }
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const checkfollowAction = (data) => {
  return async (dispatch, getState) => {
    const user = await checkfollow(data);
    if (user.code === 0) {
      console.log(user);
    }
    return user;
  };
};
export const followUnfollowAction = (data) => {
  return async (dispatch, getState) => {
    const user = await followUnfollow(data);
    if (user.code === 0) {
      await getUser();
      console.log(user);
    }
    return user;
  };
};
