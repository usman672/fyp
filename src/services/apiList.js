import { api } from './api';
import storage from '../libs/storage';
//export const baseUrl = 'http://13.58.108.68/api/';
export const baseUrl = 'https://myhostelv1app.herokuapp.com/api/v1/';
//export const baseUrl = 'http://localhost:5000/';

export const signin = async (data) => {
  let url = baseUrl + 'auth/login';
  let method = 'POST';
  let res = await api(url, method, false, data);
  console.log(res, 'res');
  return res;
};
export const verifyEmailAndUsername = async (data) => {
  let url = baseUrl + 'verifyEmailAndUsername';
  let method = 'POST';
  // console.log(url, method, true, data);
  let res = await api(url, method, true, data);
  return res;
};
export const signup = async (data) => {
  let url = baseUrl + 'auth/register';
  let method = 'POST';
  let res = await api(url, method, false, data);
  console.log(res, 'ressssss');
  return res;
};
export const sendOtp = async (data) => {
  console.log(data);

  let url = 'http://13.58.108.68/api/sendOTP';
  let method = 'POST';
  let res = await api(url, method, false, data);
  console.log(res);

  return res;
};
export const verifyOtp = async (data) => {
  let url = 'http://13.58.108.68/api/verifyOTP';
  let method = 'POST';
  let res = await api(url, method, false, data);
  console.log(res, 'jroijfroifjroi');
  return res;
};
export const changeCurrentPassword = async (data) => {
  let url = baseUrl + 'changeCurrentPassword';
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};
export const forgetPassword = async (data) => {
  let url = baseUrl + 'forgotPassword';
  let method = 'POST';
  let res = await api(url, method, false, data);
  return res;
};
export const changePassword = async (data) => {
  let url = baseUrl + 'changePassword';
  let method = 'PUT';
  let res = await api(url, method, false, data);
  return res;
};

export const imageUpload = async (data) => {
  let url = 'http://13.58.108.68/api/uploadImage';
  let method = 'POST';
  let res = await api(url, method, false, data);
  return res;
};

export const getUser = async (data) => {
  let url = baseUrl + 'auth/me';
  let method = 'GET';
  let res = await api(url, method, true);
  await storage._storeData('user', JSON.stringify(res));
  return;
};

export const updateDeviceToken = async (token) => {
  let url = baseUrl + 'user/set-device-token';
  let method = 'POST';
  var formData = new FormData();
  formData.append('device_token', token);
  let res = await api(url, method, true, formData);
  return res;
};
export const postJob = async (data) => {
  let url = baseUrl + 'jobs';
  let method = 'POST';
  console.log(url,data)
  let res = await api(url, method, true, data);
  return res;
};

export const getJobs = async (data) => {
  let url = baseUrl + 'jobs/search?search='+data;
  let method = 'GET';
  console.log(url,data)
  let res = await api(url,method,true);
  return res;
};

export const myJobs = async () => {
  let url = baseUrl + 'jobs/my-jobs';
  let method = 'GET';
  console.log(url)
  let res = await api(url, method, true);
  return res;
};


export const updateBankAccount = async (data) => {
  let url = baseUrl + 'bankAccount';
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};
export const updateUser = async (data) => {
  let url = baseUrl + 'user';
  let method = 'POST';
  var formData = new FormData();
  formData.append('first_name', data.firstName);
  formData.append('last_name', data.lastName);
  formData.append('company_name', data.companyName);
  formData.append('state', data.state);
  formData.append('zip_code', data.zipCode);
  formData.append('city', data.city);
  let res = await api(url, method, true, formData);
  return res;
};

export const forgotPassword = async (data) => {
  let url = baseUrl + 'password/email';
  let method = 'POST';
  var formData = new FormData();
  formData.append('email', data.email);
  let res = await api(url, method, false, formData);
  return res;
};
export const getReviews = async (id) => {
  let url = baseUrl + 'hostels/' + id + '/reviews';
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};
export const getReviewsHistory = async (id) => {
  let url = baseUrl + 'reviews/history/' + id;
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};
export const getTranscribe = async (id) => {
  let url = baseUrl + 'reviews/gettranscribe/' + id;
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};
export const createReview = async (data) => {
  let url = baseUrl + 'reviews';
  let method = 'POST';
  var formData = new FormData();
  formData.append('title', data.title);
  formData.append('service_id', data.service);
  formData.append('review_type', data.review_type);
  formData.append('description', data.description);
  let res;
  if (data.review_type === 'text') {
  } else if (data.review_type === 'video') {
    formData.append('file', {
      uri: data.uri,
      type: 'video/mp4',
      name: data.name,
    });
  } else {
    formData.append('file', {
      uri: 'file://' + data.uri,
      type: 'audio/aac',
      name: data.name,
    });
  }
  res = await api(url, method, true, formData);
  return res;
};

export const getServices = async () => {
  let url = baseUrl + 'services';
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};

export const sendReview = async (id, data) => {
  let url = baseUrl + 'reviews/send/' + id;
  let method = 'POST';
  var formData = new FormData();
  formData.append('reviewer_name', data.reviewer_name);
  formData.append('reviewer_email', data.reviewer_email);
  formData.append('comment', data.comment);
  formData.append('via', data.via);
  let res = await api(url, method, true, formData);
  return res;
};

//Address
export const getCountries = async (data) => {
  let url = baseUrl + 'countries';
  let method = 'GET';
  let res = await api(url, method, false, data);
  return res;
};
export const getHostels = async (data) => {
  let url = baseUrl + 'hostels/search';
  let method = 'POST';
  let res = await api(url, method, false, data);
  return res;
};

export const saveAddress = async (data) => {
  let url = '';
  if (data.type == 'hostel') url = baseUrl + 'hostels';
  else if (data.type == 'shop') url = baseUrl + 'shops';
  let method = 'POST';
  let res = await api(url, method, true, data);
  console.log(res, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  return res;
};
export const editAddress = async (data) => {
  // console.log(data, 'data');
  let url = baseUrl + 'address';
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};
export const editProfile = async (data) => {
  let url = baseUrl + 'updateUser';
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};
export const updateBankInfo = async (data) => {
  let url = baseUrl + 'updateBankAccount';
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};
export const addRooms = async (data, id) => {
  let url = baseUrl + 'hostels/' + id + '/rooms';
  let method = 'POST';
  let res = await api(url, method, true, data);
  return res;
};
export const editRoom = async (data, id) => {
  console.log(data, id, 'a[ilist');
  let url = baseUrl + 'rooms/' + id;
  let method = 'PUT';
  let res = await api(url, method, true, data);
  console.log(res);
  return res;
};
export const getUserRooms = async (data) => {
  let url = baseUrl + 'hostels/' + data + '/rooms';
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const getAllRecentProducts = async (data) => {
  let url = baseUrl + 'products/search';
  let method = 'GET';
  let res = await api(url, method, false, data);
  console.log(res);
  return res;
};
export const addProduct = async (data, id) => {
  let url = baseUrl + 'shops/' + id + '/products';
  let method = 'POST';
  let res = await api(url, method, true, data);
  console.log(res);
  return res;
};
export const editProduct = async (data, id) => {
  let url = baseUrl + 'products/' + id;
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};

export const getCategories = async () => {
  let url =
    'http://13.58.108.68/tipitops-QA/api/getAllCategories?page=1&perPage=27';
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};
export const likeDislikeProduct = async (data) => {
  let url = baseUrl + 'likeDislikeProduct';
  let method = 'POST';
  let res = await api(url, method, true, data);
  console.log(res, 'likeDislikeProduct');
  return res;
};
export const getLikeProduct = async () => {
  let url = baseUrl + 'userLikedProducts';
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};
export const getProductByCategoryId = async (data) => {
  let url = baseUrl + 'getProductsByCategoryId';
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const getHotCategories = async (data) => {
  let url = baseUrl + 'getHotCategories';
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const addHelpQuery = async (data) => {
  let url = baseUrl + 'addHelpQuery';
  let method = 'POST';
  // console.log(url, method, true, data);
  let res = await api(url, method, true, data);
  // console.log(res);
  return res;
};
export const addToCart = async (data) => {
  let url = baseUrl + 'addProductToCart';
  let method = 'POST';
  let res = await api(url, method, true, data);
  return res;
};
export const deleteFromCart = async (data) => {
  let url = baseUrl + 'removeItemFromCart/' + data;
  let method = 'DELETE';
  let res = await api(url, method, true);
  return res;
};
export const getCartProducts = async (type) => {
  let url = baseUrl + 'getCartProducts?page=1&perPage=12';
  let method = 'GET';
  let res = await api(url, method, true);
  return res;
};
export const getProductByKeyword = async (data) => {
  let url = baseUrl + 'searchProducts';
  let method = 'GET';
  console.log(url, method, true, data);
  let res = await api(url, method, true, data);
  console.log(res, 'get product by keywords');
  return res;
};
export const getTwillio = async () => {
  let url = baseUrl + 'refreshChatToken';
  let method = 'POST';
  let res = await api(url, method, true);
  return res;
};

export const getProductsByUser = async (user_id) => {
  let url = baseUrl + 'shops/' + user_id;
  let method = 'GET';
  let res = await api(url, method, true);
  console.log('rssssssssssssssssssssssssssss',res)
  return res;
};

export const savedSearch = async (data) => {
  let url = baseUrl + 'getAllKeywords/' + data.filter;
  let method = 'GET';
  console.log(url, method, true);
  let res = await api(url, method, true, data);
  console.log(res, 12312);
  return res;
};
export const deleteRoom = async (id) => {
  let url = baseUrl + 'rooms/' + id;
  let method = 'DELETE';
  let res = await api(url, method, true);
  return res;
};
export const getUserInfo = async (data) => {
  let url = baseUrl + 'user';
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
// order
export const bookRoom = async (data) => {
  let url = baseUrl + 'rooms/' + data + '/book';
  let method = 'POST';
  let res = await api(url, method, true);
  return res;
};
export const inProgrssOrder = async (data, user_id) => {
  let url = baseUrl + 'getOrdersByStatus/' + user_id;
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const completeBuyOrder = async (data, user_id) => {
  let url = baseUrl + 'getOrdersByStatus/' + user_id;
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const inProgressSellOrder = async (data, user_id) => {
  let url = baseUrl + 'getOrdersByStatus/' + user_id;
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const completeSellOrder = async (data, user_id) => {
  let url = baseUrl + 'getOrdersByStatus/' + user_id;
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const orderStatus = async (data) => {
  let url = baseUrl + 'getProductDeliveryStatus/' + data.orderId;
  let method = 'GET';
  // console.log(url, method);
  let res = await api(url, method, true, data);
  // console.log(res, 222);
  return res;
};

//CARD
export const addCard = async (data) => {
  let url = baseUrl + 'addCard';
  let method = 'POST';
  let res = await api(url, method, true, data);
  return res;
};
export const dopayment = async (data) => {
  let url = baseUrl + 'doPayment';
  let method = 'POST';
  let res = await api(url, method, true, data);
  return res;
};
export const notificationSetting = async (data) => {
  let url = baseUrl + 'saveNotificationSettings';
  let method = 'PUT';
  let res = await api(url, method, true, data);
  return res;
};
export const getNotificationSettings = async (data) => {
  let url = baseUrl + 'getNotificationSettings';
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const getNotifications = async (data) => {
  let url = baseUrl + 'getNotifications';
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const orderReview = async (data) => {
  let url = baseUrl + 'addOrderReview';
  let method = 'POST';
  let res = await api(url, method, true, data);
  return res;
};
export const orderRating = async (data, id) => {
  let url = baseUrl + 'hostels/' + id + '/reviews';
  let method = 'POST';
  let res = await api(url, method, true, data);
  console.log(res);
  return res;
};
export const checkfollow = async (data) => {
  let url = baseUrl + 'isSellerFollowed/' + data.user_id;
  let method = 'GET';
  let res = await api(url, method, true, data);
  return res;
};
export const followUnfollow = async (data) => {
  let url = baseUrl + 'followUnFollowUser';
  let method = 'POST';
  let res = await api(url, method, true, data);
  return res;
};

export const userLogout = async (data) => {
  let url = baseUrl + 'logOut';
  let method = 'GET';
  console.log(url, method, true, data);
  let res = await api(url, method, true, data);
  return res;
};

export const uploadPdf = async (data,id) => {

  let formData = new FormData();
  formData.append('file',data);
  let url = baseUrl + 'jobs/'+id+'/apply';
   let method = 'POST';
  let res = await api(url, method, true, formData,true);
  console.log(res,'ress');
  return res;
};


export const getClientToken = async (data,id) => {
   let url = baseUrl + 'braintree/get-token';
   let method = 'GET';
  let res = await api(url, method, true);
  console.log(res,'ress');
  return res;
};

export const bookRoomPayment = async (data) => {
  let url = baseUrl + 'braintree/payment';
   let method = 'POST';
   console.log(data,2323232)
  let res = await api(url, method, true,data);
  console.log(res,'ress');
  return res;
};


export const getHostelMembers = async () => {
  let url = baseUrl + 'hostels/6002b3fda9b85e0018e6cd7b/booked-seats';
   let method = 'GET';
  let res = await api(url, method, true);
  console.log(res,'ress');
  return res;
};

