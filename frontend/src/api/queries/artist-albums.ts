import axios from 'axios'

export const fetchArtistAlbums = async (artistId: string, accessToken: string) => {
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}
