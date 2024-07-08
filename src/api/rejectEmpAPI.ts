import { REJECT_EMP_ERROR } from '../constants/redux'
import { API_URL } from './utils'

export const rejectEmpAPI = async (
  token: string,
  empId: string
) => {
  try {
    const response = await fetch(`${API_URL}/admin/employees/${empId}/reject`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw response
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    throw REJECT_EMP_ERROR
  }
}
