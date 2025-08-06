import { useAuth } from './providers/auth-provider';

import { PrivateRoutes } from './routes/private-routes';
import { PublicRoutes } from './routes/public-routes';

function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
}

export default App;
