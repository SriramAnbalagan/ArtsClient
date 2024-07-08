import { AuthState, AuthActionTypes, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from '../types/authTypes';

const userLocalStorage: any = localStorage.getItem('userData');
const userData = JSON.parse(userLocalStorage)
const {userDetails : localUserDetails} = userData || {}

const initialState: AuthState = {
    token: userData?.token ? userData?.token : null,
    loading: true,
    userDetails: localUserDetails,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                loading: false,
                userDetails: action.payload.userDetails,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            return {
                ...state,
                token: null,
                loading: false,
                userDetails: null,
            };
        default:
            return state;
    }
};
