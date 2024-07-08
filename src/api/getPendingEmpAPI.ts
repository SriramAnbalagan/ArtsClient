import { GET_PENDING_EMP_ERROR } from '../constants/redux'
import { API_URL } from './utils'

export const getPendingEmpAPI = async (
  token: string,
) => {
  try {
    const response = await fetch(
    `${API_URL}/admin/employees`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    if (!response.ok) throw response
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    throw GET_PENDING_EMP_ERROR
  }
}
