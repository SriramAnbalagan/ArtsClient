import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { adminReducer } from './adminReducer';
import { employeeReducer } from './empReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  employee: employeeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
