import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CustomButton } from '../../components/CustomButton'
import { Logo } from '../../components/Logo'
import { CenteredLayout } from '../../components/layout/CenteredLayout'
import { useAuth } from '../../providers/auth-provider'

export const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center text-center">
        <Logo className="w-[200px] h-[60px] object-contain mb-6" />
        <p className="text-white-text text-xl font-medium font-weight-500">
          Entre com sua conta Spotify clicando no botão abaixo
        </p>
        <CustomButton
          onClick={() => {
            window.location.href = 'http://localhost:3001/auth/login'
          }}
          variant="spotify"
          label="Entrar"
        />
      </div>
    </CenteredLayout>
  )
}

