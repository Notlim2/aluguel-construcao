import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import LoginCredentials from '../types/login-credentials';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { usePathname } from 'next/navigation';
import { getMeService, loginService } from '../services/auth';
import User from '../types/user';
import LoginDialog from '../components/LoginDialog';

export const AuthContext = createContext(
  {} as {
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    isOpenLoginDialog: boolean;
    toggleLoginDialog: () => void;
    isLoading: boolean;
    user: User | undefined;
  }
);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [isOpenLoginDialog, setIsOpenLoginDialog] = useState(false);
  const toggleLoginDialog = useCallback(() => {
    setIsOpenLoginDialog(!isOpenLoginDialog);
  }, [isOpenLoginDialog]);

  const checkIfIsAuthenticated = useCallback(async () => {
    try {
      const { data } = await getMeService();
      setIsAuthenticated(true);
      const user = data;
      setUser(user);
    } catch (error) {}
  }, []);
  useEffect(() => {
    checkIfIsAuthenticated();
  }, [checkIfIsAuthenticated, pathname]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const { data } = await loginService(credentials);
        const { token, user } = data;
        window.localStorage.setItem('app_token', token);
        setIsAuthenticated(true);
        setUser(user);
        toggleLoginDialog();
      } catch (e) {
        setError(
          'Houve um problema ao fazer login, verifique suas credenciais e tente novamente!'
        );
      }
      setIsLoading(false);
    },
    [toggleLoginDialog]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem('app_token');
    setIsAuthenticated(false);
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOpenLoginDialog,
        toggleLoginDialog,
        isAuthenticated,
        login,
        logout,
        isLoading,
        user,
      }}
    >
      {children}
      <LoginDialog />
      <Snackbar open={!!error} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
}
