

import { CustomButton } from '../../components/CustomButton';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { QueryState } from '../../components/QueryState';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useAuth } from '../../providers/auth-provider';

const Perfil = () => {
  const { logout } = useAuth();
  const { data: userProfile, isLoading, error } = useUserProfile();

  const queryStateResult = (
    <CenteredLayout>
      <div className="text-center">
        <QueryState
          isLoading={isLoading}
          error={error}
          loadingMessage="Carregando perfil..."
          errorMessage="Erro ao carregar perfil. Tente novamente."
        >
          <CustomButton
            label="Sair"
            onClick={logout}
            variant="primary"
            customClassName="bg-green-spotify hover:bg-green-600 w-full"
          />
        </QueryState>
      </div>
    </CenteredLayout>
  );

  if (isLoading || error) {
    return queryStateResult;
  }

  return (
    <CenteredLayout>
      <div className="text-center">
        <div className="mb-6">
          <img
            src={userProfile?.images?.[0]?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
            alt={userProfile?.display_name || 'User'}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-800"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white-text mb-2">
            {userProfile?.display_name || 'Usuário'}
          </h1>
          <p className="text-gray-400 text-lg">
            {userProfile?.email || 'Spotify User'}
          </p>
          {userProfile?.followers?.total && (
            <p className="text-gray-400 text-sm mt-1">
              {userProfile.followers.total.toLocaleString()} seguidores
            </p>
          )}
        </div>

        <CustomButton
          label="Sair"
          onClick={logout}
          variant="primary"
          customClassName="bg-green-spotify hover:bg-green-600 w-full"
        />
      </div>
    </CenteredLayout>
  );
};

export default Perfil;
