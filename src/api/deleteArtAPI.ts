import { API_URL } from './utils'

export const deleteArtAPI = async (
  token: string,
  artId: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/arts/${artId}`,
      {
        method: 'DELETE',
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
