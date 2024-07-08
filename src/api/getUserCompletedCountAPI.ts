import { API_URL } from './utils'

export const getUserCompletedCountAPI = async (
  token: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await fetch(
    `${API_URL}/admin/user/filter?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData?.message;
    }
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    throw error
  }
}
