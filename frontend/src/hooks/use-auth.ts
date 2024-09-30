import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

export default function useAuth() {
  return useContext(AuthContext);
}
