import { Dispatch } from 'redux';
import { toast } from 'react-toastify'
import { loginUserAPI, registerUserAPI } from '../../api'
import { AuthActionTypes, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from '../types/authTypes';

export const loginUser = (email: string, password: string, navigate: any) => async (dispatch: Dispatch<AuthActionTypes>, getState: () => { auth: any }) => {
  const { auth } = getState()
  const { token: accessToken } = auth || {}
  try {
    const response = await loginUserAPI(accessToken, { email, password });
    const { data } = response || {}
    const { token, userDetails } = data || {}
    const { role } = userDetails || {}
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    const localStorageObj = {
      'token': token,
      userDetails
    }
    localStorage.setItem('userData', JSON.stringify(localStorageObj));
    if (role === 'admin') {
      navigate('/dashboard')
    } else {
      navigate('/arts')
    }
  } catch (error: any) {
    dispatch({ type: LOGIN_FAIL });
    toast.error(error)
  }
};

export const registerUser = (name: string, email: string, password: string, role: string, navigate: any) => async (dispatch: Dispatch<AuthActionTypes>, getState: () => { auth: any }) => {
  const { auth } = getState()
  const { token: accessToken } = auth || {}
  try {
    await registerUserAPI(accessToken, { name, email, password, role });
    dispatch({ type: REGISTER_SUCCESS });
    setTimeout(() => {
      navigate('/login')
    }, 200)
    toast.success('User Registered Successfully!')
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
  }
};

export const logoutUser = () => (dispatch: Dispatch<AuthActionTypes>) => {
  localStorage.removeItem('userData');
  dispatch({ type: LOGOUT });

};
