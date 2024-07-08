import { API_URL } from './utils'

export const finishArtAPI = async (
  token: string,
  data: { artId: string, endTime: Date, totalTime: number, canvasData: any}
) => {
  try {
    const response = await fetch(
      `${API_URL}/arts/finish`,
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
