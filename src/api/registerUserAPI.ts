import { REGISTER_USER_ERROR } from '../constants/redux'
import { API_URL } from './utils'

export const registerUserAPI = async (
  token: string,
  data: { name: string; email: string; password: string; role: string }
) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data
        }),
      }
    )
    if (!response.ok) throw response
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    throw REGISTER_USER_ERROR
  }
}
