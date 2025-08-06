import axios from 'axios'

export const fetchTopArtists = async (accessToken: string) => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}
