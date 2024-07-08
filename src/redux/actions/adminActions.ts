import { Dispatch } from 'redux';
import { toast } from 'react-toastify'
import moment from 'moment'
import { getPendingEmpAPI, approveEmpAPI, rejectEmpAPI, getArtsAPI, createArtAPI, getFilteredArtsAPI, getUserCompletedCountAPI, deleteArtAPI, updateArtAPI } from '../../api';

import { AdminActionTypes, GET_PENDING_EMPLOYEES, APPROVE_EMPLOYEE, GET_ARTS, CREATE_ART, GET_METRICS, MetricParams, REJECT_EMPLOYEE, UPDATE_FILTERED_ARTS, UPDATE_FILTERED_EMP, UPDATE_ACTIVE_ART } from '../types/adminTypes';
import { convertToUTC } from './utils';

export const fetchPendingEmployees = () => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any }) => {
    const { auth } = getState()
    const { token } = auth || {}
    try {
        const response = await getPendingEmpAPI(token);
        const { data } = response || {}
        if (data) {
            dispatch({ type: GET_PENDING_EMPLOYEES, payload: response.data });
        }
    } catch (error) {
        toast.error('Unable to fetch pending employees')
    }
};

export const approveEmployeeById = (empId: string) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any; admin: any }) => {
    const { auth, admin } = getState()
    const { token: accessToken } = auth || {}
    const { pendingEmployees } = admin || {}
    const response = await approveEmpAPI(accessToken, empId);
    const { data } = response || {}
    if (data) {
        const dupList = [...pendingEmployees]
        let foundIndex = pendingEmployees.findIndex((element: { _id: string }) => element._id === data._id)
        dupList.splice(foundIndex, 1, data)
        dispatch({ type: APPROVE_EMPLOYEE, payload: dupList });
    }
};

export const rejectEmployeeById = (empId: string) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any; admin: any }) => {
    const { auth, admin } = getState()
    const { token: accessToken } = auth || {}
    const { pendingEmployees } = admin || {}
    const response = await rejectEmpAPI(accessToken, empId);
    const { data } = response || {}
    if (data) {
        const dupList = [...pendingEmployees]
        let foundIndex = pendingEmployees.findIndex((element: { _id: string }) => element._id === data._id)
        dupList.splice(foundIndex, 1, data)
        dispatch({ type: REJECT_EMPLOYEE, payload: dupList });
    }
};

export const fetchArts = (searchText: string) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any; }) => {
    const { auth } = getState()
    const { token: accessToken } = auth || {}
    const response = await getArtsAPI(accessToken, searchText);
    const { data } = response || {}
    if (data) {
        dispatch({ type: GET_ARTS, payload: response.data });
    }
};

export const createNewArt = (title: string, description: string, time_to_complete: number) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any }) => {
    const { auth } = getState()
    const { token: accessToken } = auth || {}
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = moment();
    const createdAt = convertToUTC(currentDate, timezone)

    try {
        const res = await createArtAPI(accessToken, { title, description, time_to_complete, createdAt });
        const { data } = res || {}
        if (data) {
            dispatch({ type: CREATE_ART, payload: data });
        }
        toast.success('Art Created Successfully!')
    } catch (error) {
        toast.error('Unable to create art')
    }
};

export const deleteArt = (artId: string) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any }) => {
    const { auth } = getState()
    const { token: accessToken } = auth || {}
    try {
        const res = await deleteArtAPI(accessToken, artId);
        const { data } = res || {}
        if (data) {
            toast.success('Art Deleted Successfully!')
            dispatch<any>(fetchArts(''))
        }
    } catch (error) {
        toast.error('Unable to delete art')
    }
};

export const updateActiveArt = (activeArt: any,): AdminActionTypes => ({
    type: UPDATE_ACTIVE_ART,
    payload: activeArt,
});

export const updateArt = () => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any; admin: any }) => {
    const { auth, admin } = getState()
    const { token: accessToken } = auth || {}
    const { activeArt } = admin || {}
    const { _id: artId, title, description, time_to_complete, } = activeArt || {}
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = moment();
    const createdAt = convertToUTC(currentDate, timezone)
    try {
        const res = await updateArtAPI(accessToken, artId, { title, description, time_to_complete, createdAt });
        const { data, message } = res || {}
        if (data) {
            toast.success(message)
            dispatch<any>(fetchArts(''))
        }
    } catch (error) {
        toast.error('Unable to update art')
    }
};


export const fetchFilteredArts = (startDate: string, endDate: string) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any; }) => {
    const { auth } = getState()
    const { token: accessToken } = auth || {}

    const response = await getFilteredArtsAPI(accessToken, startDate, endDate);
    const { data } = response || {}
    if (data) {
        dispatch({ type: UPDATE_FILTERED_ARTS, payload: response.data });
    }
};

export const fetchUserCompletedCounts = (startDate: string, endDate: string) => async (dispatch: Dispatch<AdminActionTypes>, getState: () => { auth: any; }) => {
    const { auth } = getState()
    const { token: accessToken } = auth || {}

    const response = await getUserCompletedCountAPI(accessToken, startDate, endDate);
    const { data } = response || {}
    if (data) {
        dispatch({ type: UPDATE_FILTERED_EMP, payload: response.data });
    }
};
