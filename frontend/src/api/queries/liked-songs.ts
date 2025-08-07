import axios from 'axios'

export const fetchLikedSongs = async (accessToken: string, limit = 20, offset = 0) => {
  const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      limit,
      offset,
    },
  })
  return response.data
}