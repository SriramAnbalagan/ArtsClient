export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

interface User {
  id: string;
  role: string;
}

interface LoginSuccessPayload {
  token: string;
  userDetails: User;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  userDetails: User | null;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;
