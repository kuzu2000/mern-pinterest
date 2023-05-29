import {
  registerPending,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginStart,
  loginFailure,
  updateUser,
} from './userSlice';
import {
  showError,
  startLoading,
  getPin,
  createPost,
  commentAction,
} from './pinSlice';
import { isLoading, isError, createFavourite } from './favouriteSlice'
import { publicRequest, userRequest } from './requestMethod';

export const register = async (dispatch, user, navigate) => {
  dispatch(registerPending());
  try {
    const res = await publicRequest.post('/auth/register', user);
    dispatch(registerSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const updateAccount = async (dispatch, id, value) => {
    const res = await userRequest.patch(`/auth/update/${id}`, value);
    dispatch(updateUser(res.data));
    console.log(res.data)
};

export const addToFavourite = async (dispatch, id, value) => {
  dispatch(isLoading());
  try {
    const res = await userRequest.post(`/favourite/addToFavourite/${id}`, value);
    dispatch(createFavourite(res.data));
  } catch (err) {
    dispatch(isError());
  }
};

//   dispatch(startLoading());
//   try {
//     const res = await userRequest.post(`/orders/coupon/${orderId}`, value);
//     dispatch(addCoupon(res.data));
//   } catch (error) {
//     dispatch(showError());
//   }
// };

export const getPostDetails = async (dispatch, productId) => {
  dispatch(startLoading());
  try {
    const res = await publicRequest.get(`/posts/${productId}`);
    dispatch(getPin(res.data));
  } catch (error) {
    dispatch(showError());
  }
};

export const addPost = async (dispatch, items, navigate) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.post('/posts', items);
    dispatch(createPost(res.data));
    navigate(`/posts/${res.data._id}`)
  } catch (error) {
    dispatch(showError());
  }
};

export const addComment = async (dispatch, productId, value) => {
  dispatch(startLoading());
  try {
    const res = await userRequest.post(`/posts/${productId}/comment`, value);
    dispatch(commentAction(res.data));
  } catch (error) {
    dispatch(showError());
  }
};


