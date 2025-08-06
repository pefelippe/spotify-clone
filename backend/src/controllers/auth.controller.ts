import { Request, Response } from 'express'
import { getToken, getRefreshToken } from '../services/spotify.service'
import { buildQueryString } from '../utils/build-query-string'
import { CLIENT_ID, REDIRECT_URI } from '../config/env'

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
].join(' ')

export const login = (_: Request, res: Response) => {
  console.log('Auth login requested')
  
  const query = buildQueryString({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  })
  
  const spotifyUrl = `https://accounts.spotify.com/authorize?${query}`
  res.redirect(spotifyUrl)
}

export const callback = async (req: Request, res: Response) => {
  console.log('Auth callback received')
  
  const code = req.query.code as string
  const error = req.query.error as string
  
  if (error) {
    console.log('Spotify error:', error)
    return res.status(400).json({ error: `Spotify error: ${error}` })
  }
  
  if (!code) {
    console.log('Missing authorization code')
    return res.status(400).json({ error: 'Missing code' })
  }

  try {
    const data = await getToken(code)
    console.log('Token exchange successful')
    res.json(data)
  } catch (err: any) {
    console.error('Token exchange failed:', err.message)
    res.status(500).json({ error: 'Failed to exchange token' })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const refresh_token = req.body.refresh_token
  if (!refresh_token) {
    console.log('Missing refresh_token')
    return res.status(400).json({ error: 'Missing refresh_token' })
  }

  try {
    const data = await getRefreshToken(refresh_token)
    console.log('Token refresh successful')
    res.json(data)
  } catch (err: any) {
    console.error('Token refresh failed:', err.message)
    res.status(500).json({ error: 'Failed to refresh token' })
  }
}
