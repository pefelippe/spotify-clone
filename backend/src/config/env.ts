import dotenv from 'dotenv'
dotenv.config()

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

export const CLIENT_ID = requireEnv('SPOTIFY_CLIENT_ID')
export const CLIENT_SECRET = requireEnv('SPOTIFY_CLIENT_SECRET')
export const REDIRECT_URI = requireEnv('SPOTIFY_REDIRECT_URI')
