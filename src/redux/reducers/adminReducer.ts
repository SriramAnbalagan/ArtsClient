import { AdminState, AdminActionTypes, GET_PENDING_EMPLOYEES, APPROVE_EMPLOYEE, GET_ARTS, CREATE_ART, GET_METRICS, REJECT_EMPLOYEE, UPDATE_FILTERED_ARTS, UPDATE_FILTERED_EMP, UPDATE_ACTIVE_ART } from '../types/adminTypes';

const initialState: AdminState = {
    pendingEmployees: [],
    arts: [],
    activeArt: null,
    metrics: [],
    filteredArts: [],
    filteredEmp: [],
};

export const adminReducer = (state = initialState, action: AdminActionTypes): AdminState => {
    switch (action.type) {
        case GET_PENDING_EMPLOYEES:
            return {
                ...state,
                pendingEmployees: action.payload,
            };
        case APPROVE_EMPLOYEE:
            return {
                ...state,
                pendingEmployees: action.payload,
            };
        case REJECT_EMPLOYEE:
            return {
                ...state,
                pendingEmployees: action.payload,
            };
        case GET_ARTS:
            return {
                ...state,
                arts: action.payload,
            };
        case CREATE_ART:
            return {
                ...state,
                arts: [...state.arts, action.payload],
            };
        case UPDATE_FILTERED_ARTS:
            return {
                ...state,
                filteredArts: action.payload,
            };
        case UPDATE_FILTERED_EMP:
            return {
                ...state,
                filteredEmp: action.payload,
            };
        case GET_METRICS:
            return {
                ...state,
                metrics: action.payload,
            };
        case UPDATE_ACTIVE_ART:
            return {
                ...state,
                activeArt: action.payload,
            };
        default:
            return state;
    }
};
