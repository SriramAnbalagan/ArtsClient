
import { API_URL } from './utils'

export const loginUserAPI = async (
  token: string,
  data: { email: string; password: string }
) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/login`,
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
  } catch (error: any) {
    throw error
  }
}
