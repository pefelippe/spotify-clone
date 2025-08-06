import axios from 'axios'

export const fetchUserPlaylists = async (accessToken: string) => {
  const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}
