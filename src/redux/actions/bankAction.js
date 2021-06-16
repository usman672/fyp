import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  postJob,
  updateBankAccount,
  getUser,
  getJobs,
  myJobs,
  getHostelMembers
} from '../../services/apiList';
export const postJobAction = (data) => {
  return async (dispatch, getState) => {
    console.log(data)
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await postJob(data);
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const getJobsAction = (data) => {
  return async (dispatch, getState) => {
    console.log(data)
     const res = await getJobs(data);
    console.log(res.data,'kkk')
    dispatch({
      type: types.ALLJOBS,
      payload: {
        allJobs: res.data,
      },
    });


    
    return res;
  };
};
export const myJobsAction = () => {
  return async (dispatch, getState) => {
   
    const res = await myJobs();
    console.log(res,'kkk')
    dispatch({
      type: types.MYJOBS,
      payload: {
        myJobs: res.data,
      },
    });

    return res;
  };
};

export const getHostelMembersAction = () => {
  return async (dispatch, getState) => {
   
    const res = await getHostelMembers();
    console.log(res,'kkk')
    dispatch({
      type: types.HOSTELMEMBERS,
      payload: {
        hostelMembers: res.data,
      },
    });

    return res;
  };
};

export const updateBankInfoAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await updateBankAccount(data);
    if (res.code === 0) {
      await getUser();
      await AsyncStorage.setItem('isSeller', 'true');
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
 
};
