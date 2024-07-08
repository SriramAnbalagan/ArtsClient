import { Dispatch } from 'redux';
import { toast } from 'react-toastify'
import { finishArtAPI } from '../../api';
import { SELECT_ART, EmployeeActionTypes } from '../types/empTypes';
import { fetchArts } from './adminActions';

export const selectArt = (art: any, startTime: any): EmployeeActionTypes => ({
  type: SELECT_ART,
  payload: { art, startTime },
});

export const finishArt = (payloadObj: any) => async (dispatch: Dispatch<EmployeeActionTypes>, getState: () => { auth: any }) => {
  const { auth } = getState()
  const { token: accessToken } = auth || {}
  try {
    const res = await finishArtAPI(accessToken, payloadObj);
    const { data } = res || {}
    if (data) {
      toast.success('Art Completed Successfully!')
      dispatch<any>(fetchArts(''))
    }
  } catch (error) {
    toast.error('Unable to save art')
  }
};