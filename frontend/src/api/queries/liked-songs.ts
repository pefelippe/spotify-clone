import axios from 'axios';

export const fetchLikedSongs = async (accessToken: string, limit = 20, offset = 0) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit,
        offset,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao buscar músicas curtidas:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
      scopes: error.response?.data?.error?.message?.includes('scope') ? 'Escopo insuficiente' : 'Outro erro',
    });
    throw error;
  }
};

export const addToLikedSongs = async (accessToken: string, trackIds: string[]) => {
  try {
    const response = await axios.put('https://api.spotify.com/v1/me/tracks', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        ids: trackIds.join(','),
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao adicionar músicas aos favoritos:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
      trackIds,
    });
    throw error;
  }
};

export const removeFromLikedSongs = async (accessToken: string, trackIds: string[]) => {
  try {
    const response = await axios.delete('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        ids: trackIds.join(','),
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao remover músicas dos favoritos:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
      trackIds,
    });
    throw error;
  }
};
