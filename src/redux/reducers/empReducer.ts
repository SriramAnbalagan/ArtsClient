// src/redux/reducers/employeeReducer.ts
import { SELECT_ART, FINISH_ART, EmployeeActionTypes } from '../types/empTypes';

interface EmployeeState {
  activeArt: any | null;
  startTime: Date | null;
  endTime: Date | null;
  totalTime: number | null;
}

const initialState: EmployeeState = {
  activeArt: null,
  startTime: null,
  endTime: null,
  totalTime: null,
};

export const employeeReducer = (state = initialState, action: EmployeeActionTypes): EmployeeState => {
  switch (action.type) {
    case SELECT_ART:
      return {
        ...state,
        activeArt: action.payload.art,
        startTime: action.payload.startTime,
        endTime: null,
        totalTime: null,
      };
    case FINISH_ART:
      return {
        ...state,
        endTime: action.payload.endTime,
        totalTime: action.payload.totalTime,
      };
    default:
      return state;
  }
};
