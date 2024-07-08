import { CREATE_ART_ERROR } from '../constants/redux'
import { API_URL } from './utils'

export const createArtAPI = async (
  token: string,
  data: { title: string, description: string, time_to_complete: number, createdAt: string }
) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/arts`,
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
